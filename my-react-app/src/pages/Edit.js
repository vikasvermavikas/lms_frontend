import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [error, setError] = useState({
        token: ''
    });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        }
    }
    useEffect(() => {
        document.title = "Edit User";
        axios.get('http://localhost:8082/read/' + id, config)
            .then(res => setUser(res.data[0]))
            .catch(err => {
                console.log(err);
                setError({
                    token: err.response.data
                });

            })
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8082/update/' + id, user, config)
            .then(res => {
                toast.success("User updated successfully");
                setTimeout(() => {
                    navigate('/user/users');
                }, 3000);
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
                {error.token ? (<span className="text-danger" role="alert">* {error.token}</span>) : ''}
                <Link to="/user/users" className="btn btn-primary me-2 float-right">Back</Link>
                <ToastContainer transition={Slide} />

                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className='row'>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" placeholder='Enter First Name' value={user.username} disabled />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" className="form-control" name="first_name" placeholder='Enter First Name' value={user.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' value={user.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" value={user.email} placeholder='Enter Email' onChange={e => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="email">Mobile</label>
                            <input type="text" maxLength="10" className="form-control" value={user.mobile} name="mobile" pattern="[7-9]{1}[0-9]{9}" placeholder='Enter Mobile No.' onChange={e => setUser({ ...user, mobile: e.target.value })} required />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="email">Aadhar Card No.</label>
                            <input type="text" maxLength="12" className="form-control" value={user.aadhar} name="aadhar" pattern="[4-9]{1}[0-9]{11}" placeholder='Enter Aadhar Card No.' onChange={e => setUser({ ...user, aadhar: e.target.value })} required />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="gender">Gender</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="male" checked={user.gender == 'male' ? 'checked' : ''} onChange={e => setUser({ ...user, gender: e.target.value })} />
                                <label className="form-check-label" htmlFor="gender1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="female" checked={user.gender == 'female' ? 'checked' : ''} onChange={e => setUser({ ...user, gender: e.target.value })} />
                                <label className="form-check-label" htmlFor="gender2">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>

            </div>
        </div>
    )
}

export default Edit;