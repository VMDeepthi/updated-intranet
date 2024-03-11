import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'




import db from './config/connectiondb.js'

//-----automation---------
import './utils/autofestivewishes.js'
import './utils/autoBirthdayWishes.js'
import './utils/autoAnnouncemnetReminder.js'

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
import balanaceLeavesRoute from './routes/balanceleaves.js'
import userIntroTourRoute from './routes/userintrotour.js'
import manageOfficeGalleryRoute from './routes/manageofficegallery.js'
import payslipRoute from './routes/payslip.js'
import experienceRoute from './routes/experience.js'
import userExperienceRoute from './routes/userexperince.js'

//import authMiddleware from './middleware/authUsers.js'
import { checkAuthentication } from './middleware/authUsers.js'

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
app.use(express.static('public'));
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(checkAuthentication)

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
app.use('/api/',balanaceLeavesRoute)
app.use('/api/',userIntroTourRoute)
app.use('/api/',manageOfficeGalleryRoute)
app.use('/api/',payslipRoute)
app.use('/api/',experienceRoute)
app.use('/api/',userExperienceRoute)



//---------deepthi-----------------------
app.post('/api/addexperience', (req, res) => {
    const { formdata, designationTitle } = req.body;
    console.log('deepthi')
  
    // Insert data into MySQL table
    const sql = `INSERT INTO designation (designationtitle, description, date) VALUES (?, ?, ?)`;
    db.query(sql, [designationTitle, formdata.description, formdata.date], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
  
      return res.json({ data: 'Experience added successfully' });
    });
  });


app.listen(8080,()=>{
    console.log('Hii server is running at: http://localhost:8080/')
})