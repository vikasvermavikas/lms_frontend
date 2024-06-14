import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";

const Read = () => {
    const location = window.location.origin;
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('TOKEN');
    const [error, setError] = useState({
        read: '',
    });
    const inputRef = useRef(null);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    };
    const printDocument = () => {
        const content = inputRef.current;

        html2canvas(inputRef.current, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 0, 0);
            pdf.save("library_card.pdf");
        });
    };
    
    useEffect(() => {
        document.title = "User data";
        axios.get(process.env.REACT_APP_SERVER_HOST+'read/' + id, config)
            .then(res => {
                setUser(res.data[0]);
                setError({
                    read: ''
                });
            })
            .catch(err => {
                console.log(err);
                setError({
                    read: err.response.data
                });
            })
    }, []);
    return (
        <>
            <div className="container-fluid w-100 bg-white rounded p-3 container">
                {error.read ? (<span className="text-danger">* {error.read}</span>) : ''}
                <Link to="/user/users" className="btn btn-primary me-2">Back</Link>
                <Link to={`/user/edit/${user.id}`} className="btn btn-info float-right">Edit</Link>
                <div className="row">
                    <div className="col-md-6 text-center mt-5">
                        <figure><img src={process.env.REACT_APP_SERVER_HOST+`${user.image}`} alt="no-image-found" className="img-fluid w-50 rounded border" /> </figure>
                    </div>
                    <div className="p-2 col-md-6">
                        <div className="row">
                            <h4>Personal Details</h4>
                            <div className="col-md-6">
                                <p>Library Id : {user.library_id}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-capitalize">First Name :- {user.first_name}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-capitalize">Last Name :- {user.last_name}</p>
                            </div>
                            <div className="col-md-6">
                                <p>Email :- {user.email}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-capitalize">Gender :- {user.gender}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-capitalize">Subscription:- {user.subscription_days} Days</p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-capitalize">Subscription Start Date :-  {new Date(user.timecreated * 1000).toLocaleDateString()}</p>
                            </div>
                            <div className="col-md-6">
                          
                                <p className="text-capitalize">Subscription Paid Amount :- INR {user.subscription_amount}.00</p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-capitalize">Payment Mode :- <span className="text-uppercase">{user.payment_mode}</span></p>
                            </div>
                            <h4>Library Card</h4>
                            <div className="col-md-12">
                                <div className="container card" ref={inputRef} style={{ "backgroundColor": "cornflowerblue", "color": "white" }}>
                                    <div className="card-body" >
                                        <div className="row">
                                            <div className="col-sm-3 border border-white rounded-circle text-center">
                                                <span className=""> LMS </span>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>Library Management System</h4>
                                            </div>
                                            <hr className="mt-2"></hr>
                                            <div className="text-center mb-2">
                                                <span>Membership Card</span>
                                            </div>
                                            <div className="col-md-12" style={{ marginLeft: '20%' }}>

                                            </div>
                                            <div className="col-sm-8 d-flex">
                                                <img src={process.env.REACT_APP_SERVER_HOST+`${user.image}`} alt="no-image-found" className="img-fluid h-75 rounded border" style={{ 'width': '40%' }} />
                                                <div className="ml-2">
                                                    <h4 className="text-capitalize">{user.first_name + " " + user.last_name}</h4>
                                                    <span className="small">{"Library Id:" + "    " + user.library_id}</span><br></br>
                                                    <span className="small">{"Contact No: " + user.mobile}</span><br></br>
                                                    <span className="small">Issue Date: {new Date(user.timecreated * 1000).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <p className="mt-2 ml-5">
                                                    <QRCode
                                                        size={256}
                                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                        value={"/user/details/" + user.library_id}
                                                        viewBox={`0 0 256 256`}

                                                    />
                                                </p>

                                                <div className="float-right text-center">
                                                    <span className="card-text">Authorised By</span><br></br>
                                                    <span className="card-text">Vikas Verma</span>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="col-md-12">
                                            <span className="h6">Address: C-11, Block-C, LGF, Malviya Nagar, Delhi - 110017</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 text-right">
                                    <button className="btn btn-primary" onClick={printDocument}>Download</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </>
    );
};

export default Read;