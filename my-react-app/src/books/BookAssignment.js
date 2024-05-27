import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookAssignment = () => {
    const token = localStorage.getItem('TOKEN');
    const [error, setError] = useState({
        search: '',
        server: '',
    });
    const [values, setValues] = useState({});
    const [data, setData] = useState([]);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        }
    };


// return book

const returnBook = (id) => {
const data = {"return" : 1};
    axios.put('http://localhost:8082/books/bookreturn/' + id, data, config)
    .then(res => {
    //    setValues(res.data[0]);
       console.log(res.data[0]);

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






    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const getUserAssignments = () => {
        axios.get('http://localhost:8082/books/assignments/', config)
            .then(res => {
                setData(res.data);
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
        document.title = "Books Assignments";
        getUserAssignments();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8082/books/assignments/' + values.search, config)
            .then(res => {
                setData(res.data);
             })
            .catch(err => { });
    };
    const clearinput = (e) => {
        e.preventDefault();
        setValues({...values, search: '' });
        setError({...error, search: '' });
        
    };
    return (
        <div className="container-fluid vh-100">
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        Books Assignments
                    </h2>
                    <div className="d-flex justify-content-end">
                        <Link to="/book/books" className="btn btn-success">Books</Link>
                    </div>
                </div>

                <div className="col-md-12">
                    {error.search ? (<span className="text-danger" role="alert">* {error.search}</span>) : ''}
                    {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group d-flex w-50">
                            <input className="form-control" type="text" name='search' value={values.search} placeholder="Search" onChange={handleInput}
                                required />
                            <button type="submit" className="btn btn-primary ms-2">Search</button>
                            <button onClick={clearinput} className="btn btn-danger ms-2">Clear</button>
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='text-center'>Id</th>
                                <th className='text-center'>User Name</th>
                                <th className='text-center'>Book Name</th>
                                <th className='text-center'>From Date</th>
                                <th className='text-center'>To Date</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((book, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{index + 1} </td>
                                    <td className='text-center'>{book.user_name}</td>
                                    <td className='text-center'>{book.book_name}</td>
                                    <td className='text-center'>{new Date(book.from_date).toLocaleDateString()}</td>
                                    <td className='text-center'>{new Date(book.to_date).toLocaleDateString()}</td>
                                    <td className='text-center'>
                                        <Link to={`/book/assignment_details/${book.id}`} className="btn btn-sm btn-primary ml-2">View Details</Link>
                                        <Link onClick={() => returnBook(book.id)} className="btn btn-sm btn-info"> {book.return == 1 ? 'Return' : 'Returned'} </  Link>                                    
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookAssignment;