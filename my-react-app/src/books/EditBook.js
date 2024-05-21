import {Link, useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

const EditBook = () => {
    const { id } = useParams();
    const token = localStorage.getItem("TOKEN");
    const userid = localStorage.getItem("USER");
    
    const navigate = useNavigate();
    const [error, setError] = useState({
        server: ''
    });
    const config = {
        headers : {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };
    const [values, setValues] = useState({
        book_name : '',
        publisher_name : '',
        class : '',
        quantity : '',
        price_per_book : '',
        publish_year : '',
        buying_date : '',
        userid: JSON.parse(userid).id,
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
        document.title = "Edit Book";
        getbookdata();
    }, []);
    
   
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8082/books/update/' + id, values, config)
        .then(res => {
            if (res.data.errno) {
                setError({
                    server: res.data.sqlMessage
                });
            }
            else {
                navigate('/book/books');
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
    return  (
        <div className="d-flex vh-90 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}
                <form onSubmit={handleSubmit}>
                    <h2>Update Book</h2>
                    <div className="mb-2">
                        <label htmlFor="book_name">Book Name</label>
                        <input type="text" className="form-control" name="book_name" value={values.book_name} placeholder='Enter Book Name' onChange={handleInput} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="publisher_name">Publisher Name</label>
                        <input type="text" className="form-control" name="publisher_name" value={values.publisher_name} placeholder='Enter Publisher Name' onChange={handleInput} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="class">Class</label>
                        <input type="text" className="form-control" name="class" value={values.class} placeholder='Enter Class' onChange={handleInput} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="quantity">Quantity</label>
                        <input className="form-control" type="number" name="quantity" value={values.quantity} onChange={handleInput} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="price_per_book">Price Per Book</label>
                        <input type="number" className="form-control" name="price_per_book" value={values.price_per_book} placeholder='Enter Price Per Book' onChange={handleInput} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="publish_year">Publish Year</label>
                        <input type="number" className="form-control" name="publish_year" value={values.publish_year} placeholder='Enter Publish Year' onChange={handleInput} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="buying_date">Byying Date</label>
                        <input type="date" className="form-control" name="buying_date" value={values.buying_date} onChange={handleInput} required />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/book/books" className="btn btn-primary me-2">Back</Link>
                </form>

            </div>
        </div>
    )
};

export default EditBook;