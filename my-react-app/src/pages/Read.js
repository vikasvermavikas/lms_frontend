import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Read = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('TOKEN');
    const [error, setError] = useState({
        read: '',
    });
    const config = {
      headers : {
        'Content-Type' : 'application/json',
        'authorization' : 'Bearer '+ token
      }
    };
    useEffect(() => {
        document.title = "User data";
        axios.get('http://localhost:8082/read/' + id, config)
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
                <div className="row">
                    <div className="p-2 col-md-6">
                        <h2>Id : {user.id}</h2>
                        <h2 className="text-capitalize">First Name :- {user.first_name}</h2>
                        <h2 className="text-capitalize">Last Name :- {user.last_name}</h2>
                        <h2>Email :- {user.email}</h2>
                        <h2 className="text-capitalize">Gender :- {user.gender}</h2>
                    </div>
                    <div className="col-md-6 text-center mt-5">
                        <figure> <img src={`http://localhost:8082/${user.image}`} alt="no-image-found" className="img-fluid w-50" /> </figure>
                    </div>
                </div>
                <Link to="/user/users" className="btn btn-primary me-2">Back</Link>
                <Link to={`/user/edit/${user.id}`} className="btn btn-info">Edit</Link>
            
        </div>
        </>
    );
};

export default Read;