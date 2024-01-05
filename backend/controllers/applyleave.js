import db from "../config/connectiondb.js"
import { v4 as uuidv4 } from 'uuid';
import transporter from "../config/emailconfig.js";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"


const leaveTypes = {
    'Casual': 'CL',
    'Special': 'SL'
}


export const getreportinghead = (req, res) => {
    const { emp_id } = req.body
    const q = `select concat(first_name,' ', last_name) as name, email from usermanagement inner join reportingstructure on employee_id = reporting_head where users=? `
    const v = [emp_id]
    db.query(q, v, (err, result) => {
        if (err) return res.status(500).json('error occured!')
        else {
            return res.status(200).json(result)
        }
    })

}

export const pendingleaves = (req, res) => {
    const { emp_id } = req.body
    const q = `select count(total_leaves) as pending_leaves from applyleaves where status='pending' and emp_id=?`
    const v = [emp_id]
    db.query(q, v, (err, result) => {
        if (err) return res.status(500).json('error occured!')
        else {
            return res.status(200).json(result)
        }
    })
}

export const applyforleave = (req, res) => {
    console.log(req.body)
    let { reporting_head_name, mail_approved_by, balence_leaves, cc_mail, leave_type, leave_options, from_date, to_date, selected_dates, half_day, total_leaves, reason, applicant_emp_id, applicant_name, applicant_email } = req.body
    const applicationId = uuidv4()
    console.log(cc_mail)
    const cc_mails = cc_mail.replace(/\n/g, '')
    const leave_dates = selected_dates.join(',')

    const check_application_query = `select * from applyleaves where (selected_dates rlike ? or half_day rlike ?) and emp_id=? and (status='approved' or status ='pending');`
    let check_application_values;
    if (selected_dates.length === 0) {
        check_application_values = [half_day, half_day, applicant_emp_id]
    }
    else if (half_day === '') {
        check_application_values = [selected_dates.join('|'), selected_dates.join('|'), applicant_emp_id]
    }
    else {
        check_application_values = [selected_dates.join('|'), half_day, applicant_emp_id]
    }

    db.query(check_application_query, check_application_values, async (checkerr, checkres) => {
        console.log('check result', checkres)
        if (checkerr) {
            console.log(checkerr)
            return res.status(500).json('error occured!')
        }

        else {
            if (checkres.length === 0) {
                const q = `insert into applyleaves values(?)`
                const v = [[applicationId, mail_approved_by, cc_mails, leave_type, leave_options, from_date, to_date, leave_dates, half_day, total_leaves, reason, 'pending', applicant_emp_id, applicant_name, applicant_email]]
                try {
                    await db.promise().query(q, v)
                    const mailOptions = {
                        from: `"${applicant_name}" <${applicant_email}`,
                        to: [mail_approved_by],
                        cc: cc_mails.split(','),
                        subject: 'Apply For Leave',
                        template: 'LeaveRequest',
                        context: {
                            reporting_head: reporting_head_name,
                            applicant_name: applicant_name,
                            applicant_emp_id: applicant_emp_id,
                            total_leaves: total_leaves,
                            balence_leaves: balence_leaves,
                            reason: reason,
                            leave_type: leave_type,
                            leave_option: leave_options,
                            selected_dates: selected_dates !== '' ? selected_dates : 'NA',
                            half_day: half_day !== '' ? half_day : 'NA',
                            approve_request: `http://192.168.30.93:3000/reportingheadlogin/application/approve?id=${applicationId}`,
                            deny_request: `http://192.168.30.93:3000/reportingheadlogin/application/deny?id=${applicationId}`
                        }
                    }

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json('Not able send mail!')
                        }
                        else return res.status(201).json('Mail sended to your corresponding reporting head for approvel')
                    })

                }
                catch {
                    return res.status(500).json('error occured!')
                }
            }
            else {
                const selectedDates = [...selected_dates, half_day]
                const alreadyExistsDates = [...checkres[0].selected_dates.replace(/ /g, '').split(','), checkres[0].half_day]
                console.log(selectedDates, alreadyExistsDates, checkres[0].selected_dates.replace('', ''))
                let existDates = selectedDates.filter(date => alreadyExistsDates.includes(date) && date !== '')

                return res.status(406).json(`Already applied for leave on ${existDates.join(', ')}`)

            }
        }

    })







    //res.send('ok')
}

