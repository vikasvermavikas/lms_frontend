import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookAssign = () => {
    const { id } = useParams();
    const token = localStorage.getItem('TOKEN');
    const userid = localStorage.getItem('USER');
    const [submitdisable, setSubmitdisable] = useState('');

    const [error, setError] = useState({
        server: '',
        list: ''
    });
    const [values, setValues] = useState({
        book_id: id,
        userid: '',
        class: '',
        from_date: '',
        to_date: '',
        assigner_id: JSON.parse(userid).id
    });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };

    const navigate = useNavigate();
    // Get Book Name.
    const [bookname, setBookname] = useState('');
    const getbookdata = () => {
        axios.get(process.env.REACT_APP_SERVER_HOST+'books/edit/' + id, config)
            .then(res => {
                setBookname(res.data[0].book_name);
                setError({
                    server: ''
                });
            })
            .catch(err => {
                setError({
                    server: err.response.data
                });
            })
    };

    // Get User Name.
    const [userdata, setUserdata] = useState([]);
    const getuserdata = () => {
        axios.get(process.env.REACT_APP_SERVER_HOST+"users", config)
            .then(res => {
                setUserdata(res.data);
                setError({
                    list: ''
                });
            })
            .catch(err => {
                setError({
                    list: err.response.data
                })
            })
    }

    useEffect(() => {
        getuserdata();
        getbookdata();
    }, []);
    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Handle form submission.
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitdisable('disabled');
        axios.post(process.env.REACT_APP_SERVER_HOST+'books/assign', values, config)
            .then(res => {
                if (res.data.sqlMessage) {
                    setError({
                        server: res.data.sqlMessage
                    });
                }
                else if (res.data.status == 'failed') {
                    setError({
                        list: res.data.error
                    });
                }
                else {

                    toast.success("Book assigned successfully");
                    setTimeout(() => {
                        navigate('/book/books');
                    }, 3000);

                }
            })
            .catch(err => {
                setError({
                    server: err.response.data
                });
            })
    };
    return (
        <div className="container vh-100">
            <div className="bg-white rounded p-3">
                {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}
                {error.list ? (<span className="text-danger" role="alert">* {error.list}</span>) : ''}
                <Link to="/book/books" className="btn btn-primary me-2 float-right">Back</Link>
                <ToastContainer transition={Slide} />

                <form onSubmit={handleSubmit}>
                    <h2>Assign Book</h2>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className='form-floating mb-3 mt-3'>
                            <input type="text" className="form-control" name="book_name" placeholder='Enter Book Name' value={bookname} disabled />
                            <label htmlFor="book_name">Book Name</label>
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                        <div className='form-floating mb-3 mt-3'>
                            <select className="form-control" name="userid" onChange={handleInput} required>
                                <option>Select User</option>
                                {userdata.map(user => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                    ))}
                            </select>
                                <label htmlFor="publisher_name">Select User</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                            <div className='form-floating mb-3 mt-3'>
                            <input type="text" className="form-control" name="class" onChange={handleInput} placeholder='Enter Class' required />
                            <label htmlFor="class">Class</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                            <div className='form-floating mb-3 mt-3'>
                            <input type="date" className="form-control" name="from_date" placeholder='Select date from calender' onChange={handleInput} required />
                            <label htmlFor="class">From Date</label>
                        </div>
                        </div>
                        <div className="col-md-6">
                            <div className='form-floating mb-3 mt-3'>
                            <input type="date" className="form-control" name="to_date" placeholder='Select date from calender' onChange={handleInput} required />
                            <label htmlFor="class">To Date</label>
                        </div>
                        </div>
                    </div>
                    <button className={'btn btn-success ' + submitdisable}>Submit</button>

                </form>

            </div>
        </div>
    );
};

export default BookAssign;