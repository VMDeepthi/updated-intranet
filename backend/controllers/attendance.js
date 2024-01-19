import multer from "multer"
import decompress from "decompress";
import fs from 'fs'
import reader from "xlsx";
import db from "../config/connectiondb.js";


let uploadedFileName;

function uploadExcelData(name) {
    ////console.log(name)
    const ProjectPath = process.cwd()

    const zip = decompress(ProjectPath + "\\uploads\\" + name, ProjectPath + "\\uploads\\ExtractedFiles\\")
        .then((files) => {
            let startReadFile

            if (files.length === 0) {
                ////console.log('len 0')
                fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
                fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
                //fs.unlink(ProjectPath+"\\uploads\\ExtractedFiles\\"+name)
                return ('zip not containing files!')
            }
            else if (files.length == 1 && files[0].type === 'directory') {
                ////console.log('len 1 dir')
                fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
                fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
                return ('zip not containing files!')
            }
            else {

                ////console.log(files[1])
                ////console.log((files[1].path).slice(files[1].path.lastIndexOf('.'),))

                if (files[0].type === 'directory') {
                    //console.log('dir')
                    if ((files[1].path).slice(files[1].path.lastIndexOf('.'),) !== '.xlsx') {
                        fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
                        fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
                        return ('zip not containing excel sheets')
                    }
                    else {

                        startReadFile = 1
                    }
                }
                else {
                    // //console.log('file type')
                    // //console.log((files[1].path).slice(files[1].path.lastIndexOf('.'),))
                    // //console.log((name).slice(0,name.lastIndexOf('.')))
                    if ((files[0].path).slice(files[0].path.lastIndexOf('.'),) !== '.xlsx') {
                        fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
                        fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
                        return ('zip not containing excel sheets')
                    }
                    else {
                        startReadFile = 0
                    }
                }
            }
            ////console.log(files[1])
            // //console.log(files[0].type)
            let shouldSkip = false;
            files.slice(startReadFile,).forEach((filedata) => {
                const filepath = ProjectPath + "\\uploads\\ExtractedFiles\\" + filedata.path.replace('/', '\\')
                ////console.log(filepath)
                const readFile = reader.readFile(filepath)
                let data = []
                if (shouldSkip) {
                    return;
                }

                const sheets = readFile.SheetNames
                ////console.log(sheets)
                for (let i = 0; i < sheets.length; i++) {
                    const temp = reader.utils.sheet_to_json(
                        readFile.Sheets[readFile.SheetNames[i]])
                    temp.forEach((res) => {
                        if (shouldSkip) {
                            return;
                        }

                        if (!res.Emp_code) {
                            shouldSkip = true;
                            return "error occured check uploaded files"

                        }
                        //let pdate = (new Date(Date.UTC(0, 0, res.PDate - 1)))
                        //console.log('pdate', res.PDate)
                        res.PDate = new Date(Date.UTC(0, 0, res.PDate - 1))
                        ////console.log(pdate.getDate(),``)
                        //console.log(res)
                        try {
                            db.query('select * from attendance where emp_id=? and pdate=date(?)', [res.Emp_code, res.PDate], async (err, result) => {
                                if (!res.Emp_code) {
                                    shouldSkip = true;
                                    return "error occured check uploaded files"

                                }
                                ////console.log(result)
                                let status = 'AA'
                                if (['WH', 'HH'].includes(res.Status)) {
                                    status = res.Status
                                }
                                if (res.totlhrs <= 4) {
                                    res.Status = 'AA'
                                    status = 'AA'
                                }
                                else if (res.totlhrs >= 9) {
                                    status = 'XX'
                                }

                                try {
                                    if (result.length === 0) {
                                        const q = 'insert into attendance(emp_id,pdate,firstin,lastout,status,totalhrs,updated_status) values (?,date(?),?,?,?,?,?)'
                                        const values = [res.Emp_code, res.PDate, res.firstin, res.LastOut, res.Status, res.totlhrs, status]
                                        await db.promise().query(q, values)
                                    }
                                    else {
                                        //console.log('updating')
                                        const q = 'update attendance set emp_id=?, pdate=date(?),firstin=?,lastout=?,status=?,totalhrs=? where emp_id=? and pdate= date(?)'
                                        const values = [res.Emp_code, res.PDate, res.firstin, res.LastOut, res.Status, res.totlhrs, res.Emp_code, res.PDate]
                                        await db.promise().query(q, values)
                                    }
                                }
                                catch (err) {
                                    //console.log(err)
                                    shouldSkip = true;
                                    return ('error with excel data please check excel file!')
                                }

                                const current_date = new Date(res.PDate)
                                const current_year = current_date.getFullYear()
                                const current_month = current_date.getMonth()
                                let from_date, to_date;
                                //new Date(Date.UTC(current_year,current_month,25)).toLocaleString()===new Date(Date.UTC(current_year,current_month,current_date.getDate())).toLocaleString()
                                if (current_date.getDate() >= 26) {
                                    from_date = new Date(Date.UTC(current_year, current_month, 26))
                                    to_date = new Date(Date.UTC(current_year, current_month + 2,))
                                }
                                else {
                                    from_date = new Date(Date.UTC(current_year, current_month - 1, 26))
                                    to_date = new Date(Date.UTC(current_year, current_month + 1, 1))
                                }
                                //console.log('emp_id', res.Emp_code)
                                const check_status_query = `select * from attendance where pdate>=date(?) and pdate<=date(?) and emp_id = ?`
                                db.query(check_status_query, [from_date, to_date, res.Emp_code], (err, result) => {
                                    if (err) return ('error occured!')
                                    else {

                                        //console.log('atte:', result)
                                        const hr_list = result.map(a => a.totalhrs <= 4 ? 0 : a.totalhrs)
                                        //console.log(hr_list)
                                        const totalhr = hr_list.reduce((acc, curr_value) => acc + (Math.trunc(curr_value)), 0)
                                        const totalmin = hr_list.reduce((acc, curr_value) => acc + (curr_value % 1).toFixed(2) * 100, 0)
                                        const totalShift = hr_list.length * 9 * 60 //in min
                                        const totalNonWorked = (hr_list.filter(hr => hr <= 4).length) * 9 * 60
                                        const totalWorked = ((totalhr * 60) + totalmin) - (totalShift - totalNonWorked)
                                        const hr_bal = (Math.trunc(totalWorked / 60) + (totalWorked % 60) / 100).toFixed(2)
                                        //console.log(hr_bal)
                                        let update_status_query;
                                        if (Number(hr_bal) < 0) {
                                            //update_status_query = `update attendance set updated_status = 'XA' where  updated_status !='XX' and updated_status ='AA' and status !='AA'  and pdate>=date(?) and pdate<=date(?) and emp_id = ? `
                                            update_status_query = `update attendance set updated_status = 'XA' where updated_status not in ('XX','CL','SL') and updated_status ='AA' and status !='AA' and pdate>=date(?) and pdate<=date(?) and emp_id = ? `
                                        }
                                        else {

                                            update_status_query = `update attendance set updated_status = 'XX' where updated_status !='XX' and updated_status in ('AA','XA') and status !='AA' and pdate>=date(?) and pdate<=date(?) and emp_id = ? `
                                        }
                                        try {
                                            db.promise().query(update_status_query, [from_date, to_date, res.Emp_code])
                                        }
                                        catch (err) {
                                            //console.log(err)
                                        }

                                    }


                                })



                                //     db.query('select balance_hr from attendance where emp_id=1 order by pdate desc limit 1',[],async(error,response)=>{
                                //         if (error) return ('error occured!')
                                //         else{
                                //             //console.log(response)
                                //             let bal_hr = 0
                                //             if (response.length !==0){
                                //                 bal_hr = response[0].balance_hr
                                //             }
                                //             //console.log(bal_hr,res.totlhrs)
                                //             if(res.totlhrs>9){
                                //                 const bal_min = (Math.trunc(bal_hr)*60)+(bal_hr%1).toFixed(2)*100 + (((Math.trunc(res.totlhrs)-9)*60)+ (res.totlhrs %1).toFixed(2)*100)
                                //                 bal_hr = parseFloat(Math.trunc(bal_min/60)+(bal_min%60)/100).toFixed(2)
                                //                 //console.log(bal_min,bal_hr)
                                //             }
                                //             else if(res.totlhrs<9 && res.totlhrs!=0){
                                //                 //console.log((Math.trunc(bal_hr)*60)+(bal_hr%1).toFixed(2)*100,(((9-(Math.trunc(res.totlhrs)))*60) -(res.totlhrs %1).toFixed(2)*100 ))
                                //                 const bal_min = ((Math.trunc(bal_hr)*60)+(bal_hr%1).toFixed(2)*100) - (((9-(Math.trunc(res.totlhrs)))*60) -(res.totlhrs %1).toFixed(2)*100 )
                                //                 bal_hr = parseFloat(Math.trunc(bal_min/60)+(bal_min%60)/100).toFixed(2)
                                //                 //console.log(bal_min,bal_hr)
                                //             }
                                //             //console.log(bal_hr,'bal')



                                //         }
                                //     })

                                // }

                                ////console.log(result)
                            })
                        }
                        catch (err) {
                            //console.log(err)
                            return ('error occured!')
                        }

                        data.push(res)



                        // Printing data
                        ////console.log(data)


                    })

                    ////console.log('uploaded')
                }
            })
            return ('file uploaded succefully')


        })
        .catch(error => {
            //console.log(error)
            //console.log(ProjectPath + "\\uploads\\" + name)
            fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
            fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
            return (
                'error occured check the uploaded file!'
            )
        })
    return (zip)
}

