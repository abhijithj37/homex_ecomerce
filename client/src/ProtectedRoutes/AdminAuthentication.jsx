
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminAuthentication = () => {
    const admin=localStorage.getItem('AdminToken');
    // let admin = false;
    console.log("token auth..", admin)

    return admin ? <Outlet /> : <Navigate to='/admin-login' />

}

export default AdminAuthentication


