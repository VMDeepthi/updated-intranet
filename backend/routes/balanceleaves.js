import express from 'express'
import { getemployeedata, manageleaves, monthattendance, monthbalance } from '../controllers/balanceleaves.js'
import { checkAuthentication } from '../middleware/authUsers.js'

const route = express.Router()

route.post('/monthattendance',monthattendance)
route.post('/monthbalance',monthbalance)

route.get('/getemployeedata',getemployeedata)
route.post('/manageleaves',manageleaves)


export default route