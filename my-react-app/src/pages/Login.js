import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Validation from '../customfiles/LoginValidation.js';
import { ReactSession } from 'react-client-session';


const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        server: "",
    });

    useEffect(() => {
        document.title = "Login";
    }, []);

    const navigate = useNavigate();

    const handleInput = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        if (errors.email === '' && errors.password === '') {
            axios.post(process.env.REACT_APP_SERVER_HOST+"login", values)
                .then(res => {
                    if (res.data.status == true) {
                        ReactSession.setStoreType("sessionStorage");
                        ReactSession.set("USER", res.data.data);
                        localStorage.setItem("USER", JSON.stringify(res.data.data));
                        localStorage.setItem("TOKEN", res.data.token);
                        if (res.data.data.roleid === 2) {
                            navigate('/guest/dashboard');
                        }
                        else{
                            navigate('/user/dashboard');
                        }
                    }
                    else{
                        setErrors({
                            server: res.data.message,
                        });
                    }
                   
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Login</h1>
                    {errors.server && <span className="text-danger">{errors.server}</span>}
                    <div className="form-group">

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleInput} />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handleInput} />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                        <p className="text-center mt-3">Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;