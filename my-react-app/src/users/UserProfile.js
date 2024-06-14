import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const UserProfile = () => {
    const token = localStorage.getItem('TOKEN');
    const user = JSON.parse(localStorage.getItem('USER'));
    const [userdata, setUserdata] = useState({});
    const getUserData = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_HOST+'read/'+ user.id, {
            headers: {
                'authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            setUserdata(response.data[0]);
        }
    };
    useEffect(() => {
        document.title = 'User Profile';
        getUserData();
    }, []);

    return (
        <>
            <section style={{ backgroundColor: '#f4f5f7' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-12 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-black"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src={process.env.REACT_APP_SERVER_HOST+`${userdata.image}`}
                                            alt="Avatar" className="img-fluid my-5 rounded w-75" />
                                        <h5>{userdata.first_name + " " + userdata.last_name}</h5>
                                        <Link to="/user/updateProfile">
                                            <i className="far fa-edit mb-5"></i>
                                        </Link>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            {/* <hr className="mt-0 mb-4"> </hr> */}
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>User Name</h6>
                                                    <p className="text-muted">{userdata.username}</p>
                                                </div>
                                               {userdata.library_id && <div className="col-6 mb-3">
                                                    <h6>Library Id</h6>
                                                    <p className="text-muted">{userdata.library_id}</p>
                                                </div>} 
                                                <div className="col-6 mb-3">
                                                    <h6>Mobile</h6>
                                                    <p className="text-muted">{userdata.mobile}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Gender</h6>
                                                    <p className="text-muted">{userdata.gender}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{userdata.email}</p>
                                                </div>

                                                <div className="col-6 mb-3">
                                                    <h6>Aadhar No.</h6>
                                                    <p className="text-muted">{userdata.aadhar}</p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

};

export default UserProfile;