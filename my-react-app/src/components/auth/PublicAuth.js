import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const PublicAuth = ({children}) => {
    const token = localStorage.getItem('TOKEN');

    // Add your token validation logic here
    const isTokenExpired = () => {
        if (!token) return true;
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= exp * 1000;
    };

    // If token is expire or not found.
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

export default PublicAuth;