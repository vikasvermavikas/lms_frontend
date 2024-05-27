import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Create = () => {
    const token = localStorage.getItem("TOKEN");
    const [error, setError] = useState({
        server: ''
    });
    const [values, setValues] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        mobile: 0,
        aadhar: 0,
    });

    useEffect(() => {
        document.title = "Create User";
    }, []);
    const navigate = useNavigate();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/users', values, config)
            .then(res => {
                if (res.data.errno) {
                    setError({
                        server: res.data.sqlMessage
                    });
                }
                else {
                    navigate('/user/users');
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="container d-flex vh-90 justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
                {error.server ? (<span className='text-danger'>* {error.server}</span>) : ''}
                <form onSubmit={handleSubmit}>
                    <span><Link to="/user/users" className="btn btn-primary me-2 float-right">Back</Link></span>
                    <h2 className='flot-left'> Add User</h2>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" placeholder='Enter User Name' onChange={e => setValues({ ...values, username: e.target.value })} required/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text" className="form-control" name="first_name" placeholder='Enter First Name' onChange={e => setValues({ ...values, first_name: e.target.value })} required />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' onChange={e => setValues({ ...values, last_name: e.target.value })} required />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" placeholder='Enter Email' onChange={e => setValues({ ...values, email: e.target.value })} required />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label htmlFor="mobile">Mobile No.</label>
                                <input type="text" maxLength="10" className="form-control" name="mobile" pattern="[7-9]{1}[0-9]{9}" placeholder='Enter Mobile No.' onChange={e => setValues({ ...values, mobile: e.target.value })} required />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label htmlFor="aadhar">Aadhar Card No.</label>
                                <input type="text" maxLength="12" className="form-control" name="aadhar" pattern="[4-9]{1}[0-9]{11}" placeholder='Enter Aadhar Card No.' onChange={e => setValues({ ...values, aadhar: e.target.value })} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2">
                                <label htmlFor="gender">Gender &nbsp;</label>
                                <input  type="radio" name="gender" value="male" onChange={e => setValues({ ...values, gender: e.target.value })} /> &nbsp;Male &nbsp;
                                <input  type="radio" name="gender" value="female" onChange={e => setValues({ ...values, gender: e.target.value })} />  &nbsp; Female
                                    
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>

            </div>
        </div>
    );
};

export default Create;