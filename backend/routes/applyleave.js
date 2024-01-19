import express from 'express'
import { applyforleave, cancelapplication, checkapplicationerequest, getbalanceleaves, getreportinghead, historylogapplication, pendingleaves, reportingheadlogin } from '../controllers/applyleave.js'

const route = express.Router() 

route.post('/getreportinghead',getreportinghead)
route.post('/applyforleave', applyforleave)
route.post('/pendingleaves', pendingleaves)
route.post('/getbalanceleaves',getbalanceleaves)
route.post('/reportingheadlogin',reportingheadlogin)
route.post('/checkapplicationerequest',checkapplicationerequest)

//--------------history log------------//
route.post('/historylogapplication',historylogapplication)
route.post('/cancelapplication',cancelapplication)

export default route