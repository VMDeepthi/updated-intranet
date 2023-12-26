import express from 'express'
import { applyforleave, checkapplicationerequest, getreportinghead, pendingleaves, reportingheadlogin } from '../controllers/applyleave.js'

const route = express.Router() 

route.post('/getreportinghead',getreportinghead)
route.post('/applyforleave', applyforleave)
route.post('/pendingleaves', pendingleaves)
route.post('/reportingheadlogin',reportingheadlogin)
route.post('/checkapplicationerequest',checkapplicationerequest)

export default route