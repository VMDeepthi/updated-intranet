import expres from 'express'
import { lastsalarythreerecoreds, uploadsalarydata, viewsalarydata, viewusermonthsalarydata } from '../controllers/salarymanagement.js'



const route = expres.Router()


route.post('/uploadsalarydata',uploadsalarydata)
route.post('/viewsalarydata', viewsalarydata)
route.post('/viewusermonthsalarydata', viewusermonthsalarydata)
route.post('/lastsalarythreerecoreds',lastsalarythreerecoreds)


export default route