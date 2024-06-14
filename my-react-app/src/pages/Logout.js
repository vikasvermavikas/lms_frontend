import { useEffect, useState } from 'react';
// import { ReactSession } from 'react-client-session';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {dashboardUrl} from '../config/Constants';

const Logout = () => {

    const navigate = useNavigate();
    const [error, setError] = useState({
        message: ""
    });
    const [values, setValues] = useState({
        userid: JSON.parse(localStorage.getItem("USER")).id,
    });
    useEffect(() => {
        document.title = "Logout";
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_HOST+"logout", values)
            .then(res => {

                if (res.data.status) {
                    sessionStorage.clear();
                    localStorage.clear();
                    navigate('/login');
                }
                else {
                    setError({
                        message: res.data.message
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='container-fluid h-75 d-flex justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <form action="" onSubmit={handleSubmit}>
                    <h3 className="text-center">Are you sure you want to logout ?</h3>
                    <div className="row text-center">
                       
                            <div className="d-flex justify-content-center text-center w-25 mx-auto">
                                <button type="submit" className="btn btn-primary">Logout</button>
                                <Link to={dashboardUrl()} className="btn btn-warning  ms-1">Cancel</Link>
                            </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Logout;