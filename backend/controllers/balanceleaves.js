import db from "../config/connectiondb.js";


export const monthattendance = (req, res) => {
    console.log(req.body)
    const { emp_id, from_date, to_date } = req.body

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
                return res.status(200).json({open_leaves:open_leaves,balance_leaves:balance_leaves,new_added_leaves:new_added_leaves,adjusted_leaves:adjusted_leaves})
            }
            else {
                const q = `select total_leaves from balanceleaves where date<? and emp_id=? order by id  limit 1 `
                
                const v = [from_date,emp_id]
                db.query(q, v, (err, result) => {
                    if (err) return res.status(500).json('error occured!')
                    else {
                        console.log('balence', result)
                        if (result.length == 0) {
                            return res.status(200).json({open_leaves:0,balance_leaves:0,new_added_leaves:0,adjusted_leaves:0})
                        }
                        else {
                            return res.status(200).json({open_leaves:result[0].total_leaves,balance_leaves:result[0].total_leaves,new_added_leaves:0,adjusted_leaves:0})
                        }
                    }
                })
            }

            
        }
    })
    //res.send('ok')
}