import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { ReactSession } from "react-client-session";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmToast } from 'react-confirm-toast';
import "react-paginate/theme/basic/react-paginate.css";


import Footer from './Footer';
import axios from "axios";
import { dashboardUrl } from '../config/Constants';
const Sidebar = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({
        userid: JSON.parse(localStorage.getItem("USER")).id
    });

    const [error, setError] = useState({
        message: ""
    });

    const handleLogout = (event) => {
        // event.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_HOST + "logout", values)
            .then(res => {
                if (res.data.status) {
                    sessionStorage.clear();
                    localStorage.clear();
                    navigate('/login');
                }
                else {
                    setError({
                        message: res.data.message
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    // Default set userdata.
    const [userdata, setUserdata] = useState({
        roleid: ''
    });

    const getTopnotify = () => {
        if (userdata && localStorage.getItem("TOKEN")) {
            const token = localStorage.getItem("TOKEN");
            const config = {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            axios.get(process.env.REACT_APP_SERVER_HOST + 'get_top_notify', config)
                .then((res) => {
                    if (res.data.length > 0) {
                        setUsers(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    useEffect(() => {
        document.title = "Logout";

        // Means if user is not logged in then redirect to the home page.
        if (!localStorage.getItem("TOKEN")) {
            navigate('/');
        }
        else {
            setUserdata(JSON.parse(localStorage.getItem("USER")));
            getTopnotify();

        }
    }, []);

    const handleLogout1 = () => {
        setShow(true);
    };

    return (
        <>
            <ConfirmToast
                asModal={true}
                buttonYesText={'Confirm'}
                customFunction={() => handleLogout()}
                setShowConfirmToast={setShow}
                showConfirmToast={show}
                toastText='Do you want logout ?'
                theme={'snow'}
            />
            <ToastContainer transition={Slide} />

            <div id="wrapper">
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <Link to={dashboardUrl()} className="sidebar-brand d-flex align-items-center justify-content-center">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">LMS </div>
                    </Link>

                    <hr className="sidebar-divider my-0" />

                    {/* <!-- Nav Item - Dashboard --> */}
                    <li className="nav-item active">

                        <Link to={dashboardUrl()} className="nav-link"> <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span> </Link>
                    </li>

                    {/* <!-- Divider --> */}
                    <hr className="sidebar-divider" />

                    {/* <!-- Heading --> */}
                    <div className="sidebar-heading">
                        Interface
                    </div>
                    {userdata.roleid === 1 && <>
                        <li className="nav-item">
                            <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <i className="fas fa-fw fa-cog"></i>
                                <span>Manage Readers</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Readers:</h6>
                                    <Link to="/user/users" className="collapse-item">Readers List</Link>
                                    <Link to="/user/create" className="collapse-item">Add Reader</Link>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseOne"
                                aria-expanded="true" aria-controls="collapseOne">
                                <i className="fas fa-fw fa-cog"></i>
                                <span>Manage Subscriptions</span>
                            </a>
                            <div id="collapseOne" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Subscription:</h6>
                                    <Link to="/subscription/list" className="collapse-item">Subscriptions List</Link>
                                    <Link to="/subscription/create" className="collapse-item">Add Subscription</Link>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseThree"
                                aria-expanded="true" aria-controls="collapseThree">
                                <i className="fas fa-fw fa-cog"></i>
                                <span>Library Management</span>
                            </a>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Books:</h6>
                                    <Link to="/book/books" className="collapse-item">Books List</Link>
                                    <Link to="/book/create" className="collapse-item">Add Book</Link>
                                </div>
                            </div>
                        </li>
                    </>}
                    {/* <!-- Nav Item - Pages Collapse Menu --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseFour"
                            aria-expanded="true" aria-controls="collapseFour">
                            <i className="fas fa-fw fa-cog"></i>
                            <span>Assign Books</span>
                        </a>
                        <div id="collapseFour" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Books</h6>
                                <Link to={userdata.roleid === 1 ? '/book/assignments' : '/guest/assignments'} className="collapse-item">Assignments</Link>
                                <Link to={userdata.roleid === 1 ? '/book/stock' : '/guest/book/stock'} className="collapse-item">Stock</Link>

                            </div>
                        </div>
                    </li>
                </ul>


                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                            {/* <!-- Sidebar Toggle (Topbar) --> */}
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>

                            {/* <!-- Topbar Navbar --> */}
                            <ul className="navbar-nav ml-auto">


                                {/* <!-- Nav Item - Alerts --> */}
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" id="alertsDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-bell fa-fw"></i>
                                        {/* <!-- Counter - Alerts --> */}
                                        <span className="badge badge-danger badge-counter">{users.length}</span>
                                    </a>
                                    {/* <!-- Dropdown - Alerts --> */}
                                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="alertsDropdown">
                                        <h6 className="dropdown-header">
                                            Notifications
                                        </h6>
                                        {users.map((user, index) => (
                                            <div className="dropdown-item d-flex align-items-center" key={index}>
                                                <div className="mr-3">
                                                    <div className="icon-circle bg-primary">
                                                        <i className="fas fa-file-alt text-white"></i>
                                                    </div>
                                                </div>
                                                <div className="text">
                                                    <span className="font-weight-bold">{user.name} subscription closed soon.</span>
                                                </div>
                                            </div>
                                        ))}

                                        <Link to='/user/all_notifications' className="dropdown-item text-center small text-gray-500">Show All Notifications</Link>
                                    </div>
                                </li>

                                <div className="topbar-divider d-none d-sm-block"></div>

                                {/* <!-- Nav Item - User Information --> */}
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userdata.username ? userdata.username : ''}</span>
                                        <img className="img-profile rounded-circle"
                                            src={process.env.REACT_APP_SERVER_HOST + `${userdata.image}`} />
                                    </a>
                                    {/* <!-- Dropdown - User Information --> */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="userDropdown">

                                        <Link to="/user/profile" className="dropdown-item"><i className="ffas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</Link>

                                        {/* <a className="dropdown-item">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Settings
                                        </a> */}
                                        <a className="dropdown-item">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Activity Log
                                        </a>
                                        <div className="dropdown-divider"></div>

                                        {/* <Link to="/user/logout" className="dropdown-item"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout</Link> */}



                                        <a className="dropdown-item">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            <span onClick={() => handleLogout1()}>Logout</span>
                                        </a>
                                    </div>
                                </li>

                            </ul>

                        </nav>

                        <Outlet />
                        <br />
                        <br />
                        <br />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Sidebar;