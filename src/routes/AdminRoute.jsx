import React from 'react'
import UseRole from '../Hooks/UseRole'
import useAuth from '../Hooks/useAuth'

const AdminRoute = ({children}) => {
    const {role,isLoading}=UseRole()
const {user,loading}=useAuth()

if(isLoading){
    return <Loading></Loading>
}
if(role !== 'admin'){
    return
} return children
}

export default AdminRoute
