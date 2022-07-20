import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({user,redirectPath='/login',children,isAdmin}) {
    const navigate=useNavigate();
    if(!user)
    {
        navigate(redirectPath)
    }
    else if(isAdmin && user.role !== "admin")
    {
      navigate(redirectPath)
    }
  return children
}

export default ProtectedRoute