import { useParams, Link} from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios";
const UserRecord = () => {
    const { libraryid } = useParams();
    const token = localStorage.getItem("TOKEN");
    const [user, setUser] = useState({});
    const [assignment, setAssignment] = useState([]);
    const [totalReturn, setTotalReturn] = useState(0);
    const [error, setError] = useState({
        server: '',
        user: ''
    });
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    };

    const currentdate = Date.now(); // current date in milliseconds.
    const subscription_date = new Date(user.timecreated * 1000); // subscription date in milliseconds.
    const daysleft = user.subscription_days - (Math.floor((currentdate - subscription_date) / (1000 * 3600 * 24))) - 1; // days left.

    const getuser = async () => {
        const requestdata = {
            libraryid: libraryid
        };
        const response = await axios.post(process.env.REACT_APP_SERVER_HOST+'user/getallrecord', requestdata, config);
        if (response.status === 200 && response.data) {
            setError({
                user: '',
            });
            setUser(response.data.userdata[0]);
            setAssignment(response.data.assignment);
            setTotalReturn(response.data.total_returned);
        }
        else{
            setError({
                user: 'User not Found !',
            });
        }
    };

    useEffect(() => {
        document.title = 'User Record';
        getuser();
    }, []);
    return (
        <div className="container bg-white rounded">
            <div className="row">
            <div className="col-md-12">
            <Link to="/user/users" className="btn btn-warning float-right">Back</Link>
            <Link to="/user/qrSearch" className="btn btn-primary float-right mr-2">Scan Next</Link>
            <h1 className="text-capitalize">{user.first_name + " " + user.last_name}</h1>
            </div>
            </div>
            {error.user && <span className="text-danger">{error.user}</span>}
            <div className="row">
                <p className="font-weight-bold h4">Personal Details</p>
                <div className="col-md-4">
                    <label><b>Username : </b> {user.username}</label>
                </div>
                <div className="col-md-4">
                    <label><b>Library Id :</b> {user.library_id}</label>
                </div>
                <div className="col-md-4">
                    <label><b>Email : </b> {user.email}</label>
                </div>
                <div className="col-md-4">
                    <label><b>Mobile : </b> {user.mobile}</label>
                </div>
                <div className="col-md-4">
                    <label><b>Aadhar : </b> {user.aadhar}</label>
                </div>
                <div className="col-md-4">
                    <label className="text-capitalize"><b>Gender : </b> {user.gender}</label>
                </div>
                <hr />
                <p className="font-weight-bold h4">Subscription Details</p>

                <div className="col-md-4">
                    <label className="text-capitalize"><b>Subscription : </b> {user.subscription_days} days</label>
                </div>
                <div className="col-md-4">
                    <label className="text-capitalize"><b>Subscription Date : </b> {new Date(user.timecreated * 1000).toLocaleDateString()}</label>
                </div>
                <div className="col-md-4">
                    <label className="text-capitalize"><b>Payment Amount : </b> INR {user.subscription_amount}.00</label>
                </div>
                <div className="col-md-4">
                    <label className="text-capitalize"><b>Payment Through : </b> <span className="text-uppercase">{user.payment_mode}</span></label>
                </div>
                <div className="col-md-4">
                    {/* <label className="text-capitalize"><b>Subscription End : </b> <span className="text-danger">{daysleft > 0 ? `- ${daysleft} Days Left` : 'End'} </span></label> */}
                    <label className="text-capitalize"><b>Subscription End Date : </b> <span className="text-danger">{new Date(user.subscription_end_date * 1000).toLocaleDateString()} </span></label>
                </div>
            </div>
            <hr />
            <p className="font-weight-bold h4">Book Assignment Details</p>
            <Link to="/book/assignments" className="btn btn-info float-right">Assignments</Link>
            <p className="text-info">Total Books : {assignment.length}</p>
            <p className="text-success">Return Books : {totalReturn}</p>
            <p className="text-danger">Pending For Return : {assignment.length - totalReturn}</p>
            {assignment.length == 0 ? (<p className="text-danger">No Books Available</p>) : ''}
            {assignment.map((assignment) => (

                <div className="row mt-2">

                    <p className="font-weight-bold h5">Book - {assignment.book_name}</p>
                    <div className="col-md-4">
                        <span><b>Serial No : </b> {assignment.serial_number}</span>
                    </div>
                    <div className="col-md-4">
                        <span><b>Category : </b> {assignment.category}</span>
                    </div>
                    <div className="col-md-4">
                        <span><b>Reader Class : </b> {assignment.class}</span>
                    </div>
                    <div className="col-md-4">
                        <span><b>Issue From : </b> {new Date(assignment.from_date).toLocaleDateString()}</span>
                    </div>
                    <div className="col-md-4">
                        <span><b>Issue Till Date : </b> {new Date(assignment.to_date).toLocaleDateString()}</span>
                    </div>
                    <div className="col-md-4">
                        <span><b>Return Status : </b> {assignment.return ? (<span className="text-success pe-none">Returned</span>) : (<span className="text-warning pe-none">Pending</span>)}</span>
                    </div>
                    <div className="col-md-4">
                        <span><b>Return Date : </b> {assignment.return_date ? new Date(assignment.return_date * 1000).toLocaleDateString() : 'Not Available'}</span>
                    </div>

                </div>

            ))}

        </div>
    )
};
export default UserRecord;