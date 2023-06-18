import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/authContext';
import { Navigate } from 'react-router-dom';
const RequireAuth = ({ children }) => {
    const  auth  = useContext(UserContext);
    console.log(auth);
    const user=auth.user;
    if(user)
        return children ;
    else 
        return <Navigate to="/auth/login" replace />;
  }
export default RequireAuth;