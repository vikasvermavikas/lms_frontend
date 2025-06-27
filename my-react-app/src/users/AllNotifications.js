import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const AllNotifications = () => {
    const token = localStorage.getItem('TOKEN');
    const currentuser = JSON.parse(localStorage.getItem('USER'));
    const [empty, setEmpty] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const config = {
        headers: {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }
    };
    const getNotifications = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_HOST + 'user/getNotification', config);
        if (response.status === 200 && response.data) {
            if (response.data.length > 0) {
                setNotifications(response.data);
            }
            else {
                setEmpty(true);
            }
        }
    };
    useEffect(() => {
        document.title = 'Notifications';
        getNotifications();
    }, []);
    const handleCollapse = (e) => {
        if (e.currentTarget.classList.contains('collapsed')) {
            e.target.classList.add('fa-chevron-down');
            e.target.classList.remove('fa-chevron-right');
        }
        else {
            e.target.classList.add('fa-chevron-right');
            e.target.classList.remove('fa-chevron-down');
        }
    }
    return (
        <div className="container bg-white vh-100 rounded">
            <div className="row">
                <div className="col-md-12">
                    <p className="h2">Today's Notifications</p>
                    <h5 className='mt-2'> Total Notifications : {notifications.length} </h5>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">Library Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map((notification, index) => {
                            var assignedBooks = [];
                            var booksName = [];
                            var returnStatus = [];
                            var assignDates = [];
                            var bookIds = [];
                            var assignmentIds = [];
                            if (notification.bookid) {
                                assignedBooks = notification.bookid.split(',');
                                booksName = notification.bookname
                                    .split(',');
                                returnStatus = notification.returnstatus.split(',');
                                assignDates = notification.assign_date.split(',');
                                bookIds = notification.bookid.split(',');
                                assignmentIds = notification.assignment_id.split(',');
                            }

                            return (
                                <>
                                    <tr key={index}>
                                        <td title='View Details'>
                                            <i className="fas fa-chevron-right collapsed float-left" onClick={handleCollapse} data-toggle="collapse" data-target={"#collapseExample" + index} aria-expanded="false" aria-controls={"collapseExample" + index}></i>

                                            {currentuser.roleid == 1 ? (<Link className='text-decoration-none' to={`/user/read/${notification.id}`} > {notification.library_id} </Link>) : notification.library_id}
                                        </td>
                                        <td>{notification.name}</td>
                                        <td className='text-danger'>{notification.subscription_end_date < (Math.floor(Date.now() / 1000)) ? 'Subscription Expired' : 'Subscription is ended soon.'}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            <div className="collapse" id={"collapseExample" + index}>
                                                <div className="row">
                                                    <div className='bg-info d-flex'>
                                                        <div className='col-md-3'>
                                                            Book Id
                                                        </div>
                                                        <div className='col-md-3'>
                                                            Book Name
                                                        </div>
                                                        <div className='col-md-3'>
                                                            Assigned Date
                                                        </div>
                                                        <div className='col-md-3'>
                                                            Status
                                                        </div>
                                                    </div>
                                                    {/* <hr></hr> */}
                                                    {assignedBooks.length > 0 && assignedBooks.map((assigned, indexvalue) => {
                                                        return (
                                                            <div key={indexvalue} className='row'>
                                                                <div className='col-md-3'>
                                                                  <Link className='text-decoration-none' to={"/book/assignment_details/"+assignmentIds[indexvalue]}>  {bookIds[indexvalue]} </Link>
                                                                </div>
                                                                <div className='col-md-3'>
                                                                    {booksName[indexvalue]}
                                                                </div>
                                                                <div className='col-md-3'>
                                                                    {new Date(assignDates[indexvalue] * 1000).toLocaleDateString()}
                                                                </div>
                                                                <div className='col-md-3'>
                                                                    {returnStatus[indexvalue] == 1 ? <span className='text-success'>Returned</span> : <span className='text-danger'>Pending</span>}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </>

                            )
                        })}
                        {
                            empty ? (
                                <tr>
                                    <td colSpan='3' className='text-center text-danger'>No Notifications</td>
                                </tr>
                            ) : ''
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
};
export default AllNotifications;