import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReactLanguageSelect from 'react-languages-select';
import Languages from '../components/Languages';
//import css module
// import 'react-languages-select/css/react-languages-select.css';

const CreateBook = () => {
    const token = localStorage.getItem("TOKEN");
    const userid = localStorage.getItem("USER");
    const [submitdisable, setSubmitdisable] = useState('');

    const navigate = useNavigate();
    const [error, setError] = useState({
        server: ''
    });
    const [selectedLanguage, setSelectedLanguage] = useState('EN');
    const [values, setValues] = useState({
        book_name: '',
        publisher_name: '',
        class: '',
        quantity: '',
        price_per_book: '',
        publish_year: '',
        buying_date: '',
        lang: '',
        userid: JSON.parse(userid).id,
    });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };

    const [languages, setLanguages] = useState(Languages);
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        if (!form.checkValidity()) {
            e.stopPropagation();
        }
        else {
            setSubmitdisable('disabled');
            axios.post(process.env.REACT_APP_SERVER_HOST + 'books/create', values, config)
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
        }


    };
    const handleInput = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleChange = (e) => {
        setSelectedLanguage(e.target.value);
        setValues({ ...values, lang: e.target.value });
    };
    // Function to get the current date in 'YYYY-MM-DD' format
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <div className="container d-flex vh-90 justify-content-center align-items-center">
            <div className="bg-white rounded p-3">
                <ToastContainer transition={Slide} />
                {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}
                <Link to="/book/books" className="btn btn-primary me-2 float-right">Back</Link>
                <form onSubmit={handleSubmit} className='needs-validation' noValidate>
                    <h2>Add Book</h2>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" name="book_name" placeholder='Enter Book Name' onChange={handleInput} required />
                                <label htmlFor="book_name">Books Name</label>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" name="publisher_name" placeholder='Enter Publisher Name' onChange={handleInput} required />
                                <label htmlFor="publisher_name">Publisher Name</label>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" name="class" placeholder='Enter Category' onChange={handleInput} required />
                                <label htmlFor="class">Category</label>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" min={1} name="quantity" placeholder='Enter Quantity' onChange={handleInput} required />
                                <label htmlFor="quantity">Quantity</label>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" name="price_per_book" placeholder='Enter Price Per Book' onChange={handleInput} required />
                                <label htmlFor="price_per_book">Price Per Book</label>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" name="publish_year" min={new Date().getFullYear() - 20} max={new Date().getFullYear()} placeholder='Enter Publish Year' onChange={handleInput} required />
                                <label htmlFor="publish_year">Publish Year</label>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please enter valid Year.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-2">
                                <input type="date" className="form-control" name="buying_date" placeholder='Enter Buying Date' onChange={handleInput} max={getCurrentDate()} required />
                                <label htmlFor="buying_date">Buying Date</label>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please select valid buying date.</div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-floating mb-2">
                                <select className='form-control' name='lang' value={selectedLanguage} onChange={handleChange} required>
                                    <option>Select Language</option>
                                    {languages.map((language) => (
                                        <option key={language.value} value={language.value}>
                                            {language.label}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="select-language">Select Language</label>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please select language.</div>
                            </div>
                        </div>
                    </div>
                    <button className={'btn btn-success ' + submitdisable}>Submit</button>

                </form>

            </div>
        </div>
    )
}

export default CreateBook;