import React from 'react'
import App from '../App'
import { Outlet } from 'react-router-dom'
import Login from './Login'
import AdminDashboard from './AdminDashboard'


function Layout() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Layout