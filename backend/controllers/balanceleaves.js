import db from "../config/connectiondb.js";


export const monthattendance = (req, res) => {
    console.log(req.body)
    let { emp_id, from_date, to_date } = req.body
    
    console.log(from_date, to_date)
    const q = `select * from attendance where pdate>=date(?) and pdate<=date(?) and emp_id=? order by pdate`
    const v = [from_date, to_date, emp_id]
    db.query(q, v, (err, result) => {
        if (err) return res.status(500).json('error occured!')
        else {
            //console.log(result)
            return res.status(200).json(result)
        }
    })
    //res.send('ok')
}



export const monthbalance = (req, res) => {
    console.log(req.body)
    const { emp_id, from_date, to_date } = req.body

    console.log(from_date, to_date)
    const q = `select * from balanceleaves where date>=date(?) and date<=date(?) and emp_id=? order by id`
    const v = [from_date, to_date, emp_id]
    db.query(q, v, (err, balanceData) => {
        if (err) return res.status(500).json('error occured!')
        else {
            //console.log(result)
            if (balanceData.length !== 0) {
                const open_leaves = balanceData[0].total_leaves + balanceData[0].credit + balanceData[0].debit
                const balance_leaves = balanceData[balanceData.length - 1].total_leaves
                //const new_added_leaves = balanceData.filter(leaves=>leaves.reference==='annual leaves' || leaves.reference==='admin adjustment').map(leave=>leave.credit).reduce((accumulator, currentValue)=>accumulator + currentValue,0)
                const new_added_leaves = balanceData.map(leave => leave.credit).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                const adjusted_leaves = balanceData.map(leave => leave.debit).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                console.log('open_leaves:', open_leaves)
                console.log('balance_leaves:', balance_leaves)
                console.log('new_added_leaves:', new_added_leaves)
                console.log('adjusted_leaves:', adjusted_leaves)
                return res.status(200).json({ open_leaves: open_leaves, balance_leaves: balance_leaves, new_added_leaves: new_added_leaves, adjusted_leaves: adjusted_leaves })
            }
            else {
                const q = `select total_leaves from balanceleaves where date<? and emp_id=? order by id  limit 1 `

                const v = [from_date, emp_id]
                db.query(q, v, (err, result) => {
                    if (err) return res.status(500).json('error occured!')
                    else {
                        console.log('balence', result)
                        if (result.length == 0) {
                            return res.status(200).json({ open_leaves: 0, balance_leaves: 0, new_added_leaves: 0, adjusted_leaves: 0 })
                        }
                        else {
                            return res.status(200).json({ open_leaves: result[0].total_leaves, balance_leaves: result[0].total_leaves, new_added_leaves: 0, adjusted_leaves: 0 })
                        }
                    }
                })
            }


        }
    })
    //res.send('ok')
}


//-------------------------------------manage leaves-------------------------------------

export const getemployeedata = (req, res) => {
    console.log(req.checkAuth)
    if (req.checkAuth.isAuth && req.checkAuth.user_type === 'admin') {
        const userQuery = `select concat(first_name,' ',last_name) as fullname,employee_id, status, user_type, department, date_of_joining from usermanagement where status='active' ; `
        db.query(userQuery, (err, result) => {
            if (err) return res.status(500).json('error occured!')
            else {
                console.log(result)
                const data = result.map(res => ({ value: res, label: `${res.fullname} (bcg/${res.employee_id})` }))
                return res.send(data)
            }
        })

    }
    else {
        console.log('Unauthorized User!')
        return res.status(401).json('Unauthorized User!')

    }


}

export const manageleaves = async (req, res) => {
    console.log(req.body)
    if (req.checkAuth.isAuth && req.checkAuth.user_type === 'admin') {
        const { emp_id, manageType, no_of_leaves, date, reference, totalLeaves } = req.body
        const update_balace_leaves_quary = `insert into balanceleaves(emp_id,${manageType},date,total_leaves,reference) values(?)`
        const update_balace_leaves_values = [[emp_id, no_of_leaves, date, totalLeaves, reference]]
        try {
            await db.promise().query(update_balace_leaves_quary, update_balace_leaves_values)
            return res.status(200).json('Record added succefully')
        }
        catch (err) {
            console.log(err)
            return res.status(500).json('Error occured! Record not added! ')
        }

    }
    else {
        console.log('Unauthorized User!')
        return res.status(401).json('Unauthorized User!')

    }
    //res.send('ok')
}


export const managedepartmentsleaves = (req, res) => {
    console.log(req.body)
    if (req.checkAuth.isAuth && req.checkAuth.user_type === 'admin') {
        const { company_name, manage_type, departments, no_of_leaves, date, reference, auto, carrie_forward_leaves } = req.body
        const find_employees_query = `select employee_id,(select total_leaves from balanceleaves where emp_id=employee_id order by id desc limit 1) as total_leaves from usermanagement where company_name=? and status='active' and department in (?);`
        const find_employees_values = [company_name, departments]
        db.query(find_employees_query, find_employees_values, async (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json('Error occured! Record not added! ')

            }
            else {

                const employees = result.map(data => ({ ...data, total_leaves: data.total_leaves === null ? 0 : data.total_leaves }))
                console.log(employees)
                for (let i = 0; i < employees.length; i++) {
                    const { employee_id, total_leaves } = employees[i]
                    let totalBal = 0
                    if (auto && manage_type === 'credit') {
                        if (total_leaves <= carrie_forward_leaves) {
                            totalBal = total_leaves + no_of_leaves
                        }
                        else {
                            totalBal = carrie_forward_leaves + no_of_leaves
                        }
                    }
                    else if (!auto && manage_type === 'credit') {
                        totalBal = total_leaves + no_of_leaves

                    }
                    else if (!auto && manage_type === 'debit') {
                        totalBal = total_leaves - no_of_leaves
                    }
                    const insert_balance_record_query = `insert into balanceleaves(emp_id,${manage_type},date,total_leaves,reference) values(?)`
                    const insert_balance_record_values = [[employee_id, no_of_leaves, date, totalBal, reference]]
                    try {
                        await db.promise().query(insert_balance_record_query, insert_balance_record_values)

                    }
                    catch {
                        return res.status(500).json('Error occured! Record not added! ')

                    }
                }
                return res.status(201).json('Record added successfully')
            }

        })
    }
    else {
        return res.status(401).json(`Unauthorized User can't perform action!`)
    }


    //res.send('ok')


}