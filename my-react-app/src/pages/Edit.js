import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Updateuser from '../components/validations/Updateuser';
import QRCode from "react-qr-code";

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
        axios.get(process.env.REACT_APP_SERVER_HOST + 'read/' + id, config)
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
            axios.put(process.env.REACT_APP_SERVER_HOST + 'update/' + id, user, config)
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
                        {/* Show card */}
                        <div className="col-md-6">
                            <div className="container card" style={{ "backgroundColor": "cornflowerblue", "color": "white" }}>
                                <div className="card-body" >
                                    <div className="row">
                                        <div className="col-sm-3 border rounded-circle image-circle text-center">
                                            <span className=""> LMS </span>
                                        </div>
                                        <div className="col-sm-9">
                                            <h4>Membership Card</h4>
                                        </div>
                                        <hr className="mt-2"></hr>
                                        <div className="d-flex">
                                            <div className="col-sm-8 d-flex h-100">
                                                {/* <img src={process.env.REACT_APP_SERVER_HOST + `${user.image}`} alt="no-image-found" className="img-fluid h-100 rounded border" style={{ 'width': '40%' }} /> */}

                                                {user.image ?  
                                                <img src={process.env.REACT_APP_SERVER_HOST+`${user.image}`} alt="no-image-found" className="img-fluid h-100 rounded border" style={{ 'width': '40%' }} /> :
                                                 <img src={user.gender == 'female' ? process.env.PUBLIC_URL+`/assets/img/default-image-female.png` : process.env.PUBLIC_URL+`/assets/img/default-image-male.png`} alt="no-image-found" className="img-fluid rounded border" style={{ 'width': '40%' }} />}
                                                 
                                                <div className="ml-2">
                                                    <h6 className="text-capitalize">{user.first_name + " " + user.last_name}</h6>
                                                    <span className="small">Library Id: <span className='small'>{user.library_id}</span></span><br></br>
                                                    <span className="small">Contact: <span className='small'>{ user.mobile}</span></span><br></br>
                                                    <span className="small">Issue Date: <span className='small'>{new Date(user.timecreated * 1000).toLocaleDateString()}</span></span>
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <p className="ml-5">
                                                    <QRCode
                                                        className="img-responsive"
                                                        size={100}
                                                        value={"/user/details/" + user.library_id}
                                                        viewBox={`-10 -10 68 68`}
                                                    />
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                    <hr></hr>
                                    <div className="col-md-12">
                                        <span className="small">Address: C-11, Block-C, LGF, Malviya Nagar, Delhi - 110017</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <div className='col-md-12'>
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control"  placeholder='Enter User Name' value={user.username} disabled />
                                    <label htmlFor="username">Username</label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" maxLength={8} name="first_name" placeholder='Enter First Name' value={user.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} required />
                                    <label htmlFor="first_name">First Name</label>
                                    {error.first_name && <span className='text-danger'>{error.first_name}</span>}

                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' value={user.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} required />
                                    <label htmlFor="last_name">Last Name</label>
                                    {error.last_name && <span className='text-danger'>{error.last_name}</span>}

                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" name="email" value={user.email} placeholder='Enter Email' onChange={e => setUser({ ...user, email: e.target.value })} required />
                                    <label htmlFor="email">Email</label>
                                    {error.email && <span className='text-danger'>{error.email}</span>}

                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                        </div>
                            <div className="col-md-6 mt-2">
                                <div className="form-floating mb-2">
                                    <input type="text" maxLength="10" className="form-control" value={user.mobile} name="mobile" pattern="[7-9]{1}[0-9]{9}" placeholder='Enter Mobile No.' onChange={e => setUser({ ...user, mobile: e.target.value })} required />
                                    <label htmlFor="email">Mobile</label>
                                    {error.mobile && <span className='text-danger'>{error.mobile}</span>}

                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>

                        <div className="col-md-6 mt-2">
                            <div className="form-floating mb-2">
                                <input type="text" maxLength="12" className="form-control" value={user.aadhar} name="aadhar" pattern="[4-9]{1}[0-9]{11}" placeholder='Enter Aadhar Card No.' onChange={e => setUser({ ...user, aadhar: e.target.value })} required />
                                <label htmlFor="email">Aadhar Card No.</label>
                                {error.aadhar && <span className='text-danger'>{error.aadhar}</span>}

                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="mb-2 col-md-6 d-flex mt-2">
                            <label htmlFor="gender">Gender</label>
                            <div className="form-check ml-2">
                                <input className="form-check-input" type="radio" name="gender" value="male" checked={user.gender == 'male' ? 'checked' : ''} onChange={e => setUser({ ...user, gender: e.target.value })} />
                                <label className="form-check-label" htmlFor="gender1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check ml-2">
                                <input className="form-check-input" type="radio" name="gender" value="female" checked={user.gender == 'female' ? 'checked' : ''} onChange={e => setUser({ ...user, gender: e.target.value })} />
                                <label className="form-check-label" htmlFor="gender2">
                                    Female
                                </label>
                            </div>
                            <div className="form-check ml-2">
                                <input className="form-check-input" type="radio" name="gender" value="other" checked={user.gender == 'other' ? 'checked' : ''} onChange={e => setUser({ ...user, gender: e.target.value })} />
                                <label className="form-check-label" htmlFor="gender3">
                                    other
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" value={user.subscription_days / 30 + ' months'} disabled />
                                <label htmlFor="email">Subscription</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" value={user.subscription_amount} disabled />
                                <label htmlFor="email">Subscription Amount <small className='text-muted'>(in Rs.)</small></label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control text-uppercase" value={user.payment_mode} disabled />
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