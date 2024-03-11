import multer from "multer"
import decompress from "decompress";
import fs from 'fs'
import reader from "xlsx";
import * as XLSX from "xlsx";
import db from "../config/connectiondb.js";
import path from 'path'


let uploadedFileName;

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

export const uploadPaySlipData = async (req, res) => {
    // console.log(req.body)
    try{
        let data = req.body.data;
        const dataforexcel = req.body.data;
        const month = months.indexOf(req.body.date.month) + 1
        const year = req.body.date.year

        // checking if payslip data is already present
        const q=`SELECT * FROM payslip where MONTH(MONTH) = ${month} AND YEAR(MONTH) = ${year}`
        const response = await db.promise().query(q);
        if(response[0].length > 0) {
            return res.status(500).json("Data Already Exists")
        }

        const correctDate = `${year}-` + month + "-02";
        console.log(correctDate)
        console.log(data)
        // formatting date 
        data = data.map(e => {
            e.MONTH = correctDate;
            // e.empid = e.empid.replace('YB/', '') * 1;
            e.empid = e.empid.replace('YB/', '');
            e.EMPLOYEE_NAME = e['EMPLOYEE NAME'];
            e.T_H = e['T/H'];
            return e;
        })

        // uploading into DB 
        data.forEach(async e => {
            const insert_query = `insert into payslip values(?)`
            const insert_values = [null, e.empid, e.MONTH, e.EMPLOYEE_NAME, e.empsalorgbasic, e.empsalorghra, e.empsalorgconv, e.empsalorgedu, e.empsalorgshift, e.empsaltravel, e.empsalmedical, e.empsalorgsundrycreditothers, e.emporggross, e.empsalorgepf, e.empsalorgesi, e.empsalorgpt, e.A0, e.B0, e.empsalbasic, e.empsalhra, e.empsalconv, e.empsaledu, e.empsalshift, e.T_H, e.empsalmed, e.empsallta, e.empsalsundrycreditothers, e.empsallaptop, e.empsalinternet, e.empsalclientincentive, e.empsalincentive, e.empsalbonus, e.empsalawards, e.empsalothers, e.empsalgross, e.empsalepf, e.empsalesi, e.empsalpt, e.empsalitax, e.empsalsodexo, e.empsaldebitother, e.empsaldeductions, e.empsalnet]
            await db.promise().query(insert_query, [insert_values])
        })

        
        return res.status(200).json("Uploaded Successfully")
    }catch(err){
        console.log(err)
        return res.status(500).json("Error occured")
    }
}
export const deletepayslip=(req,res)=>{
    console.log(req.body)
    const q=`DELETE FROM payslip where MONTH(MONTH) = ${months.indexOf(req.body.month) + 1} AND YEAR(MONTH) = ${req.body.year}`
    db.query(q,[req.body.id],(err,result)=>{
        
        if(err) {
            console.log(err)
            return res.status(500).json(err)
        }
        else{
            console.log(result)
            return res.status(200).json('Deleted Successfully')
        }
    })
    //return res.status(500).json('from delete')
}
export const viewpayslipdata = async (req, res) => {
    try{
        console.log(req.body)

        const q=`SELECT * FROM payslip where MONTH(MONTH) = ${months.indexOf(req.body.month) + 1} AND YEAR(MONTH) = ${req.body.year}`
        const response = await db.promise().query(q);

        console.log(response)

        return res.status(200).json(response[0])
    }catch(err){
        console.log(err)
        return res.status(500).json("Error occured")
    }
}


export const viewemployeepayslip = async (req, res) => {
    try{
        console.log(req.body)

        const q=`SELECT * FROM payslip where MONTH(MONTH) = ${months.indexOf(req.body.month) + 1} AND YEAR(MONTH) = ${req.body.year} AND empid = ${req.body.empid} `
        const response = await db.promise().query(q);

        console.log(response)

        return res.status(200).json(response[0])
    }catch(err){
        console.log(err)
        return res.status(500).json("Error occured")
    }
}
export const payslips = async (req, res) => {
    const getPreviousThreeMonths = () => {
        // Create a date object
        const date = new Date();

        const month = date.getMonth();
        const year = date.getFullYear();

        let lastThreeMonths = []
        lastThreeMonths.push(cycleMonth(month - 1, year));
        lastThreeMonths.push(cycleMonth(month - 2, year));
        lastThreeMonths.push(cycleMonth(month - 3, year));

        return lastThreeMonths;
    }

    const cycleMonth = (month, year) => {
        if (month < 0) {
            year = year - 1;
            month = month + 12;
        }
        return {
            year: year, 
            month: month
        }
    }
    console.log(req.body)
    try {
        const previousThreeMonths = getPreviousThreeMonths()     
        const query = `select MONTH, empsalnet, empsalepf from payslip where empid=${req.body.emp_id} and ((MONTH(MONTH) = ${previousThreeMonths[0].month + 1} and YEAR(MONTH) = ${previousThreeMonths[0].year}) or (MONTH(MONTH) = ${previousThreeMonths[1].month + 1} and YEAR(MONTH) = ${previousThreeMonths[1].year}) or (MONTH(MONTH) = ${previousThreeMonths[2].month + 1} and YEAR(MONTH) = ${previousThreeMonths[2].year}))`
        console.log(query)
        const response = await db.promise().query(query);
        
        res.status(200).json(response[0]);
    } catch (error) {
        console.error('Error fetching payslip data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

export const companydetails = (req, res) =>{
    const {emp_id} = req.body
    const company_details_query = `select company_logo, company_address from companymanagement inner join usermanagement on usermanagement.company_name = companymanagement.company_name where employee_id =? `
    const company_details_values = [emp_id]
    db.query(company_details_query, company_details_values,(err, result)=>{
        if(err)return res.status(500).json("Error occured")
        else{
            return res.status(200).json(result)
        }

    })
}