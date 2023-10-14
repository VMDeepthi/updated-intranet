import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './Components/Comman/Login/Login'
import Dashboard from './Components/Comman/DashBoard/DashBoard'

import AddCompany from './Components/Admin/CompanyManagment/AddCompany'
import ViewCompany from './Components/Admin/CompanyManagment/ViewCompany'
import AddCompanyPages from './Components/Admin/CompanyPagesManagement/AddCompanyPages'
import ViewCompanyPages from './Components/Admin/CompanyPagesManagement/ViewCompanyPages'
import AddUser from './Components/Admin/UserManagement/AddUser'
import ViewUser from './Components/Admin/UserManagement/ViewUser'


export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/" element={<Dashboard/>} />
      <Route path='/addcompany' element={<AddCompany />} />
      <Route path='/viewcompany' element={<ViewCompany />} />
      <Route path='/addcompanypages' element={<AddCompanyPages />} />
      <Route path='/viewcompanypages' element={<ViewCompanyPages />} />
      <Route path='/adduser' element={<AddUser />} />
      <Route path='/viewusers' element={<ViewUser />} />
      

    </Routes>
    </BrowserRouter>
    </>
  )
}