export const reportingheadlogin = (req, res) => {
    console.log(req.body)

    const { email, password, status, applicationId } = req.body

    // console.log(req.body)
    //if(bcrypt.compareSync(req.body.password))
    const check_application_query = `select * from applyleaves where mail_approved_by=? and id=?`
    const check_application_values = [email, applicationId]
    db.query(check_application_query, check_application_values, (checkerr, checkres) => {
        if (checkerr) return res.status(500).json('error occured!')
        else {
            console.log(checkres)
            if (checkres.length === 0) {
                return res.status(500).json('Invalid Login')
            }
            else {
                const q = `select * from usermanagement where email=? and status='active'`
                db.query(q, [req.body.email], async (err, result) => {
                    if (err) return res.status(500).json('error occured!')
                    else {
                        if (result.length !== 0 && bcrypt.compareSync(password, result[0].password)) {
                            let application_status;
                            switch (status) {
                                case 'approve':
                                    application_status = 'approved'
                                    break
                                case 'deny':
                                    application_status = 'denied'
                                    break
                                case 'cancel':
                                    application_status = 'cancelled'
                                    break
                                default:
                                    application_status = 'NA'
                                    break

                            }
                            const mail_templte = application_status === 'approved' ? 'LeaveRequestApproved' : application_status === 'denied' ? 'LeaveRequestDenied' : 'LeaveRequestCancelled'
                            console.log(mail_templte)
                            result = result[0]
                            const token = jwt.sign({ employee_id: result.employee_id, email: result.email }, process.env.HEAD_JWT_SECRET)
                            console.log(token)
                            //delete result.password
                            const { applicant_name, applicant_email, emp_id, from_date, to_date, leave_type, leave_option, selected_dates, half_day, total_leaves } = checkres[0]


                            console.log('cancel application','coming', application_status,  )
                            if ((checkres[0].status === 'pending' && (application_status === 'approved' || application_status === 'denied')) || (checkres[0].status === 'approved' && application_status === 'cancelled')) {


                                const update_application_query = `update applyleaves set status=? where id=?`
                                const update_application_values = [application_status, applicationId]


                                const mailOptions = {
                                    from: `"${result.first_name} ${result.last_name}" <${applicant_email}`,
                                    to: [applicant_email],
                                    subject: 'Your Request is ' + `${application_status}`.toUpperCase(),
                                    template: mail_templte,
                                    context: {
                                        to: `${applicant_name}(bcg/${emp_id})`,
                                        from_date: from_date !== '' ? from_date : 'NA',
                                        to_date: to_date !== '' ? to_date : 'NA',
                                        leave_type: leave_type,
                                        leave_option: leave_option,
                                        full_days: selected_dates !== '' ? selected_dates : 'NA',
                                        half_days: half_day !== '' ? half_day : 'NA',
                                        total_leaves: total_leaves,
                                        approved_by: `${result.first_name} ${result.last_name} (bcg/${result.employee_id})`,
                                        status: application_status
                                    }
                                }

                                try {
                                    await db.promise().query(update_application_query, update_application_values)
                                    let anyError;
                                    console.log('cancel application','coming', application_status)
                                    if (application_status === 'approved') {
                                        const update_attendance_query = `update attendance set updated_status=? where pdate in (?) and emp_id=?`
                                        const update_attendance_values = [leaveTypes[leave_type], [...selected_dates.split(','), half_day], emp_id]
                                        await db.promise().query(update_attendance_query, update_attendance_values)
                                    }
                                    else if (application_status === 'cancelled') {
                                        console.log('cancel application','coming', application_status)
                                        const update_attendance_query = `update attendance set updated_status='AA' where pdate in (?) and emp_id=?`
                                        const dateRanges = [...selected_dates.split(','), half_day].filter(date=>date!=='')
                                        console.log('dateRanges',dateRanges)
                                        const update_attendance_values = [dateRanges, emp_id]
                                        const updated = await db.promise().query(update_attendance_query, update_attendance_values)
                                        console.log('upadated', updated)

                                        dateRanges.forEach(punchDate => {
                                            const current_date = new Date(punchDate)
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
                                            //console.log('emp_id', Emp_code)
                                            const check_status_query = `select * from attendance where pdate>=date(?) and pdate<=date(?) and emp_id = ?`
                                            db.query(check_status_query, [from_date, to_date, emp_id], (err, result) => {
                                                if (err) {
                                                    anyError = true
                                                    return ('error occured!')
                                                }
                                                else {
                                                    console.log('atte:', result)
                                                    const hr_list = result.map(a => a.totalhrs <= 4 ? 0 : a.totalhrs)
                                                    console.log(hr_list)
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
                                                        db.promise().query(update_status_query, [from_date, to_date, emp_id])


                                                    }
                                                    catch (err) {
                                                        console.log(err)
                                                        anyError = true
                                                        return res.status(500).json('error occured!')
                                                    }

                                                }
                                            })

                                        });



                                    }
                                    transporter.sendMail(mailOptions, (err, info) => {
                                        if (err) {
                                            console.log(err)
                                            return res.status(500).json('Not able send mail!')
                                        }
                                        else if (anyError) {
                                            return res.cookie('HEADAUTHID', token, { maxAge: 172800000 }).status(200).json(`${application_status} but attendance updation got error contact admin!`)

                                        }
                                        else return res.cookie('HEADAUTHID', token, { maxAge: 172800000 }).status(200).json(application_status)
                                    })
                                    console.log(result)



                                }
                                catch {
                                    return res.status(500).json('error occured!')
                                }

                            }
                            else {
                                res.cookie('HEADAUTHID', token, { maxAge: 172800000 }).status(200).json(`already ${checkres[0].status}`)

                            }

                        }
                        else {
                            return res.status(401).json('Invalid email/password!')
                        }
                    }
                })

            }
            //res.send('ok')
        }

    })



}


