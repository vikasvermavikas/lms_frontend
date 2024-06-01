import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateBook = () => {
    const token = localStorage.getItem("TOKEN");
    const userid = localStorage.getItem("USER");
    
    const navigate = useNavigate();
    const [error, setError] = useState({
        server: ''
    });
    const [values, setValues] = useState({
        book_name: '',
        publisher_name: '',
        class: '',
        quantity: '',
        price_per_book: '',
        publish_year: '',
        buying_date: '',
        userid: JSON.parse(userid).id,
    });
    
    const config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/books/create', values, config)
        .then(res => {
            if (res.data.errno) {
                setError({
                    server: res.data.sqlMessage
                });
            }
            else {
                toast.success("Book created successfully");
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
    const handleInput = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex vh-90 justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
            <ToastContainer transition={Slide} />
                {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}
                <Link to="/book/books" className="btn btn-primary me-2 float-right">Back</Link>
                <form onSubmit={handleSubmit}>
                    <h2>Add Book</h2>
                    <div className='row'>
                     <div className='col-md-6'>
                    <div className="mb-2">
                        <label htmlFor="book_name">Books Name</label>
                        <input type="text" className="form-control" name="book_name" placeholder='Enter Book Name' onChange={handleInput} required />
                    </div>
                    </div>
                     <div className='col-md-6'>
                    <div className="mb-2">
                        <label htmlFor="publisher_name">Publisher Name</label>
                        <input type="text" className="form-control" name="publisher_name" placeholder='Enter Publisher Name' onChange={handleInput} required />
                    </div>
                    </div>
                     <div className='col-md-6'>
                    <div className="mb-2">
                        <label htmlFor="class">Class</label>
                        <input type="text" className="form-control" name="class" placeholder='Enter Class' onChange={handleInput} required />
                    </div>
                    </div>
                     <div className='col-md-6'>
                    <div className="mb-2">
                        <label htmlFor="quantity">Quantity</label>
                        <input className="form-control" type="number" name="quantity" onChange={handleInput} />
                    </div>
                    </div>
                     <div className='col-md-6'>
                    <div className="mb-2">
                        <label htmlFor="price_per_book">Price Per Book</label>
                        <input type="number" className="form-control" name="price_per_book" placeholder='Enter Price Per Book' onChange={handleInput} required />
                    </div>
                    </div>
                     <div className='col-md-6'>
                    <div className="mb-2">
                        <label htmlFor="publish_year">Publish Year</label>
                        <input type="number" className="form-control" name="publish_year" placeholder='Enter Publish Year' onChange={handleInput} required />
                    </div>
                    </div>
                     <div className='col-md-6'>
                    <div className="mb-2">
                        <label htmlFor="buying_date">Buying Date</label>
                        <input type="date" className="form-control" name="buying_date" onChange={handleInput} required />
                    </div>
                    </div>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>

            </div>
        </div>
    )
}

export default CreateBook;