import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ReadBook = () => {
    const { id } = useParams();
    const token = localStorage.getItem("TOKEN");
    const user = localStorage.getItem("USER");

    const [values, setValues] = useState({
        book_name: '',
        publisher_name: '',
        class: '',
        quantity: '',
        price_per_book: '',
        publish_year: '',
        buying_date: '',
        userid: JSON.parse(user).id,
    });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };

    const [error, setError] = useState({
        server: ''
    });

    const getbookdata = () => {
        axios.get('http://localhost:8082/books/edit/' + id, config)
            .then(res => {
                setValues(res.data[0]);
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
    useEffect(() => {
        document.title = "Read Book";
        try {
            getbookdata();
        }
        catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <div className='container-fluid bg-white rounded p-3 row '>
            <div className='col-md-12'>
            <Link to='/book/books' className='btn btn-success float-right me-2 w-0' >Back</Link>
            </div>
            <div className='col-md-4 d-flex mb-2'>
                <label> Book Name : </label>
                <p><b> {values.book_name}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2'>
                <label> Serial Number : </label>
                <p><b>{values.serial_number}</b> </p>
            </div>
            <div className='col-md-4 d-flex mb-2'>
                <label> Publisher Name : </label>
                <p><b> {values.publisher_name}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2'>
                <label> Class : </label>
                <p><b> {values.class}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2'>
                <label> Quantity : </label>
                <p><b> {values.quantity}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2'>
                <label> Price Per Book : </label>
                <p><b> {values.price_per_book}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2'>
                <label> Publish Year : </label>
                <p><b> {values.publish_year}</b></p>
            </div>
            <div className='col-md-4 d-flex mb-2'>
                <label> Buying Date : </label>
                <p><b> {values.buying_date}</b></p>
            </div>
        </div>
    )
};

export default ReadBook;