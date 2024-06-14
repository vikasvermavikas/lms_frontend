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
        axios.get(process.env.REACT_APP_SERVER_HOST + "users", config)
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

        axios.get(process.env.REACT_APP_SERVER_HOST + "user?search=" + search, config)
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
        axios.delete(process.env.REACT_APP_SERVER_HOST + 'delete/' + id, config)
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
                            Readers List
                        </h2>
                        <h5> Total Readers : {data.length} </h5>
                        <div className="d-flex justify-content-end">
                            <Link to="/user/qrSearch" className="btn btn-primary mr-2">Search By QR</Link>
                            <Link to="/user/create" className="btn btn-success">Create +</Link>
                        </div>
                    </div>
                    {error.search ? (<span className="alert alert-danger" role="alert">{error.search}</span>) : ''}
                    {error.list ? (<span className="alert alert-danger" role="alert">{error.list}</span>) : ''}
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit} className="form-inline">
                            <div className="form-group row">
                                <div className="col-md-6">
                                    <input className="form-control" type="text" value={search} name='search' placeholder="Search by name and email" onChange={handlechange}
                                        required />
                                </div>
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-primary ms-2">Search</button>
                                    <button onClick={getuserdata} className="btn btn-danger ms-2">Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>Libary Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Subscription</th>
                                <th>Pending Days</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user, index) => {
                                var currentdate = Date.now(); // current date in milliseconds.
                                var subscription_end_date = new Date(user.subscription_end_date * 1000); // subscription date in milliseconds.
                                var daysleft = (Math.floor((subscription_end_date - currentdate) / (1000 * 3600 * 24))); // days left.
                                if (daysleft > 0) {
                                    var showleft = '-' + daysleft + ' days';
                                }
                                else if (daysleft == 0) {
                                    var showleft = 'Suscription Expired Today';
                                }
                                else {
                                    var showleft = 'Suscription Expired';

                                }
                                return (<tr key={index}>
                                    <td>{user.library_id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td className="text-wrap">{user.email}</td>
                                    <td>{user.subscription_days} days</td>
                                    <td className="text-danger">{showleft}</td>
                                    <td>
                                        <div className="">
                                            <Link to={`/user/read/${user.id}`} className="btn btn-sm btn-primary ml-1 mt-1">View</Link>
                                            <Link to={`/user/edit/${user.id}`} className="btn btn-sm btn-info ml-1 mt-1">Edit</Link>
                                            <button onClick={() => handeDelete(user.id)} className="btn btn-sm btn-danger ml-1 mt-1">Delete</button>
                                        </div>
                                    </td>
                                </tr>)
                            })}
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
        </>
    );


};

export default Users;