import express from 'express'
import { monthattendance, monthbalance } from '../controllers/balanceleaves.js'

const route = express.Router()

route.post('/monthattendance',monthattendance)
route.post('/monthbalance',monthbalance)


export default route