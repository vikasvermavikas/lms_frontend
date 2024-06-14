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
        const response = await axios.get(process.env.REACT_APP_SERVER_HOST+'user/getNotification', config);
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
    },[]);
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
                            return (
                                <tr key={index}>
                                    <td title='View Details'>
                                        {currentuser.roleid == 1 ? (<Link className='text-decoration-none' to={`/user/read/${notification.id}`} > {notification.library_id} </Link>) : notification.library_id}
                                        

                                        </td>
                                    <td>{notification.name}</td>
                                    <td className='text-danger'>{notification.subscription_end_date < (Math.floor(Date.now() / 1000)) ? 'Subscription Expired' : 'Subscription is ended soon.'}</td>
                                </tr>
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