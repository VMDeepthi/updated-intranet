
import{ createContext, useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import axios from 'axios';


const UserAccessContext = createContext()

function UserAccessProvider(props) {
    const {userDetails} = useContext(UserContext)
    //console.log('userDtails',userDetails)
    const [pagesToBeNotAccessed, setPagesToBeNotAccessed] = useState(null)
  
    useEffect(() => {
        const fetchUserAccess = () =>{
            axios.post('/api/getaccessdata', { emp_id:userDetails.employee_id })
                .then(res => {
                    console.log('data',res.data,userDetails.employee_id )
                    if(res.data.length===0){
                        setPagesToBeNotAccessed([])
                    }
                    else{
                        const data = res.data[0]['restricted_pages'].split(',')
                        setPagesToBeNotAccessed(data)
                    }
                    
                })
                .catch()

        }

        if(userDetails.employee_id!== undefined){
            fetchUserAccess()
        }
  
     
       
  
    }, [userDetails.employee_id])
    //console.log('context called')
  
    
    return (
      <UserAccessContext.Provider value={{pagesToBeNotAccessed}}>
  
        {props.children}
        
      </UserAccessContext.Provider>
  
    )
  }
  
  export { UserAccessContext, UserAccessProvider };

