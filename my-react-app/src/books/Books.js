import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Books = () => {
    const token = localStorage.getItem('TOKEN');
    const [data, setData] = useState([

    ]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState({
        search: '',
        list: '',
    });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    };

    const getbookdata = () => {
        setSearch('');
        axios.get('http://localhost:8082/books/read', config)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                setError({
                    list: err.response.data
                })
            })
    };
    useEffect(() => {
        document.title = "Books List";
        getbookdata();

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get("http://localhost:8082/books/read/" + search, config)
            .then(res => {
                if (res.data.length == 0) {
                    setError({
                        search: 'No Data Found'
                    });
                }
                else{
                    setError({
                        search: ''
                    });
                }
                setData(res.data);
            })
            .catch(err => {
                setError({
                    list: err.response.data
                })
            });
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    };
    const handeDelete = (id) => {
        axios.delete('http://localhost:8082/books/delete/' + id, config)
           .then(res => {
                getbookdata();
            })
           .catch(err => {
                setError({
                    list: err.response.data
                })
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        Books List
                    </h2>
                    <div className="d-flex justify-content-end">
                        <Link to="/book/create" className="btn btn-success">Add +</Link>
                    </div>
                </div>

                <div className="col-md-12">
                    {error.search ? (<span className="text-danger" role="alert">* {error.search}</span>) : ''}
                    {error.list ? (<span className="text-danger" role="alert">* {error.list}</span>) : ''}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group d-flex w-50">
                            <input className="form-control" type="text" name='search' value={search} placeholder="Search" onChange={handleChange}
                                required />
                            <button type="submit" className="btn btn-primary ms-2">Search</button>
                            <button onClick={getbookdata} className="btn btn-danger ms-2">Clear</button>
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Serial Number</th>
                                <th>Book Name</th>
                                <th>Publisher Name</th>
                                <th>Class</th>
                                <th>Publish Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((book, index) => (
                                <tr key={index}>
                                    <td>{index + 1} </td>
                                    <td>{book.serial_number}</td>
                                    <td>{book.book_name}</td>
                                    <td>{book.publisher_name}</td>
                                    <td>{book.class}</td>
                                    <td>{book.publish_year}</td>
                                    <td>
                                        <Link to={`/book/read/${book.id}`} className="btn btn-sm btn-primary">Read</Link>
                                        <Link to={`/book/edit/${book.id}`} className="btn btn-sm btn-info ms-2">Edit</Link>
                                        <button onClick={() => handeDelete(book.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                                        <Link to={`/book/assign_book/${book.id}`} className="btn btn-sm btn-warning ms-2">Assign Book</Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
};

export default Books;