const storege = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        //console.log(file.originalname)
        uploadedFileName = file.originalname
        cb(null, file.originalname)

        //     setTimeout(()=>{
        //     const reseponce = uploadExcelData(file.originalname)

        // },2000)
    },
})


export const uploadStorage = multer({ storage: storege })

export const UploadFile = async (req, res) => {
    const leaveTypes = {
        'Casual': 'CL',
        'Special': 'SL'
    }
    const ProjectPath = process.cwd()
    let anyError = false

    //console.log('file', req.files)
    const name = req.files[0].originalname
    if (name !== undefined) {
        decompress(ProjectPath + "\\uploads\\" + name, ProjectPath + "\\uploads\\ExtractedFiles\\")
            .then((files) => {
                //console.log(files)
                let startReadFile

                if (files.length === 0) {
                    ////console.log('len 0')
                    fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
                    fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
                    //fs.unlink(ProjectPath+"\\uploads\\ExtractedFiles\\"+name)
                    return res.status(413).json('zip not containing files!')
                }
                else if (files.length == 1 && files[0].type === 'directory') {
                    ////console.log('len 1 dir')
                    fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
                    fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
                    return res.status(413).json('zip not containing files!')
                }
                else {

                    ////console.log(files[1])
                    ////console.log((files[1].path).slice(files[1].path.lastIndexOf('.'),))

                    if (files[0].type === 'directory') {
                        //console.log('dir')
                        if ((files[1].path).slice(files[1].path.lastIndexOf('.'),) !== '.xlsx') {
                            fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
                            fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
                            return res.status(413).json('zip not containing excel sheets')
                        }
                        else {

                            startReadFile = 1
                        }
                    }
                    else {
                        // //console.log('file type')
                        // //console.log((files[1].path).slice(files[1].path.lastIndexOf('.'),))
                        // //console.log((name).slice(0,name.lastIndexOf('.')))
                        if ((files[0].path).slice(files[0].path.lastIndexOf('.'),) !== '.xlsx') {
                            fs.rmSync(ProjectPath + "\\uploads\\ExtractedFiles\\" + (name).slice(0, name.lastIndexOf('.')), { recursive: true, force: true })
                            fs.unlinkSync(ProjectPath + "\\uploads\\" + name)
                            return res.status(413).json('zip not containing excel sheets')
                        }
                        else {
                            startReadFile = 0
                        }
                    }
                    //return res.send('ok')
                    files.slice(startReadFile,).forEach((filedata) => {
                        const filepath = ProjectPath + "\\uploads\\ExtractedFiles\\" + filedata.path.replace('/', '\\')
                        ////console.log(filepath)
                        const readFile = reader.readFile(filepath)
                        const sheets = readFile.SheetNames
                        ////console.log(sheets)
                        for (let i = 0; i < sheets.length; i++) {
                            const temp = reader.utils.sheet_to_json(
                                readFile.Sheets[readFile.SheetNames[i]])
                            temp.forEach((filedata) => {
                                //console.log(filedata)
                                let { Emp_code, PDate, firstin, LastOut, Status, totlhrs } = filedata
                                //console.log(Emp_code, PDate, firstin, LastOut, Status, totlhrs)
                                if (Emp_code===undefined || PDate ===undefined || firstin ===undefined || LastOut ===undefined || Status===undefined || totlhrs===undefined) {
                                    anyError=true
                                    return res.status(413).json("error occured check uploaded files not containing proper data")
                                    
                                }
                                else {
                                    ////console.log('pdate', PDate)
                                    const punchDate = new Date(Date.UTC(0, 0, PDate - 1))
                                    ////console.log('up-pdate', punchDate)
                                    const check_applied_leave_query = `select * from applyleaves where (selected_dates rlike ? or half_day rlike ?) and status='approved' and emp_id=?;`
                                    const check_applied_leave_values = [punchDate.toJSON().slice(0, 10), punchDate.toJSON().slice(0, 10),Emp_code]
                                    db.query(check_applied_leave_query, check_applied_leave_values, (checkerr, checkres) => {

                                        if (checkerr){
                                            anyError=true
                                            return res.status(500).json('error occured!')
                                        } 
                                        else {
                                            let updatedStatus = 'AA'
                                            //console.log('checkres', checkres)
                                            if (['WH', 'HH'].includes(Status)) {
                                                updatedStatus = Status
                                            }
                                            else{
                                                if (totlhrs <= 4) {
                                                    Status = 'AA'
                                                    updatedStatus = 'AA'
                                                }
                                                else if (totlhrs >= 9) {
                                                    updatedStatus = 'XX'
                                                }
                                                if (checkres.length!==0){
                                                    const { selected_dates, half_day, leave_type } = checkres[0]
                                                    const choosedDates = selected_dates.split(',')
                                                    //console.log(punchDate.toJSON().slice(0, 10), choosedDates.includes(punchDate.toJSON().slice(0, 10)), half_day === punchDate.toJSON().slice(0, 10))
                                                    
                                                    if (choosedDates.includes(punchDate.toJSON().slice(0, 10)) || half_day === punchDate.toJSON().slice(0, 10)) {
                                                        updatedStatus = leaveTypes[leave_type]
                                                    }
    
                                                }
                                            }
                                            
                                            console.log(updatedStatus)
                                            db.query('select * from attendance where emp_id=? and pdate=date(?)', [Emp_code, punchDate], async (atterr, attresult) => {
                                                if (atterr){
                                                    anyError=true
                                                    return res.status(500).json('error occured!')
                                                } 
                                                else {
                                                    //console.log(attresult)
                                                    try {
                                                        if (attresult.length === 0) {
                                                            const q = 'insert into attendance(emp_id,pdate,firstin,lastout,status,totalhrs,updated_status) values (?,date(?),?,?,?,?,?)'
                                                            const values = [Emp_code, punchDate, firstin, LastOut, Status, totlhrs, updatedStatus]
                                                            await db.promise().query(q, values)
                                                        }
                                                        else {
                                                            //console.log('updating')
                                                            const q = 'update attendance set emp_id=?, pdate=date(?),firstin=?,lastout=?,status=?,totalhrs=? where emp_id=? and pdate= date(?)'
                                                            const values = [Emp_code, punchDate, firstin, LastOut, Status, totlhrs, Emp_code, punchDate]
                                                            await db.promise().query(q, values)
                                                        }
                                                    }
                                                    catch (err) {
                                                        //console.log(err)
                                                        anyError=true
                                                        return ('error with excel data please check excel file!')
                                                    }

                                                    const current_date = new Date(punchDate)
                                                    const current_year = current_date.getFullYear()
                                                    const current_month = current_date.getMonth()
                                                    let from_date, to_date;
                                                    //new Date(Date.UTC(current_year,current_month,25)).toLocaleString()===new Date(Date.UTC(current_year,current_month,current_date.getDate())).toLocaleString()
                                                    // if (current_date.getDate() >= 26) {
                                                    //     from_date = new Date(Date.UTC(current_year, current_month, 26))
                                                    //     to_date = new Date(Date.UTC(current_year, current_month + 2,))
                                                    // }
                                                    // else {
                                                    //     from_date = new Date(Date.UTC(current_year, current_month - 1, 26))
                                                    //     to_date = new Date(Date.UTC(current_year, current_month + 1, 1))
                                                    // }
                                                    if (current_date.getDate() >= 26) {
                                                        from_date = new Date(Date.UTC(current_year, current_month, 26))
                                                        to_date = new Date(Date.UTC(current_year, current_month + 1,25))
                                                    }
                                                    else {
                                                        from_date = new Date(Date.UTC(current_year, current_month - 1, 26))
                                                        to_date = new Date(Date.UTC(current_year, current_month , 25))
                                                    }
                                                    //console.log('emp_id', Emp_code)
                                                    const check_status_query = `select * from attendance where pdate>=date(?) and pdate<=date(?) and emp_id = ?`
                                                    db.query(check_status_query, [from_date, to_date, Emp_code], (err, result) => {
                                                        if (err){
                                                            anyError=true
                                                            return ('error occured!')
                                                        } 
                                                        else {
                                                            //console.log('atte:', result)
                                                            const hr_list = result.map(a => a.totalhrs <= 4 ? 0 : a.totalhrs)
                                                            //console.log(hr_list)
                                                            const totalhr = hr_list.reduce((acc, curr_value) => acc + (Math.trunc(curr_value)), 0)
                                                            const totalmin = hr_list.reduce((acc, curr_value) => acc + (curr_value % 1).toFixed(2) * 100, 0)
                                                            const totalShift = hr_list.length * 9 * 60 //in min
                                                            const totalNonWorked = (hr_list.filter(hr => hr <= 4).length) * 9 * 60
                                                            const totalWorked = ((totalhr * 60) + totalmin) - (totalShift - totalNonWorked)
                                                            const hr_bal = (Math.trunc(totalWorked / 60) + (totalWorked % 60) / 100).toFixed(2)
                                                            console.log(hr_bal)
                                                            let update_status_query;
                                                            if (Number(hr_bal) < 0) {
                                                                //update_status_query = `update attendance set updated_status = 'XA' where  updated_status !='XX' and updated_status ='AA' and status !='AA'  and pdate>=date(?) and pdate<=date(?) and emp_id = ? `
                                                                update_status_query = `update attendance set updated_status = 'XA' where updated_status not in ('XX','CL','SL') and updated_status ='AA' and status !='AA' and pdate>=date(?) and pdate<=date(?) and emp_id = ? `
                                                            }
                                                            else {

                                                                update_status_query = `update attendance set updated_status = 'XX' where updated_status !='XX' and updated_status in ('AA','XA') and status !='AA' and pdate>=date(?) and pdate<=date(?) and emp_id = ? `
                                                            }
                                                            try {
                                                                db.promise().query(update_status_query, [from_date, to_date, Emp_code])
                                                                
                                                                
                                                            }
                                                            catch (err) {
                                                                //console.log(err) 
                                                                anyError=true                                                              
                                                                return res.status(500).json('error occured!')
                                                            }

                                                        }
                                                    })
                                                }
                                            })

                                        }
                                    })
                                    
                                   
                                }
                            }

                            )
                        }
                        
                    })
                    if(!anyError){
                        return res.send('file uploaded shortly... attendance may take time to update')

                    }
                    
                    

                }
            })

    }
    else {
        return res.status(413).json('file not uploaded')
    }




    // const response = await uploadExcelData(uploadedFileName)

    // //console.log('up:', response)
    // if (response === 'file uploaded succefully') {
    //     res.status(200).json(response)
    // }
    // else {
    //     res.status(500).json(response)
    // }
    //res.send('ok')
}

