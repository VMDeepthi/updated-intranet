import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import UserContext from '../../context/UserContext'
import { useContext,  } from 'react'
//import axios from 'axios'

function AdminProtectedRoute(props) {
    const {component} = props
    const{userDetails} = useContext(UserContext)
    

    const pageAccessed = ['dashbord', 'addcompany',]

    if(Cookies.get('USERAUTHID') === undefined){
        return <Navigate to='/login' />
      }
    else if(userDetails.user_type==='admin'&& userDetails.department==='management'){
      console.log('com',component)
      return component
    }
    else{
      return <Navigate to='/' />
    }
}

export default AdminProtectedRoute