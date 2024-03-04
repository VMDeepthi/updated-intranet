import express from 'express'
import { getemployeedata, managedepartmentsleaves, manageleaves, monthattendance, monthbalance } from '../controllers/balanceleaves.js'


const route = express.Router()

route.post('/monthattendance',monthattendance)
route.post('/monthbalance',monthbalance)

route.get('/getemployeedata',getemployeedata)
route.post('/manageleaves',manageleaves)
route.post('/managedepartmentsleaves',managedepartmentsleaves)


export default route