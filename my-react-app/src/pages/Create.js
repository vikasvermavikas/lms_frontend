import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Validation from '../components/UserValidation';

const Create = () => {
    const token = localStorage.getItem("TOKEN");
    const [validationerror, setValidationerror] = useState('');
    const [subscriptions, setSubscriptions] = useState([]);
    const [subscriptionAmount, setSubscriptionAmount] = useState(0);
    const [staticSubscription, setStaticSubscription] = useState(0);

    const [error, setError] = useState({
        server: '',
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        gender: '',
        mobile: '',
        aadhar: '',
    });
    const [submitdisable, setSubmitdisable] = useState('');
    const [values, setValues] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: 'female',
        mobile: '',
        aadhar: '',
        password: '',
        subscription_days: '',
        subscription_amount: '',
        payment_mode: '',
    });
    const get_subscriptions = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_HOST + 'getSubscriptions', config);
            if (response.status === 200 && response.data.data.success) {
                setSubscriptions(response.data.data.data);
            }
            else {
                setError({
                    server: response.message
                });
            }
        } catch (error) {
            setError({
                server: error.message
            });
        }
    };
    useEffect(() => {
        document.title = "Create User";
        get_subscriptions();
    }, []);
    const navigate = useNavigate();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };


    const get_subscription_amount = async (id) => {
        const valuestosent = {
            id: id
        };
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_HOST + 'get_subscription', valuestosent, config);
            if (response.status === 200 && response.data.data.success) {
                const amount = response.data.data.data[0].amount_specify;
                setSubscriptionAmount(amount);
                setStaticSubscription(amount);
                setValues({
                    ...values, subscription_amount: subscriptionAmount,
                    subscription_days: response.data.data.data[0].subscription_months * 30,
                });
            }

        }
        catch (error) {
            setError({
                server: error.message
            });
        }
    };
    const setPackage = (e) => {
        get_subscription_amount(e.target.value);
    };

    const setDiscount = (e) => {
        const discount = e.target.value;
        if (discount > 0 && discount < 101) {

            setSubscriptionAmount((prevAmount) => {
                const newAmount = staticSubscription - (staticSubscription * (discount / 100));
                setValues({
                    ...values,
                    subscription_amount: newAmount
                });
                return newAmount;
            });

        }
        else {
            setSubscriptionAmount(staticSubscription);
            setValues({
                ...values,
                subscription_amount: staticSubscription
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        const form = e.target;
        form.classList.add('was-validated');
        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {

            // Handle form data submission here
            setError(Validation(values));

            if (error.email != '' || error.password != '' || error.username != '' || error.first_name != '' || error.last_name != '' || error.mobile != '') {
                setValidationerror('Please enter valid inputs.');
            }
            else {

                setSubmitdisable('disabled');
                axios.post(process.env.REACT_APP_SERVER_HOST + 'users', values, config)
                    .then(res => {
                        if (res.data.errno) {
                            setError({
                                server: res.data.sqlMessage
                            });
                        }
                        else {
                            toast.success("Reader created successfully");
                            setTimeout(() => {
                                navigate('/user/users');
                            }, 3000);
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }


    return (
        <div className="container d-flex vh-90 justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
                <ToastContainer transition={Slide} />
                {error.server ? (<span className='text-danger'>* {error.server}</span>) : ''}
                {validationerror ? (<span className='text-danger'>* {validationerror}</span>) : ''}
                <form onSubmit={handleSubmit} className='needs-validation' noValidate>
                    <span><Link to="/user/users" className="btn btn-primary me-2 float-right">Back</Link></span>
                    <h2 className='flot-left'> Add Reader</h2>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <input type="text" className="form-control" placeholder='Enter User Name' onChange={e => setValues({ ...values, username: e.target.value })} required />
                                <label htmlFor="username">Username</label>
                                {error.username && <span className="text-danger">{error.username}</span>}
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <input type="text" className="form-control" name="first_name" placeholder='Enter First Name' onChange={e => setValues({ ...values, first_name: e.target.value })} required />
                                <label htmlFor="first_name">First Name</label>
                                {error.first_name && <span className="text-danger">{error.first_name}</span>}
                                <div className="invalid-feedback">Please fill out this field.</div>

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' onChange={e => setValues({ ...values, last_name: e.target.value })} required />
                                <label htmlFor="last_name">Last Name</label>
                                {error.last_name && <span className="text-danger">{error.last_name}</span>}
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <input type="email" className="form-control" name="email" placeholder='Enter Email' onChange={e => setValues({ ...values, email: e.target.value })} required />
                                <label htmlFor="email">Email</label>
                                {error.email && <span className="text-danger">{error.email}</span>}
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <input type="text" maxLength="10" className="form-control" name="mobile" pattern="[7-9]{1}[0-9]{9}" placeholder='Enter Mobile No.' onChange={e => setValues({ ...values, mobile: e.target.value })} required />
                                <label htmlFor="mobile">Mobile No.</label>
                                {error.mobile && <span className="text-danger">{error.mobile}</span>}
                                <div className="invalid-feedback">Mobile no. is not valid.</div>

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <input type="text" maxLength="12" className="form-control" name="aadhar" pattern="[4-9]{1}[0-9]{11}" placeholder='Enter Aadhar Card No.' onChange={e => setValues({ ...values, aadhar: e.target.value })} required />
                                <label htmlFor="aadhar">Aadhar Card No.</label>
                                {error.aadhar && <span className="text-danger">{error.aadhar}</span>}
                                <div className="invalid-feedback">Aadhar no. is not valid.</div>

                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor="gender">Gender &nbsp;</label>
                            <div className="form-floating mb-2 mt-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" value="male" onChange={e => setValues({ ...values, gender: e.target.value })} />
                                    <label className="form-check-label" htmlFor="gender1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" value="female" checked onChange={e => setValues({ ...values, gender: e.target.value })} />
                                    <label className="form-check-label" htmlFor="gender2">
                                        Female
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" value="other" onChange={e => setValues({ ...values, gender: e.target.value })} />
                                    <label className="form-check-label" htmlFor="gender3">
                                        Other
                                    </label>
                                </div>

                                {error.gender && <span className="text-danger">{error.gender}</span>}
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-floating mb-2 mt-2'>
                                <input type="password" className="form-control" minLength={8} name="password" placeholder="Enter password" onChange={e => setValues({ ...values, password: e.target.value })} required />
                                <label htmlFor="password">Password</label>
                                {error.password && <span className="text-danger">{error.password}</span>}
                                <div className="invalid-feedback">Password is invalid.</div>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                {/* <input type="number"  min="1" placeholder='Enter no. of days' onChange={e => setValues({ ...values, subscription_days: e.target.value })} required /> */}
                                <select className="form-control" name="subscription_days" onChange={setPackage}>
                                    <option>Select Package</option>
                                    {subscriptions.map((subscription, index) => {
                                        return (
                                            <option key={index} value={subscription.id}>{subscription.subscription_months} months</option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="subscription_days">Subscription Packages</label>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" min={1} max={100} name="subscription_discount" placeholder='Enter %' onChange={setDiscount} />
                                <label htmlFor="subscription_discount">Subscription Discount<small className='text-muted'> (in %) (if Any)</small></label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" name="subscription_amount" value={subscriptionAmount} placeholder='Enter amount' required disabled />
                                <label htmlFor="subscription_amount">Subscription Amount <small className='text-muted'>(In Rs.)</small></label>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-2">
                                <select className='form-control' name='payment_mode' onChange={e => setValues({ ...values, payment_mode: e.target.value })} required>
                                    <option value=''>Select payment mode</option>
                                    <option value='upi'>UPI - (Paytm, GooglePay, Phonepe..) </option>
                                    <option value='bank-transfer'>Bank Transfer</option>
                                    <option value='cheque'>Cheque</option>
                                    <option value='cash'>Cash</option>
                                    <option value='not-paid'>Not Paid</option>
                                </select>
                                <label htmlFor="payment_mode">Payment Mode</label>
                                <div className="invalid-feedback">Please select payment mode.</div>
                            </div>
                        </div>
                    </div>

                    {submitdisable ? (<div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>) : (<button className={'btn btn-success ' + submitdisable}>Submit</button>)}

                </form>

            </div>
        </div>
    );
};

export default Create;