export const viewattendance = (req, res) => {
    const q = `select * from attendance order by pdate desc`
    db.query(q, (err, result) => {
        if (err) return res.status(500).json('error occured!')
        else {
            return res.status(200).json(result)
        }
    })
}

export const filterattendance = (req, res) => {
    //console.log(req.body)
    const { fromDate, toDate, emp_id } = req.body
    let q, v;
    if (emp_id !== '') {
        q = `select * from attendance where pdate >=? and pdate <=? and emp_id=? order by pdate`
        v = [fromDate, toDate, emp_id]
        ////console.log(emp_id)
    }
    else {
        q = `select * from attendance where pdate >=? and pdate <=?`
        v = [fromDate, toDate]
        ////console.log(emp_id)
    }

    db.query(q, v, (err, result) => {
        if (err) return res.status(500).json('error occured!')
        else {
            if (result.length === 0) {
                return res.status(406).json('No record found!')
            }
            else {
                return res.status(200).json(result)
            }
        }
    })
}

export const attendance = (req, res) => {
    //console.log(req.body)
    const current_date = new Date()
    const current_year = current_date.getFullYear()
    const current_month = current_date.getMonth()
    let from_date, to_date;
    //new Date(Date.UTC(current_year,current_month,25)).toLocaleString()===new Date(Date.UTC(current_year,current_month,current_date.getDate())).toLocaleString()
    if (current_date.getDate() >= 26) {
        from_date = new Date(Date.UTC(current_year, current_month, 26))
        to_date = new Date(Date.UTC(current_year, current_month + 1, 25))
    }
    else {
        from_date = new Date(Date.UTC(current_year, current_month - 1, 26))
        to_date = new Date(Date.UTC(current_year, current_month, 25))
    }
    const q = `select * from attendance where emp_id=? and pdate>=date(?) and pdate<=date(?)  order by pdate`
    const { emp_id } = req.body
    db.query(q, [emp_id, from_date, to_date], (err, result) => {
        if (err) return res.status(500).json('error occured!')
        else {
            if (result.length === 0) {
                return res.status(406).json('No record found!')
            }
            else {
                return res.status(200).json(result)
            }
        }
    })

}