export const checkapplicationerequest = (req, res) => {
    const { status, applicationId } = req.body
    const token = req.cookies.HEADAUTHID
    const data = jwt.verify(token, process.env.HEAD_JWT_SECRET)
    const { email } = data

    console.log(data)
    const check_application_query = `select applicant_name, applicant_email, emp_id, from_date, to_date, leave_type, leave_option, selected_dates, half_day, total_leaves,first_name,last_name,employee_id,applyleaves.status from applyleaves inner join usermanagement on email=mail_approved_by where mail_approved_by=? and id=?`
    const check_application_values = [email, applicationId]
    db.query(check_application_query, check_application_values, async (checkerr, checkres) => {
        if (checkerr) return res.status(500).json('error occured!')
        //console.log(checkres)
        //res.send('ok')
        else {
            if (checkres.length === 0) {
                return res.clearCookie('HEADAUTHID').status(401).json('Unauthorized Application')
            }
            else {
                let application_status;
                switch (status) {
                    case 'approve':
                        application_status = 'approved'
                        break
                    case 'deny':
                        application_status = 'denied'
                        break
                    case 'cancel':
                        application_status = 'cancelled'
                        break
                    default:
                        application_status = 'NA'
                        break

                }
                const mail_templte = application_status === 'approved' ? 'LeaveRequestApproved' : application_status === 'denied' ? 'LeaveRequestDenied' : 'LeaveRequestCancelled'
                const { applicant_name, applicant_email, emp_id, from_date, to_date, leave_type, leave_option, selected_dates, half_day, total_leaves, first_name, last_name, employee_id } = checkres[0]
                const mailOptions = {
                    from: `"${first_name} ${last_name}" <${applicant_email}`,
                    to: [applicant_email],
                    subject: 'Your Request is ' + `${application_status}`.toUpperCase(),
                    template: mail_templte,
                    context: {
                        to: `${applicant_name}(bcg/${emp_id})`,
                        from_date: from_date !== '' ? from_date : 'NA',
                        to_date: to_date !== '' ? to_date : 'NA',
                        leave_type: leave_type,
                        leave_option: leave_option,
                        full_days: selected_dates !== '' ? selected_dates : 'NA',
                        half_days: half_day !== '' ? half_day : 'NA',
                        total_leaves: total_leaves,
                        approved_by: `${first_name} ${last_name} (bcg/${employee_id})`,
                        status: application_status
                    }
                }
                if ((checkres[0].status === 'pending' && (application_status === 'approved' || application_status === 'denied')) || (checkres[0].status === 'approved' && application_status === 'cancelled')) {

                    console.log(mail_templte)

                    const update_application_query = `update applyleaves set status=? where id=?`
                    const update_application_values = [application_status, applicationId]

                    try {
                        let anyError = false

                        await db.promise().query(update_application_query, update_application_values)
                        if (application_status === 'approved') {
                            console.log('approval')
                            const update_attendance_query = `update attendance set updated_status=? where pdate in (?) and emp_id=?`
                            const update_attendance_values = [leaveTypes[leave_type], [...selected_dates.split(','), half_day],emp_id]
                            await db.promise().query(update_attendance_query, update_attendance_values)
                        }
                        else if (application_status === 'cancelled') {
                            console.log('cancel','com')
                            const update_attendance_query = `update attendance set updated_status='AA' where pdate in (?) and emp_id=?`
                            const dateRanges = [...selected_dates.split(','), half_day].filter(date=>date!=='')
                            const update_attendance_values = [dateRanges, emp_id]
                            const update = await db.promise().query(update_attendance_query, update_attendance_values)
                            console.log(update, dateRanges)

                            dateRanges.forEach(punchDate => {
                                const current_date = new Date(punchDate)
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
                                //console.log('emp_id', Emp_code)
                                const check_status_query = `select * from attendance where pdate>=date(?) and pdate<=date(?) and emp_id = ?`
                                db.query(check_status_query, [from_date, to_date, emp_id], (err, result) => {
                                    if (err) {
                                        anyError = true
                                        return ('error occured!')
                                    }
                                    else {
                                        console.log('atte:', result)
                                        const hr_list = result.map(a => a.totalhrs <= 4 ? 0 : a.totalhrs)
                                        console.log(hr_list)
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
                                            db.promise().query(update_status_query, [from_date, to_date,emp_id])


                                        }
                                        catch (err) {
                                            console.log(err)
                                            anyError = true
                                            return res.status(500).json('error occured!')
                                        }

                                    }
                                })

                            });
                        }
                        transporter.sendMail(mailOptions, (err, info) => {
                            
                            if (err) {
                                console.log(err, anyError)
                                return res.status(500).json('Not able send mail!')
                            }
                            else if (anyError) {
                                return res.status(200).json(`${application_status} but attendance updation got error contact admin!`)

                            }
                            else {
                                console.log('mail')
                                return res.status(200).json(application_status)
                            }
                        })
                    }


                    catch (err) {
                        console.log(err)
                        return res.status(500).json('error occured!')
                    }


                }
                else {
                    res.status(200).json(`already ${checkres[0].status}`)
                }

            }
        }
    })


}

