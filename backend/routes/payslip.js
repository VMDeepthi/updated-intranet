import express from 'express'

import { deletepayslip, uploadPaySlipData, viewpayslipdata, viewemployeepayslip,payslips, companydetails} from '../controllers/payslip.js'

const route = express.Router()

// route.post('/uploadpayslip', uploadStorage.array('file'), UploadFile)
route.post('/uploadpayslip', uploadPaySlipData)
route.post('/deletepayslip', deletepayslip)
route.post('/viewpayslipdata', viewpayslipdata)
route.post('/viewemppayslip', viewemployeepayslip)
route.post('/payslips', payslips)
route.post('/companydetails', companydetails)


export default route