export const filteruserattendance = (req, res) => {
    //console.log(req.body)
    const { fromDate, toDate, emp_id } = req.body
    const q = `select * from attendance where pdate >=? and pdate <=? and emp_id=? order by pdate`
    db.query(q, [fromDate, toDate, emp_id], (err, result) => {
        if (err) return res.status(500).json('error occured!')
        else {
            if (result.length === 0) {
                return res.status(406).json('No record found!')
            }
            else {
                return res.status(200).json(result)
            }
        }
    })
}

export const attendancegraphdata = (req, res) => {
    const { emp_id } = req.body
    const current_date = new Date()
    const current_year = current_date.getFullYear()
    const current_month = current_date.getMonth()
    let from_date, to_date;
    //new Date(Date.UTC(current_year,current_month,25)).toLocaleString()===new Date(Date.UTC(current_year,current_month,current_date.getDate())).toLocaleString()
    if (current_date.getDate() >= 26) {
        from_date = new Date(Date.UTC(current_year, current_month, 26))
        to_date = new Date(Date.UTC(current_year, current_month + 1, 25))
    }
    else {
        from_date = new Date(Date.UTC(current_year, current_month - 1, 26))
        to_date = new Date(Date.UTC(current_year, current_month, 25))
    }
    const q = `select pdate,totalhrs,updated_status from attendance where emp_id=? and pdate>=date(?) and pdate<=date(?) order by pdate`
    db.query(q, [emp_id, from_date, to_date], (err, result) => {
        if (err) {
            //console.log(err)
            return res.status(500).json('error occured!')
        }
        else {
            const attendanceData = result.filter(data=>data.updated_status!=='CL'&& data.updated_status!=='SL')
            const hr_list = attendanceData.map(a => a.totalhrs <= 4 ? 0 : a.totalhrs)
            //const hr_list = result.map(a => a.totalhrs <= 4 ? 0 :a.updated_status==='CL'?0:a.updated_status==='SL'?0: a.totalhrs)
            console.log('list',hr_list,attendanceData)
            const totalhr = hr_list.reduce((acc, curr_value) => acc + (Math.trunc(curr_value)), 0)
            const totalmin = hr_list.reduce((acc, curr_value) => acc + (curr_value % 1).toFixed(2) * 100, 0)
            const totalShift = hr_list.length * 9 * 60 //in min
            const totalNonWorked = (hr_list.filter(hr => hr <= 4).length) * 9 * 60
            const totalWorked = ((totalhr * 60) + totalmin) - (totalShift - totalNonWorked)
            const hr_bal = (Math.trunc(totalWorked / 60) + (totalWorked % 60) / 100).toFixed(2)
            //console.log('bal_hr', hr_bal)
            //const data = result.reverse()
            //console.log(result)
            return res.status(200).json({ graphData: result, balance: hr_bal })
        }
    })
}