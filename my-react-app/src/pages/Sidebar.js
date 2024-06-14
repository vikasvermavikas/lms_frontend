import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { ReactSession } from "react-client-session";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmToast } from 'react-confirm-toast';
import "react-paginate/theme/basic/react-paginate.css";


import Footer from './Footer';
import axios from "axios";

const Sidebar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const [values, setValues] = useState({
        userid: JSON.parse(localStorage.getItem("USER")).id
    });

    console.log(values);

    useEffect(() => {
        document.title = "Logout";

        console.log(values);

    }, []);

    const handleLogout = (event) => {
        // event.preventDefault();
        axios.post("http://localhost:8082/logout", values)
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


    const [error, setError] = useState({
        message: ""
    });
    



    const [dashboardUrl, setDashboardUrl] = useState('');
    // Default set userdata.
    const [userdata, setUserdata] = useState({
        username: '',
        image: '',
        roleid: '',
    });

    useEffect(() => {
        // Means if user is not logged in then redirect to the home page.
        if (!localStorage.getItem("TOKEN")) {
            navigate('/');
        }
        else {
            // Set userdata.
            setUserdata(JSON.parse(localStorage.getItem("USER")));
            if (userdata.roleid === 1) {
                setDashboardUrl('/user/dashboard');
            }
            else {
                setDashboardUrl('/guest/dashboard');
            }
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
                    <Link to={dashboardUrl} className="sidebar-brand d-flex align-items-center justify-content-center">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">LMS </div>
                    </Link>

                    <hr className="sidebar-divider my-0" />

                    {/* <!-- Nav Item - Dashboard --> */}
                    <li className="nav-item active">

                        <Link to={dashboardUrl} className="nav-link"> <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span> </Link>
                    </li>

                    {/* <!-- Divider --> */}
                    <hr className="sidebar-divider" />

                    {/* <!-- Heading --> */}
                    <div className="sidebar-heading">
                        Interface
                    </div>
                    {userdata.roleid === 1 ? (<>
                        <li className="nav-item">
                            <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <i className="fas fa-fw fa-cog"></i>
                                <span>Manage Users</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Users:</h6>
                                    <Link to="/user/users" className="collapse-item">Users List</Link>
                                    <Link to="/user/create" className="collapse-item">Add User</Link>
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
                        </>) : ''}
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
                                    <Link to="/book/stock" className="collapse-item">Stock</Link>
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

                            {/* <!-- Topbar Search --> */}
                            {/* <form
                                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                        aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form> */}

                            {/* <!-- Topbar Navbar --> */}
                            <ul className="navbar-nav ml-auto">

                                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" id="searchDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>
                                    {/* <!-- Dropdown - Messages --> */}
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                        aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small"
                                                    placeholder="Search for..." aria-label="Search"
                                                    aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>

                                {/* <!-- Nav Item - Alerts --> */}
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" id="alertsDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-bell fa-fw"></i>
                                        {/* <!-- Counter - Alerts --> */}
                                        <span className="badge badge-danger badge-counter">3+</span>
                                    </a>
                                    {/* <!-- Dropdown - Alerts --> */}
                                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="alertsDropdown">
                                        <h6 className="dropdown-header">
                                            Alerts Center
                                        </h6>
                                        <a className="dropdown-item d-flex align-items-center">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-primary">
                                                    <i className="fas fa-file-alt text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 12, 2019</div>
                                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-success">
                                                    <i className="fas fa-donate text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 7, 2019</div>
                                                $290.29 has been deposited into your account!
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-warning">
                                                    <i className="fas fa-exclamation-triangle text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 2, 2019</div>
                                                Spending Alert: We've noticed unusually high spending for your account.
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500">Show All Alerts</a>
                                    </div>
                                </li>



                                <div className="topbar-divider d-none d-sm-block"></div>

                                {/* <!-- Nav Item - User Information --> */}
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userdata.username ? userdata.username : ''}</span>
                                        <img className="img-profile rounded-circle"
                                            src={`http://localhost:8082/${userdata.image}`} />
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