import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'



import db from './config/connectiondb.js'
import './utils/autofestivewishes.js'

//importing routes
import authRoute from './routes/auth.js'
import comMangementRoute from './routes/companymanagement.js'
import attendanceRoute from './routes/attendance.js'
import comPagesManagementRoute from './routes/companypagemanagement.js'
import userManagementRoute from './routes/usermanagement.js'
import announcementRoute from './routes/announcement.js'
import officeCalenderRoute from './routes/officecalender.js'
import userDataRoute from './routes/userdata.js'
import reportingStructureRoute from './routes/reportingstructure.js'
import profileSectionRoute from './routes/profilesection.js'
import direcorySearchRoute from './routes/directorysearch.js'
import applyLeaveRoute from './routes/applyleave.js'

db.connect((err)=>{
    if (err){
        console.log(err)
    }
    else {
        console.log('connected')
    }
})

const app = express()

//middleware 
app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(cookieParser())
app.use(express.static('uploads'));
app.use(express.urlencoded({limit:'50mb',extended:true}))

//routes
app.use('/api/',authRoute)
app.use('/api/',comMangementRoute)
app.use('/api',comPagesManagementRoute)
app.use('/api/',userManagementRoute)
app.use('/api/',announcementRoute)
app.use('/api/',attendanceRoute)
app.use('/api/',officeCalenderRoute)
app.use('/api/',userDataRoute)
app.use('/api/',reportingStructureRoute)
app.use('/api/',profileSectionRoute)
app.use('/api/',direcorySearchRoute)
app.use('/api/',applyLeaveRoute)





app.listen(8080,()=>{
    console.log('Hii server is running at: http://localhost:8080/')
})