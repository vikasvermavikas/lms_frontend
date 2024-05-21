import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const BookAssignDetail = () => {
    const { id } = useParams();
    const token = localStorage.getItem('TOKEN');
    const [data, setData] = useState([]);
    const [error, setError] = useState({
        server: ''
    });
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };
    const getfullDetail = () => {
        axios.get('http://localhost:8082/books/assignment_detail/' + id, config)
            .then(res => {
                setData(res.data[0]);
                setError({
                    server: ''
                });
            })
            .catch(err => {
                setError({
                    server: err.response.data
                });
            });
    };

    useEffect(() => {
        getfullDetail();
    }, []);
    return (
        <div className='container-fluid bg-white rounded p-3 row'>
            <div className='col-md-12'>
                <Link to='/book/assignments' className='btn btn-success float-right me-2 w-0' >Back</Link>
            </div>
            {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}

            <span><h3>Book Detials</h3></span>

            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Book Name : </label>
                <p> <b> {data.book_name}</b> </p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Serial Number : </label>
                <p><b>{data.serial_number}</b> </p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Publisher Name : </label>
                <p><b> {data.publisher_name}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> From Date : </label>
                <p><b> {new Date(data.from_date).toLocaleDateString()}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> To Date : </label>
                <p><b> {new Date(data.to_date).toLocaleDateString()}</b></p>
            </div>

            <span><h3>User Detials</h3></span>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Name : </label>
                <p><b> {data.name}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Email Id : </label>
                <p><b> {data.email}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Mobile No. : </label>
                <p><b> {data.mobile}</b></p>
            </div>
        </div>
    );
};

export default BookAssignDetail;