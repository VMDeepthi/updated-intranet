import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import UserContext from '../../context/UserContext'
import { useContext, } from 'react'
import { UserAccessContext } from '../../context/UserAccessContext'
//import axios from 'axios'


function AdminProtectedRoute(props) {
  const { component } = props
  const { userDetails } = useContext(UserContext)
  const location = useLocation();
  const { pagesToBeNotAccessed } = useContext(UserAccessContext)

  let pages = []

  if(pagesToBeNotAccessed!==null){
    pages = pagesToBeNotAccessed.map(page=>page.toLowerCase()).filter(page=>page!=='')
  }
  
  //console.log(pages)

  const path = location.pathname.replace('/','').replace(/-/g,'').toLowerCase()


  //const pageAccessed = ['dashbord', 'addcompany',]

  // console.log(location.pathname,path)


  // const verify = jwt_decode(token, process.env.REACT_APP_JWT_SECRET)
  //console.log('pageAccess', pages.includes(path),userDetails.employee_id,pagesToBeNotAccessed)






  if (Cookies.get('USERAUTHID') === undefined) {
    return <Navigate to='/login' />
  }
  else if(pagesToBeNotAccessed===null ){
    return <Navigate to={location.pathname} replace />
  }
  else if(pages.includes(path)){
    return <Navigate to='/' />

  }
  else if (!pages.includes(path)&&userDetails.user_type === 'admin' && userDetails.department === 'management') {
    //console.log('com', component)
    return component
  }
  else{
    return <Navigate to='/' />
  }
}

export default AdminProtectedRoute