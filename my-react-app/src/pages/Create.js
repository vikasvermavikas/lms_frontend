import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Create = () => {
    const [values, setValues] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: ''
    });

    useEffect(() => {
        document.title = "Create User";
    }, []);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/users', values)
            .then(res => {
                navigate('/user/users');
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="d-flex vh-90 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" placeholder='Enter User Name' onChange={e => setValues({ ...values, username: e.target.value })} required/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" name="first_name" placeholder='Enter First Name' onChange={e => setValues({ ...values, first_name: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' onChange={e => setValues({ ...values, last_name: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" placeholder='Enter Email' onChange={e => setValues({ ...values, email: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="gender">Gender</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value="male" onChange={e => setValues({ ...values, gender: e.target.value })} />
                            <label className="form-check-label" htmlFor="gender1">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value="female" onChange={e => setValues({ ...values, gender: e.target.value })} />
                            <label className="form-check-label" htmlFor="gender2">
                                Female
                            </label>
                        </div>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/user/users" className="btn btn-primary me-2">Back</Link>
                </form>

            </div>
        </div>
    );
};

export default Create;