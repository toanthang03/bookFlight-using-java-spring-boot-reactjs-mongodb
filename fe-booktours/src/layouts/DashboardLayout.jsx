import React from 'react'
import Siderbar from '../components/admin/Siderbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <Siderbar>
      <Outlet />
    </Siderbar>
  )
}

export default DashboardLayout