import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
    const token = localStorage.getItem('TOKEN');
    const [error, setError] = useState({
        token: '',
        server: '',
        otp: '',
    });
    const [otpSent, setOtpSent] = useState(true);
    const [otpvalue, setOtpvalue] = useState('');
    const [otpTimer, setOtpTimer] = useState(59);
    const [resendotp, setResendotp] = useState('');
    const [submitdisable, setSubmitdisable] = useState('');
    const [user, setUser] = useState({});
    const sendOtpButtonRef = useRef(null); // Create a ref for the send OTP button
    const closemodel = useRef(null); // Create a ref for the send OTP button
    const inputstyle = {
        height: '40px',
        margin: '5px',
        textAlign: 'center',
        fontSize: '1.2em',
    };
    const config = {
        headers: {
            "Content-type": "multipart/form-data",
            "authorization": `Bearer ${token}`,
        },
    };
    const mailconfig = {
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    };
    const userdata = JSON.parse(localStorage.getItem('USER'));
    const getUserData = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_HOST+'read/' + userdata.id, {
            headers: {
                'authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            setUser(response.data[0]);
        }
    };
    useEffect(() => {
        document.title = 'Update Profile';
        getUserData();
    }, []);

    const navigate = useNavigate();
    const handlechange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        setUser({ ...user, image: e.target.files[0] });
    };

    const updateuserprofile = (e) => {
        const formData = new FormData();
        formData.append('first_name', user.first_name);
        formData.append('last_name', user.last_name);
        formData.append('email', user.email);
        formData.append('gender', user.gender);
        formData.append('image', user.image);
        formData.append('mobile', user.mobile);
        formData.append('aadhar', user.aadhar);
        axios.put(process.env.REACT_APP_SERVER_HOST+'user/updateprofile/' + user.id, formData, config)
            .then((response) => {
                if (response.errno) {
                    setError({
                        server: response.sqlMessage
                    });
                }
                else {
                    setOtpSent(false);
                    closemodel.current.click();
                    navigate('/user/profile');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const data = {
        id: userdata.id,
        name: `${userdata.first_name + " " + userdata.last_name}`,
        to: userdata.email,
    };

    const starttimer = () => {
        let timer;
        var timeconstant = 59;
        if (timeconstant > 0) {
            timer = setInterval(() => {
                if (timeconstant == 0) {
                    setResendotp('True');
                    clearInterval(timer);
                }
                else {
                    timeconstant = timeconstant - 1;
                    setOtpTimer(timeconstant);
                }
            }, 1000);
        }
    };

    const resentOtp = () => {
        setResendotp('');
        setOtpTimer(59);
        starttimer();
        setError({
            otp: ''
        });
        axios.post(process.env.REACT_APP_SERVER_HOST+'user/sendmail', data, mailconfig)
            .then(res => { })
            .catch((error) => {
                setError({
                    otp: error
                });
            });
    };

    const formatTimer = (time) => {
        return time < 10 ? `0${time}` : time;
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            if (sendOtpButtonRef.current) {
                sendOtpButtonRef.current.click();
                starttimer();
                setSubmitdisable('disabled');
            }
            const response = axios.post(process.env.REACT_APP_SERVER_HOST+'user/sendmail', data, mailconfig);
            if (response.status === 200) {

            }
        }
        catch (err) {
            console.log(err);
        }

    };
    const handleOtp = (e) => {
        setOtpvalue(e.target.value);
    };

    const validateOtp = (e) => {
        e.preventDefault();
        const otpdata = {
            otp: otpvalue,
            id: userdata.id
        };
        axios.post(process.env.REACT_APP_SERVER_HOST+'user/validateOtp', otpdata, mailconfig)
            .then((response) => {
                if (response.data.length > 0) {
                    if (response.data[0].errormessage) {
                        setError({
                            otp: response.data[0].errormessage
                        });
                    }
                    else {
                        updateuserprofile();
                    }
                }
                else {
                    setError({
                        otp: 'Invalid otp'
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="container justify-content-center align-items-center">
            <div className="w-100 bg-white rounded p-3">
                {error.token ? (<span className="text-danger" role="alert">* {error.token}</span>) : ''}
                {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}
                <Link to="/user/profile" className="btn btn-primary float-right me-2">Back</Link>

                <form onSubmit={handleSubmit}>
                    <h2>Update Profile</h2>
                    <div className='row'>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" placeholder='Enter User Name' value={user.username} disabled />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" className="form-control" name="first_name" placeholder='Enter First Name' value={user.first_name} onChange={handlechange} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' value={user.last_name} onChange={handlechange} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" value={user.email} placeholder='Enter Email' onChange={handlechange} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="gender">Gender</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="male" checked={user.gender == 'male' ? 'checked' : ''} onChange={handlechange} />
                                <label className="form-check-label" htmlFor="gender1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="female" checked={user.gender == 'female' ? 'checked' : ''} onChange={handlechange} />
                                <label className="form-check-label" htmlFor="gender2">
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="number" className="form-control" name="mobile" value={user.mobile} placeholder='Enter Mobile' onChange={handlechange} required />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="aadhar">Aadhar Card</label>
                            <input type="number" className="form-control" name="aadhar" value={user.aadhar} placeholder='Enter Aadhar' onChange={handlechange} required />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="image">Photo</label>
                            <input type="file" accept='.jpg,.jpeg,.png' className="form-control" name="image" onChange={handleFile} />
                        </div>
                    </div>
                    <button className={'btn btn-success ' + submitdisable}>Submit</button>
                </form>
                {/* Modal */}
                <button type="button" ref={sendOtpButtonRef} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Send Otp</button>

                {otpSent && (<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">OTP</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={validateOtp}>
                                <div className="modal-body">
                                    <p className='text-success'>OTP has been sent successfully to {userdata.email}!</p>
                                    <div className="form-group">
                                        <label htmlFor="otp" className="col-form-label">Enter OTP</label>
                                        {resendotp ? (<span className='btn btn-primary float-right pt-2' onClick={resentOtp}>Resend</span>) : (<span className='text-danger float-right pt-2'>00:{formatTimer(otpTimer)}</span>)}

                                        <div >
                                            <input type="number" style={inputstyle} className="form-control" name="otp" onChange={handleOtp} required />
                                            {error.otp && (<span className='text-danger'>{error.otp}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" ref={closemodel} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>)}

            </div>
        </div>
    )
};

export default UpdateProfile;