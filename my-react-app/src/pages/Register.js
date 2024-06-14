import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Validation from '../customfiles/SignupValidation';

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        gender: 'male',
        image: ''
    });

    useEffect(() => {
        document.title = "Registeration";
    }, []);
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleFile = (e) => {
        setValues({...values, image: e.target.files[0] });
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        if (errors.username === '' && errors.password === '' && errors.first_name === '' && errors.last_name === '' && errors.email === '') {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('password',values.password);
            formData.append('gender', values.gender);
            formData.append('image', values.image);
           axios.post(process.env.REACT_APP_SERVER_HOST+'signup', formData)
           .then((response) => {
            navigate('/login');
           })
           .catch((error) => {
                console.log(error);
            });
        }

    }

    return (
        <div className="d-flex bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3 mt-5 mb-5">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Register</h1>
                    <div className="form-group">
                        <div className='mt-3'>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name='username' placeholder="Enter Username" onChange={handleChange} />
                            {errors.username && <span className="text-danger">{errors.username}</span>}
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" className="form-control" name='first_name' placeholder="Enter First Name" onChange={handleChange} />
                            {errors.first_name && <span className="text-danger">{errors.first_name}</span>}

                        </div>

                        <div className='mt-3'>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className="form-control" name='last_name' placeholder="Enter Last Name" onChange={handleChange} />
                            {errors.last_name && <span className="text-danger">{errors.last_name}</span>}

                        </div>

                        <div className='mt-3'>
                            <label >Gender</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="male" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="gender1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="female" checked onChange={handleChange} />
                                <label className="form-check-label" htmlFor="gender2">
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control" name="image" accept=".png,.jpg,.jpeg" onChange={handleFile} />
                            {errors.image && <span className="text-danger">{errors.image}</span>}

                        </div>
                        <div className='mt-3'>
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={handleChange} />
                            {errors.email && <span className="text-danger">{errors.email}</span>}

                        </div>
                        <div className='mt-3'>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={handleChange} />
                            {errors.password && <span className="text-danger">{errors.password}</span>}

                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>
                        <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;