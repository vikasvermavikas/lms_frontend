import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [error, setError] = useState({
        token: ''
    });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        }
    }
    useEffect(() => {
        document.title = "Edit User";
        axios.get('http://localhost:8082/read/' + id, config)
            .then(res => setUser(res.data[0]))
            .catch(err => {
                console.log(err);
                setError({
                    token: err.response.data
                });

            })
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8082/update/' + id, user, config)
            .then(res => {
                navigate('/user/users');
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="d-flex vh-90 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                {error.token ? (<span className="text-danger" role="alert">* {error.token}</span>) : ''}
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" placeholder='Enter First Name' value={user.username} disabled />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" name="first_name" placeholder='Enter First Name' value={user.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' value={user.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} placeholder='Enter Email' onChange={e => setUser({ ...user, email: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="gender">Gender</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value="male" checked={user.gender == 'male' ? 'checked' : ''} onChange={e => setUser({ ...user, gender: e.target.value })} />
                            <label className="form-check-label" htmlFor="gender1">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value="female" checked={user.gender == 'female' ? 'checked' : ''} onChange={e => setUser({ ...user, gender: e.target.value })} />
                            <label className="form-check-label" htmlFor="gender2">
                                Female
                            </label>
                        </div>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                    <Link to="/user/users" className="btn btn-primary me-2">Back</Link>
                </form>

            </div>
        </div>
    )
}

export default Edit;