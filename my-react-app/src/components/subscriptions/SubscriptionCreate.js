import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const SubscriptionCreate = () => {
    const [values, setValues] = useState({});
    const token = localStorage.getItem('TOKEN');
    const [submitdisable, setSubmitdisable] = useState('');
    const [errors, setErrors] = useState({
        server: ''
    });
    const navigate = useNavigate();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitdisable('disabled');
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_HOST + 'addSubscription', values, config);
            if (response.status == 200) {
                toast.success("Subscription added successfully");
                setTimeout(() => {
                    navigate('/subscription/list');
                }, 3000);
            }
        } catch (error) {
            setSubmitdisable('');
            if (error.response.data.message) {
                setErrors({
                    server: error.response.data.message
                });
            }
            else {
                setErrors({
                    server: error.message
                });
            }
        }
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        document.title = 'Add Subscription';
    }, []);


    return (
        <div className="container bg-white rounded vh-100">
            <div className="row">
                <div className="col-md-12">
                    <p className="h4">Add Subscription</p>
                    <ToastContainer transition={Slide} />
                    <Link to='/subscription/list' className='btn btn-primary float-right'>Back</Link>
                    {errors.server && <span className='alert text-danger'>{errors.server}</span>}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <select className='form-control' name='subscription_months' onChange={handleChange}>
                                    <option value={0}>Select Package</option>
                                    <option value={3}>3 Months</option>
                                    <option value={6}>6 Months</option>
                                    <option value={9}>9 Months</option>
                                    <option value={12}>1 year</option>
                                </select>
                                <label htmlFor="subscription_months">Packages</label>
                                <div className="invalid-feedback">Please select package.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <input text="number" className='form-control' placeholder='Please enter amount in INR' name='amount_specify' onChange={handleChange} required />
                                <label htmlFor="amount_specify">Amount <small className='text-muted'>(in INR)</small></label>
                                <div className="invalid-feedback">Please fill out this filed.</div>
                            </div>
                        </div>
                    </div>
                    <button className={'btn btn-success ' + submitdisable + ''}>Save</button>
                </form>
            </div>
        </div>
    )
};
export default SubscriptionCreate;