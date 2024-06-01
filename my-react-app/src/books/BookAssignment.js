import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmToast } from 'react-confirm-toast';
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";

const BookAssignment = () => {
    const token = localStorage.getItem('TOKEN');
    const [nextbutton, setNextbutton] = useState('');
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
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const buttonAttributes = { disabled: false, 'aria-label': 'Custom Aria Label' };

    // return book
    // Functions for handling delete button.
    const bookReturn = (id) => {
        const data = { "return": 1 };
        axios.put('http://localhost:8082/books/bookreturn/' + id, data, config)
            .then(res => {
                toast.success("Book return successfully");
                getUserAssignments();
                // setData(res.data[0]);
                //    console.log(res.data[0]);
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
    const returnBook = (id) => {
        setSelectedId(id);
        setShow(true);
    };

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const getUserAssignments = () => {
        axios.get('http://localhost:8082/books/assignments/', config)
            .then(res => {
                setData(res.data);
                // console.log(res.data);
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
        axios.get('http://localhost:8082/books/assignments/' + values.search.trim(), config)
            .then(res => {
                setData(res.data);
            })
            .catch(err => { });
    };
    const clearinput = (e) => {
        e.preventDefault();
        setValues({ ...values, search: '' });
        setError({ ...error, search: '' });
        getUserAssignments();

    };
  
    // Functions for pagination.

    const itemperpage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemperpage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemperpage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemperpage) % data.length;
        setItemOffset(newOffset);
    };

    // end Code for pagination.
    return (
        <div className="container-fluid vh-100">
            <ConfirmToast
                asModal={true}
                buttonYesText={'Confirm'}
                buttonYesAttributes={buttonAttributes}
                customFunction={() => bookReturn(selectedId)}
                setShowConfirmToast={setShow}
                showConfirmToast={show}
                toastText='Do you want to return this book ?'
                theme={'snow'}
            />
            <ToastContainer transition={Slide} />
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
                                <th>Id</th>
                                <th>User Name</th>
                                <th>Book Name</th>
                                <th>Serial Number</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((book, index) => (
                                <tr key={index}>
                                    <td>{index + 1} </td>
                                    <td>{book.user_name}</td>
                                    <td>{book.book_name}</td>
                                    <td>{book.serial_number}</td>
                                    <td>{new Date(book.from_date).toLocaleDateString()}</td>
                                    <td>{new Date(book.to_date).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={`/book/assignment_details/${book.id}`} className="btn btn-sm btn-primary mr-1">View Details</Link>
                                        {book.return ? (<button className="btn btn-sm pe-none btn-info ">Returned</button>) : (<Link onClick={() => returnBook(book.id)} className="btn btn-sm btn-info ">Return </  Link>)}

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName={"react-paginate"}
                        
                    />
                    {/* <nav>
                        <ul className="pagination">
                            <li className="page-item">
                                <a href="#" className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                                    onClick={prePage}>Prev</a>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a href="#" className="page-link" onClick={() => changeCurrentPage(n)}> {n} </a>
                                    </li>
                                ))
                            }

                            <li className="page-item">
                                <a href="#" className={`page-link ${currentPage === npage ? 'disabled' : ''}`}
                                    onClick={nextPage}>Next</a>
                            </li>
                        </ul>
                    </nav> */}
                </div>
            </div>
        </div>
    );
};

export default BookAssignment;