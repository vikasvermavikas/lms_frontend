import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";
const BookStock = () => {
    const token = localStorage.getItem('TOKEN');
    const [nextbutton, setNextbutton] = useState('');
    const [error, setError] = useState({
        search: '',
        server: '',
    });
    const [data, setData] = useState([

    ]);


    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    };
    // Code for search string.
    const [search, setSearch] = useState('');
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.get('http://localhost:8082/books/stock/' + search, config)
                .then(res => {
                    if (res.data.length === 0) {
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
                        search: err.response.data
                    });
                });

        } catch (error) {

        }

    };
    const getstockdata = async () => {
        try {
            await axios.get('http://localhost:8082/books/stock', config)
                .then(response => {
                    setData(response.data);
                    setSearch('');
                    setError({
                        search: ''
                    });
                })
                .catch(err => {
                    setError({
                        list: err.response.data
                    });
                });

        } catch (error) {

            setError({
                server: error.message
            });
        }

    };
    useEffect(() => {
        document.title = 'Books Stock';
        getstockdata();
    }, []);

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
            <div className="row">
                <div className="col-md-12">
                    <h2> Books Stocks </h2>
                    <h5> Total Books Categories :  {data.length}</h5>
                </div>

                <div className="col-md-12">
                    {error.search ? (<span className="text-danger" role="alert">* {error.search}</span>) : ''}
                    {error.list ? (<span className="text-danger" role="alert">* {error.list}</span>) : ''}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group d-flex w-50">
                            <input className="form-control" type="text" name='search' value={search} placeholder="Search" onChange={handleChange}
                                required />
                            <button type="submit" className="btn btn-primary ms-2">Search</button>
                            <button onClick={getstockdata} className="btn btn-danger ms-2">Clear</button>
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Book Name</th>
                                <th>Class</th>
                                <th>Publisher Name</th>
                                <th>Publish Year</th>
                                <th>Total Books</th>
                                <th>Assigned Books</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((book, index) => (
                                <tr key={index}>
                                    <td>{index + 1} </td>
                                    <td>{book.book_name}</td>
                                    <td>{book.class}</td>
                                    <td>{book.publisher_name}</td>
                                    <td>{book.publish_year}</td>
                                    <td>{book.total_books}</td>
                                    <td>{book.assigned_books}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
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
                </div>
            </div>
        </div>
    )
};

export default BookStock;