import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import UserContext from '../../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

function UserProtectedRoute(props) {
  const {component} = props
  const{userDetails} = useContext(UserContext)
  const {authorized, setAuthorized} = useState(false)
  console.log('component',userDetails.access)

  useEffect(()=>{
    const IsAuth=async()=>{
      try{
        const res=await axios.get('/api/checkuser')
        if(res.request.statusText==='OK'){
          setAuthorized(true)
        }
        else{
          setAuthorized(false)
        }
      }
      catch{
       
      }
    }
    IsAuth()
  })
    console.log('component',userDetails.access)
    if(Cookies.get('USERAUTHID') === undefined&&authorized){
        return <Navigate to='/login' />
      }
    else if(userDetails.access==='user'){
      return component
    }
    else{
      return <Navigate to='/' />
    }
}

export default UserProtectedRoute