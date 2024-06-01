import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookAssign = () => {
    const { id } = useParams();
    const token = localStorage.getItem('TOKEN');
    const userid = localStorage.getItem('USER');
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
        axios.get('http://localhost:8082/books/edit/' + id, config)
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
        axios.get("http://localhost:8082/users", config)
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
        axios.post('http://localhost:8082/books/assign', values, config)
            .then(res => {
                if (res.data.sqlMessage) {
                    setError({
                        server: res.data.sqlMessage
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
        <div className="container d-flex justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
                {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}
                {error.list ? (<span className="text-danger" role="alert">* {error.list}</span>) : ''}
                <Link to="/book/books" className="btn btn-primary me-2 float-right">Back</Link>
                <ToastContainer transition={Slide} />

                <form onSubmit={handleSubmit}>
                    <h2>Assign Book</h2>
                    <div className='row'>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="book_name">Book Name</label>
                            <input type="text" className="form-control" name="book_name" value={bookname} disabled />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="publisher_name">Select User</label>
                            <select className="form-control" name="userid" onChange={handleInput} required>
                                <option>Select User</option>
                                {userdata.map(user => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="class">Class</label>
                            <input type="text" className="form-control" name="class" onChange={handleInput} required />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="class">From Date</label>
                            <input type="date" className="form-control" name="from_date" onChange={handleInput} required />
                        </div>
                        <div className="mb-2 col-md-6">
                            <label htmlFor="class">To Date</label>
                            <input type="date" className="form-control" name="to_date" onChange={handleInput} required />
                        </div>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>

            </div>
        </div>
    );
};

export default BookAssign;