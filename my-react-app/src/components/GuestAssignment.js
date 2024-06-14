import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";

const GuestDashboard = () => {
    const token = localStorage.getItem('TOKEN');
    const guestid = JSON.parse(localStorage.getItem('USER')).id;
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [error, seterror] = useState({
        search: '',
        list: '',
    });
    const config = {
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    };
    const getbookdata = async () => {
        setSearch('');
        try {
            const res = await axios.post(process.env.REACT_APP_SERVER_HOST+'guest/assignments', {
                guestid
            }, config);
            setData(res.data);
            seterror({
                search: '',
                list: '',
            });
        } catch (err) {
            seterror({
                search: '',
                list: err.response.data.message,
            });
        }
    };
    useEffect(() => {
        getbookdata();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(process.env.REACT_APP_SERVER_HOST+'guest/assignments/' + search, {
                guestid
            }, config);
            setData(res.data);
            seterror({
                search: '',
                list: '',
            });
        } catch (err) {
            seterror({
                search: '',
                list: err.response.data.message,
            });
        }
    };
    const handleChange = (e) => {
        setSearch(e.target.value);
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

    return <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        Books Assignments
                    </h2>
                    <h5> Total Books :  {data.length}</h5>

                </div>
                <div className="col-md-12">
                    {error.search ? (<span className="text-danger" role="alert">* {error.search}</span>) : ''}
                    {error.list ? (<span className="text-danger" role="alert">* {error.list}</span>) : ''}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group d-flex w-50">
                            <input className="form-control" type="text" name='search' value={search} placeholder="Search by serial number and book name" onChange={handleChange}
                                required />
                            <button type="submit" className="btn btn-primary ms-2">Search</button>
                            <button onClick={getbookdata} className="btn btn-danger ms-2">Clear</button>
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table text-center">
                        <thead className=''>
                            <tr>
                                <th>Serial Number</th>
                                <th>Book Name</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((book, index) => (
                                <tr key={index}>
                                    <td>{book.serial_number}</td>
                                    <td>{book.book_name}</td>
                                    <td>{new Date(book.from_date).toLocaleDateString(undefined, '')}</td>
                                    <td>{new Date(book.to_date).toLocaleDateString(undefined, '')}</td>
                                    <td className='text-center'>{book.return ? (<button className='btn btn-success'>Returned</button>) : (<button className='btn btn-warning'>Pending</button>)}</td>
                                    <td>
                                        <Link to={`/guest/book/view/${book.id}`} className="btn btn-sm btn-primary">View Detail</Link>
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
                </div>
            </div>
        </div>
    </>;
};

export default GuestDashboard;