//--------------history log------------//



export const cancelapplication = async (req, res) => {
    console.log(req.body)
    const { id, mail_approved_by, balence_leaves, cc_mail, leave_type, leave_options, selected_dates, half_day, total_leaves, status, reason, emp_id, applicant_name, applicant_email } = req.body

    if (status === 'pending') {
        const update_application_query = `update applyleaves set status ='cancelled' where id =?`
        const update_application_values = [id]
        try {
            await db.promise().query(update_application_query, update_application_values)
            return res.status(200).json('Your request canceled successfully')
        }
        catch (err) {
            console.log(err)
            return res.status(500).json('error occured!')
        }

    }
    else if (status === 'approved') {
        const reporting_head_name_quary = `select concat(first_name,' ', last_name) as name from usermanagement where email=? and status = 'active'`
        const reporting_head_name_value = [mail_approved_by]
        db.query(reporting_head_name_quary, reporting_head_name_value, (error, result) => {
            if (error) return res.status(500).json('error occured!')
            else {
                if (result.length === 0) {
                    return res.status(406).json('Reporting Might be Not Active Contact Admin!')
                }
                else {
                    const reporting_head_name = result[0].name
                    const mailOptions = {
                        from: `"${applicant_name}" <${applicant_email}`,
                        to: [mail_approved_by],
                        cc: cc_mail.split(','),
                        subject: 'Cancel The Leave Request',
                        template: 'LeaveRequestCancelApplication',
                        context: {
                            reporting_head: reporting_head_name,
                            applicant_name: applicant_name,
                            applicant_emp_id: emp_id,
                            total_leaves: total_leaves,
                            balence_leaves: balence_leaves,
                            reason: reason,
                            leave_type: leave_type,
                            leave_option: leave_options,
                            selected_dates: selected_dates !== '' ? selected_dates : 'NA',
                            half_day: half_day !== '' ? half_day : 'NA',
                            cancel_request: `http://192.168.30.93:3000/reportingheadlogin/application/cancel?id=${id}`
                        }
                    }

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json('Not able send mail!')
                        }
                        else return res.status(201).json('Mail sended to your corresponding reporting head for Cancellation')
                    })
                }
            }
        })



    }
    else {
        return res.send('ok')
    }


}

export const historylogapplication = (req, res) => {
    console.log(req.body)
    const { applicationType, fromDate, toDate, emp_id } = req.body
    let searchLogQuery, searchLogValues;
    switch (applicationType) {
        case 'Leave':
            searchLogQuery = `select * from applyleaves where ((from_date >= ? and from_date <= ?) or (half_day>=? and half_day<=?)) and emp_id=?`
            searchLogValues = [fromDate, toDate, fromDate, toDate, emp_id]
    }
    db.query(searchLogQuery, searchLogValues, (err, result) => {
        if (err) return res.status(500).json('error occured!')
        else {
            console.log(result)
            return res.status(200).json(result)

        }
    })
    //res.send('ok')
}



