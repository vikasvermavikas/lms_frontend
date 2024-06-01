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
        <div className='container  d-flex vh-90 bg-white rounded p-3 justify-content-center align-items-center'>
            <div className='row'>
            <div className='col-md-12'>
                <Link to='/book/assignments' className='btn btn-success float-right me-2 w-0' >Back</Link>
            </div>
            {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}

            <span><h3>Book Details</h3></span>

            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Book Name : </label>
                <p className='ms-1'> <b> {data.book_name}</b> </p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Serial Number : </label>
                <p className='ms-1'><b>{data.serial_number}</b> </p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Publisher Name : </label>
                <p className='ms-1'><b> {data.publisher_name}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> From Date : </label>
                <p className='ms-1'><b> {new Date(data.from_date).toLocaleDateString()}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> To Date : </label>
                <p className='ms-1'><b> {new Date(data.to_date).toLocaleDateString()}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Return Status : </label>
                <p className='ms-1'><b> {data.return ? (<p className='text-success'>Returned ({new Date(data.return_date * 1000).toLocaleDateString()})</p>) : <p className="text-danger">Pending</p>}</b></p>
            </div>

            <span><h3>User Detials</h3></span>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Name : </label>
                <p className='ms-1'><b> {data.name}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Email Id : </label>
                <p className='ms-1'><b> {data.email}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2 mt-2'>
                <label> Mobile No. : </label>
                <p className='ms-1'><b> {data.mobile}</b></p>
            </div>
        </div>
        </div>
    );
};

export default BookAssignDetail;