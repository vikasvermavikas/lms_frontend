import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmToast } from 'react-confirm-toast';
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";
const Users = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState({
        search: '',
        list: '',
    });
    const token = localStorage.getItem('TOKEN');
    const handlechange = (event) => {
        setSearch(event.target.value)
    };
    const config = {
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    };
    const [selectedId, setSelectedId] = useState(null);
    const buttonAttributes = { disabled: false, 'aria-label': 'Custom Aria Label' };
    const [show, setShow] = useState(false);

    const getuserdata = () => {
        setSearch('');
        axios.get("http://localhost:8082/users", config)
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
                setError({
                    list: ''
                });
            })
            .catch(err => {
                setError({
                    list: err.response.data
                })
            })
    }

    useEffect(() => {
        document.title = "Users";
        getuserdata()
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get("http://localhost:8082/user?search=" + search, config)
            .then(res => {
                setData(res.data);
                setError({
                    search: ''
                })
            })
            .catch(err => {
                setError({
                    search: err.response.data
                })
            })
    };
    // Functions for handling delete button.
    const deleteUser = (id) => {
        axios.delete('http://localhost:8082/delete/' + id, config)
            .then(res => {
                try {
                    toast.success("User deleted successfully");
                    getuserdata();
                }
                catch (err) {
                    setError({
                        list: err.response.data
                    })
                }
            })
            .catch(err => console.log(err));
    };
    const handeDelete = (id) => {
        setSelectedId(id);
        setShow(true);
    }


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
        <>
            <div className="container-fluid">
            <ConfirmToast
                asModal={true}
                buttonYesText={'Confirm'}
                buttonYesAttributes={buttonAttributes}
                customFunction={() => deleteUser(selectedId)}
                setShowConfirmToast={setShow}
                showConfirmToast={show}
                toastText='Do you want to delete this user ?'
                theme={'snow'}
            />
            <ToastContainer transition={Slide} />

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            Users List
                        </h2>
                        <h5> Total Users : {data.length} </h5>
                        <div className="d-flex justify-content-end">
                            <Link to="/user/create" className="btn btn-success">Create +</Link>
                        </div>
                    </div>
                    {error.search ? (<span className="alert alert-danger" role="alert">{error.search}</span>) : ''}
                    {error.list ? (<span className="alert alert-danger" role="alert">{error.list}</span>) : ''}
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group d-flex w-50">
                                <input className="form-control" type="text" value={search} name='search' placeholder="Search" onChange={handlechange}
                                    required />
                                <button type="submit" className="btn btn-primary ms-2">Search</button>
                                <button onClick={getuserdata} className="btn btn-danger ms-2">Clear</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table  text-center">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/user/read/${user.id}`} className="btn btn-sm btn-primary ms-2">Read</Link>
                                        <Link to={`/user/edit/${user.id}`} className="btn btn-sm btn-info ms-2">Edit</Link>
                                        <button onClick={() => handeDelete(user.id)} className="btn btn-sm btn-danger ms-2">Delete</button>

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
        </>
    );

 
};

export default Users;