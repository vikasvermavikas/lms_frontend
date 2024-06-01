import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from'react-router-dom';
const AssignmentView = () => {
    const bookid = useParams();
    const token = localStorage.getItem("TOKEN");
    const userid = JSON.parse(localStorage.getItem("USER")).id;
    const [values, setValues] = useState({
        book_name: '',
        serial_number: '',
        publisher_name: '',
        publish_year: '',
        class: '',
        from_date: '',
        to_date: '',
        return: ''
    });
    const config = {
        headers : {
            'content-type': 'application/json',
            'authorization' : `Bearer ${token}`
        }
    };
    const getdata = async (bookid) => {
        const requestdata = {
            bookid : bookid,
            userid : userid
        };
        const response = await axios.post('http://localhost:8082/guest/book/view', requestdata, config);
        if (response.status === 200) {
            setValues(response.data[0]);
        }
    };
    useEffect(() => {
        getdata(bookid);
    }, []);
    return (
        <div className='container-fluid bg-white rounded p-3 row '>
        <div className='col-md-12'>
        <Link to='/guest/assignments' className='btn btn-success float-right me-2 w-0' >Back</Link>
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
            <label> Publisher Year : </label>
            <p><b> {values.publish_year}</b></p>
        </div>
        <div className='col-md-4 d-flex mb-2'>
            <label> Class : </label>
            <p><b> {values.class}</b></p>
        </div>
        <div className='col-md-4 d-flex mb-2'>
            <label> From Date : </label>
            <p><b> {new Date(values.from_date).toLocaleDateString(undefined, '')}</b></p>
        </div>
        <div className='col-md-4 d-flex mb-2'>
            <label> To Date : </label>
            <p><b> {new Date(values.to_date).toLocaleDateString(undefined, '')}</b></p>
        </div>
        <div className='col-md-4 d-flex mb-2'>
            <label> Status : </label>
            <p><b> {values.return ? (<span className='text-success'>Returned</span>) : (<span className='text-warning'>Return Pending</span>)}</b></p>
        </div>
    </div>
    );
};

export default AssignmentView;