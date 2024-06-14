import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import axios from "axios";
const Dashboard = () => {
    const token = localStorage.getItem('TOKEN');
    const [totalusers, setTotalusers] = useState(0);
    const [totalbooks, setTotalbooks] = useState(0);
    const [totalassignments, setTotalassignments] = useState(0);
    const [pendingassignments, setPendingassignments] = useState(0);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };
    const getTotalusers = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_HOST+'users/count', config);
        if (response.status === 200) {
            setTotalusers(response.data[0].total);
        }
    };
    const getTotalbook = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_HOST+'books/total/categories', config);
        if (response.status === 200) {
            setTotalbooks(response.data[0].total_books);
        }
    };
    const getTotalassignment = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_HOST+'books/total/assignments', config);
        if (response.status === 200) {
            setTotalassignments(response.data[0].total_assignments);
        }
    };

    const getTotalpendingAssign = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_HOST+'books/total/pending_assignments', config);
        if (response.status === 200) {
            setPendingassignments(response.data[0].total_pending_assign);
        }
    };

    useEffect(() => {
        document.title = "Dashboard";
        getTotalusers();
        getTotalbook();
        getTotalassignment();
        getTotalpendingAssign();
    }, []);

    return (
        <>
            {/* <!-- Begin Page Content --> */}
            < div className="container-fluid" >

                {/* <!-- Page Heading --> */}
                < div className="d-sm-flex align-items-center justify-content-between mb-4" >
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    {/* <a className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
                </div >

                {/* <!-- Content Row --> */}
                < div className="row" >

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Total Users</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{totalusers}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-users fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Total Book Categories</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{totalbooks}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-book fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Assignments
                                        </div>
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                                <div className="h5 ms-3 mb-0 mr-3 font-weight-bold text-gray-800">{totalassignments}</div>
                                            </div>
                                            {/* <div className="col">
                                                <div className="progress progress-sm mr-2">
                                                    <div className="progress-bar bg-info" role="progressbar"
                                                        style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0"
                                                        aria-valuemax="100"></div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >

                    {/* <!-- Pending Requests Card Example --> */}
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Pending For Return</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{pendingassignments}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clock fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >

                {/* <!-- Content Row --> */}
                <div className="row">
                    <div className="col-md-12">
                    <img src={process.env.PUBLIC_URL + '/assets/img/library.jpg'} className="img-responsive w-100"/>
                    </div>
                </div>

            </div >

        </>

    );
};

export default Dashboard;