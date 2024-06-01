// RequireAuth.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";


const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('TOKEN');

  // Add your token validation logic here
  const isTokenExpired = () => {
    if (!token) return true;
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    // console.log(exp);
    // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now()));
    // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(exp * 1000));

    return Date.now() >= exp * 1000; 
  };

  if (!token || isTokenExpired()) {
    sessionStorage.clear();
    localStorage.clear();
    // // Redirect to login page if the token is missing or expired
    return <Navigate to="/login" replace />;
  }

  // Render child components if the token is valid
//   return <Outlet />;
return children;

};

export default RequireAuth;
