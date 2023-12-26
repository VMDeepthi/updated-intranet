import db from "../config/connectiondb.js"
import { v4 as uuidv4 } from 'uuid';
import transporter from "../config/emailconfig.js";
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"


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

export const applyforleave = async (req, res) => {
    console.log(req.body)
    const { reporting_head_name, mail_approved_by, balence_leaves, cc_mail, leave_type, leave_options, from_date, to_date, selected_dates, half_day, total_leaves, reason, applicant_emp_id, applicant_name, applicant_email } = req.body
    const applicationId = uuidv4()
    console.log(cc_mail)
    const cc_mails = cc_mail.replace(/\n/g, '')
    const leave_dates = selected_dates.join(', ')

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
                selected_dates: selected_dates,
                half_day: half_day,
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
                                default:
                                    application_status = 'NA'
                                    break

                            }
                            const mail_templte = application_status === 'approved' ? 'LeaveRequestApproved' : 'LeaveRequestDenied'
                            console.log(mail_templte)
                            result = result[0]
                            const token = jwt.sign({ employee_id: result.employee_id, email: result.email }, process.env.HEAD_JWT_SECRET)
                            console.log(token)
                            //delete result.password



                            if (checkres[0].status === 'pending') {
                                const update_application_query = `update applyleaves set status=? where id=?`
                                const update_application_values = [application_status, applicationId]
                                const { applicant_name, applicant_email, emp_id, from_date, to_date, leave_type, leave_option, selected_dates, half_day, total_leaves } = checkres[0]
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

                                    transporter.sendMail(mailOptions, (err, info) => {
                                        if (err) {
                                            console.log(err)
                                            return res.status(500).json('Not able send mail!')
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
                if (checkres[0].status === 'pending') {
                    let application_status;
                    switch (status) {
                        case 'approve':
                            application_status = 'approved'
                            break
                        case 'deny':
                            application_status = 'denied'
                            break
                        default:
                            application_status = 'NA'
                            break
                    }
                    const mail_templte = application_status === 'approved' ? 'LeaveRequestApproved' : 'LeaveRequestDenied'
                    console.log(mail_templte)
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
                    const update_application_query = `update applyleaves set status=? where id=?`
                    const update_application_values = [application_status, applicationId]
                    try {

                        await db.promise().query(update_application_query, update_application_values)
                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                console.log(err)
                                return res.status(500).json('Not able send mail!')
                            }
                            else return res.status(200).json(application_status)
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