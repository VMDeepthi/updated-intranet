import expres from 'express'
import { checkempexperience,AddExperience,viewexperience, updateexperience,deleteexperience,viewallexperiences, getsearchdata } from '../controllers/experience.js'
//import { checkEmployee  } from '../controllers/experience.js'



const route = expres.Router()

route.post('/checkempexperience',checkempexperience)
//route.post('/checkEmployee',checkEmployee)
route.post('/AddExperience', AddExperience)
route.post('/viewexperience', viewexperience)
route.post('/viewallexperiences', viewallexperiences)
route.post('/getsearchdata',getsearchdata)
route.put('/updateexperience/:id', updateexperience)
route.post('/deleteexperience', deleteexperience)



export default route