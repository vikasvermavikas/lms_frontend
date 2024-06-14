import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Updateuser from '../components/validations/Updateuser';

const Edit = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: 'female',
        mobile: '',
        aadhar: '',
        subscription_days: '',
        subscription_amount: '',
        payment_mode: '',
    });
    const [error, setError] = useState({
        token: '',
        email: '',
        first_name: '',
        last_name: '',
        gender: '',
        mobile: '',
        aadhar: '',
    });
    const [submitdisable, setSubmitdisable] = useState('');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        }
    }
    useEffect(() => {
        document.title = "Edit User";
        axios.get(process.env.REACT_APP_SERVER_HOST+'read/' + id, config)
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

        setError(Updateuser(user));

        if (error.email === '' && error.gender === '' && error.aadhar === '' && error.first_name === '' && error.last_name === '' && error.mobile === '') {

            setSubmitdisable('disabled');
            axios.put(process.env.REACT_APP_SERVER_HOST+'update/' + id, user, config)
                .then(res => {
                    toast.success("User updated successfully");
                    setTimeout(() => {
                        navigate('/user/users');
                    }, 3000);
                })
                .catch(err => console.log(err));
        }

        // }
    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
                {error.token ? (<span className="text-danger" role="alert">* {error.token}</span>) : ''}
                <Link to="/user/users" className="btn btn-primary me-2 float-right">Back</Link>
                <ToastContainer transition={Slide} />

                <form onSubmit={handleSubmit} className='was-validated'>
                    <h2>Update Reader</h2>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" placeholder='Enter First Name' value={user.username} disabled />
                                <label htmlFor="username">Username</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" name="first_name" placeholder='Enter First Name' value={user.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} required />
                                <label htmlFor="first_name">First Name</label>
                                {error.first_name && <span className='text-danger'>{error.first_name}</span>}
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' value={user.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} required />
                                <label htmlFor="last_name">Last Name</label>
                                {error.last_name && <span className='text-danger'>{error.last_name}</span>}
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" name="email" value={user.email} placeholder='Enter Email' onChange={e => setUser({ ...user, email: e.target.value })} required />
                                <label htmlFor="email">Email</label>
                                {error.email && <span className='text-danger'>{error.email}</span>}
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" maxLength="10" className="form-control" value={user.mobile} name="mobile" pattern="[7-9]{1}[0-9]{9}" placeholder='Enter Mobile No.' onChange={e => setUser({ ...user, mobile: e.target.value })} required />
                                <label htmlFor="email">Mobile</label>
                                {error.mobile && <span className='text-danger'>{error.mobile}</span>}
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" maxLength="12" className="form-control" value={user.aadhar} name="aadhar" pattern="[4-9]{1}[0-9]{11}" placeholder='Enter Aadhar Card No.' onChange={e => setUser({ ...user, aadhar: e.target.value })} required />
                                <label htmlFor="email">Aadhar Card No.</label>
                                {error.aadhar && <span className='text-danger'>{error.aadhar}</span>}
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
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
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="other" checked={user.gender == 'other' ? 'checked' : ''} onChange={e => setUser({ ...user, gender: e.target.value })} />
                                <label className="form-check-label" htmlFor="gender3">
                                    other
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" value={user.subscription_days} disabled/>
                                <label htmlFor="email">Subscription <small className='text-muted'>(in days)</small></label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" value={user.subscription_amount} disabled/>
                                <label htmlFor="email">Subscription Amount <small className='text-muted'>(in Rs.)</small></label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control text-uppercase" value={user.payment_mode} disabled/>
                                <label htmlFor="email">Payment Mode</label>
                            </div>
                        </div>
                    </div>
                    <button className={'btn btn-success ' + submitdisable}>Submit</button>

                </form>

            </div>
        </div>
    )
}

export default Edit;