import NoPermission from '../NoPermission';
import { Navigate} from 'react-router-dom';
const GuestAuth = ({ children }) => {
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

    // If user is not admin, redirect to not access page.
    const getuser = JSON.parse(localStorage.getItem('USER'));
    if (getuser.roleid == 1) {
        return <NoPermission />;
    }
    // Render child components if the token is valid
    //   return <Outlet />;
    return children;

};

export default GuestAuth;