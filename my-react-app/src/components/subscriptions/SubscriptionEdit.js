import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import customFunctions from '../custom/customFunctions';
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubscriptionEdit = () => {
    const { id } = useParams();
    const token = customFunctions.get_token();
    const [errors, setErrors] = useState({
        server: '',
    });
    const navigate = useNavigate();
    const [data, setData] = useState({
        subscription_months: 0,
        amount_specify: 0
    });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };
    const [submitdisable, setSubmitDisable] = useState('');
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitDisable('disabled');
        try {
            const response = await axios.put(process.env.REACT_APP_SERVER_HOST + 'update_subscription', data, config);
            if (response.status == 200) {
                toast.success("Subscription updated successfully");
                setTimeout(() => {
                    navigate('/subscription/list');
                }, 3000);
            }
        }
        catch (error) {
            setSubmitDisable('');
            setErrors({
                server: error.message
            });
        }

    };
    const get_subscription = async () => {
        const valuestosent = {
            id: id
        };
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_HOST + 'get_subscription', valuestosent, config);
            if (response.status === 200 && response.data.data.success) {
                setData(response.data.data.data[0]);
            }

        }
        catch (error) {
            setErrors({
                server: error.message
            });
        }
    };
    useEffect(() => {
        document.title = 'Update Subscription';
        get_subscription();
    }, []);
    return (
        <div className="container bg-white vh-100 rounded">
            <div className="row">
                <div className="col-md-12">
                    <p className="h4">Subscription Edit</p>
                    <ToastContainer transition={Slide} />
                    <Link to='/subscription/list' className='btn btn-warning float-right'>Back</Link>
                    {errors.server && <span className='alert text-danger'>{errors.server}</span>}
                </div>
                <form onSubmit={handleUpdate}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-floating mb-3 mt-3">
                                <select className='form-control' value={data.subscription_months} disabled>
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
                                <input text="number" min={1} className='form-control' placeholder='Please enter amount in INR' name='amount_specify' value={data.amount_specify} onChange={handleChange} required />
                                <label htmlFor="amount_specify">Amount <small className='text-muted'>(in INR)</small></label>
                                <div className="invalid-feedback">Please fill out this filed.</div>
                            </div>
                        </div>
                    </div>
                    <button className={'btn btn-success ' + submitdisable + ''}>Update</button>
                </form>
            </div>

        </div>
    )
};

export default SubscriptionEdit;