import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmToast } from 'react-confirm-toast';
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";

const Books = () => {
    // Define constants.
    const token = localStorage.getItem('TOKEN');
    const [nextbutton, setNextbutton] = useState('');
    const [assignmentStatuses, setAssignmentStatuses] = useState({});
    const [data, setData] = useState([

    ]);
    const [search, setSearch] = useState('');
    const [isassign, setIsassign] = useState('');
    const [error, setError] = useState({
        search: '',
        list: '',
    });
    const [show, setShow] = useState(false);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    };

    const [selectedId, setSelectedId] = useState(null);
    const buttonAttributes = { disabled: false, 'aria-label': 'Custom Aria Label' };

    const getbookdata = () => {
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
    const fetchAssignmentStatuses = async (books) => {
        const statuses = {};
        const requests = books.map(book =>
            axios.get(`http://localhost:8082/books/is_assign/${book.id}`, config)
                .then(res => {
                    statuses[book.id] = res.data;
                })
                .catch(error => {
                    console.error(`Error fetching assignment status for book ID ${book.id}:`, error);
                })
        );
        await Promise.all(requests);
        setAssignmentStatuses(statuses);
    };

    useEffect(() => {
        document.title = "Books List";
        getbookdata();
    }, []);

    // useEffect(() => {
    //     if (data.length > 0) {
    //         // fetchAssignmentStatuses(data);
    //     }
    // }, [data]);

    // Submit the form.
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get("http://localhost:8082/books/read/" + search, config)
            .then(res => {
                if (res.data.length == 0) {
                    setError({
                        search: 'No Data Found'
                    });
                }
                else {
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


    // Functions for handling delete button.
    const deleteBook = (id) => {
        axios.delete('http://localhost:8082/books/delete/' + id, config)
            .then(res => {
                toast.success("Book deleted successfully");
                getbookdata();
            })
            .catch(err => {
                setError({
                    list: err.response.data
                })
            });
    };
    const handeDelete = (id) => {
        setSelectedId(id);
        setShow(true);

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
        <div className="container-fluid">
            <ConfirmToast
                asModal={true}
                buttonYesText={'Confirm'}
                buttonYesAttributes={buttonAttributes}
                customFunction={() => deleteBook(selectedId)}
                setShowConfirmToast={setShow}
                showConfirmToast={show}
                toastText='Do you want to delete this book ?'
                theme={'snow'}
            />
            <ToastContainer transition={Slide} />

            <div className="row">
                <div className="col-md-12">
                    <h2>
                        Books List
                    </h2>
                    <h5> Total Books :  {data.length}</h5>
                    <div className="d-flex justify-content-end">
                        <Link to="/book/create" className="btn btn-success">Add +</Link>
                        <Link to="/book/assignments" className="btn btn-primary ms-1">Assignments</Link>
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
                    <table className="table">
                        <thead className=''>
                            <tr>
                                <th >Id</th>
                                <th>Serial Number</th>
                                <th>Book Name</th>
                                <th>Publisher Name</th>
                                <th>Class</th>
                                <th>Publish Year</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((book, index) => (
                                <tr key={index}>
                                    <td>{index + 1} </td>
                                    <td>{book.serial_number}</td>
                                    <td>{book.book_name}</td>
                                    <td>{book.publisher_name}</td>
                                    <td>{book.class}</td>
                                    <td className='text-center'>{book.publish_year}</td>
                                    <td>
                                        <Link to={`/book/read/${book.id}`} className="btn btn-sm btn-primary">Read</Link>
                                        <Link to={`/book/edit/${book.id}`} className="btn btn-sm btn-info ms-2">Edit</Link>
                                        <button onClick={() => handeDelete(book.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                                        {book.availability ? (<Link to={`/book/assign_book/${book.id}`} className="btn btn-sm btn-warning ms-2">Assign Book</Link>) : (<button className='btn btn-sm btn-warning ms-2 disabled'>Assigned</button>)}
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
    )
};

export default Books;