import { useState, useEffect } from 'react';
import axios from 'axios';
const GuestDashboard = () => {
    const token = localStorage.getItem('TOKEN');
    const [error, setError] = useState({
        server: ''
    });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };
    const [assignments, setAssignments] = useState(0);
    const [pendingreturn, setPendingreturn] = useState(0);
    const [messages, setMesagges] = useState(0);
    const getTotalAssignment = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_HOST + 'books/total/assignments', config);
            if (response.data.length > 0) {
                setAssignments(response.data[0].total_assignments);
                setError({
                    server: ''
                });
            }
        } catch (error) {
            setError({
                server: error.message
            });
        }
    };

    const getPendingAssignment = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_HOST+'books/total/pending_assignments', config);
            if (response.status === 200) {
                setPendingreturn(response.data[0].total_pending_assign);
            }
        } catch (error) {
            setError({
                server: error.message
            }); 
        }
    };

    const getNotificationCount = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_HOST + 'user/notifications/count');
        } catch (error) {
            setError({
                server: error.message
            }); 
        }

    };

    useEffect(() => {
        getTotalAssignment();
        getPendingAssignment();
        getNotificationCount();
    }, []);

    return (
        <div className='container bg-white rounded vh-100'>
            < div className="d-sm-flex align-items-center justify-content-between mb-4" >
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                {/* <a className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
            </div >
            {error && <span className='text-danger'>{error.server}</span>}
            < div className="row" >
                {/* <!-- Earnings (Monthly) Card Example --> */}
                < div className="col-xl-4 col-md-6 mb-4" >
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Assignments
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 ms-3 mb-0 mr-3 font-weight-bold text-gray-800">{assignments}</div>
                                        </div>

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
                < div className="col-xl-4 col-md-6 mb-4" >
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Pending For Return</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{pendingreturn}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clock fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                {/* <!-- Earnings (Monthly) Card Example --> */}
                < div className="col-xl-4 col-md-6 mb-4" >
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Notifications</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{messages}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-book fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

            {/* <!-- Content Row --> */}
            <div className="row">
                <div className="col-md-12">
                    <img src={process.env.PUBLIC_URL + '/assets/img/guestlibrary.png'} className="img-responsive w-100" />
                </div>
            </div>
        </div>
    )
};

export default GuestDashboard;