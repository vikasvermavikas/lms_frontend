import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Users = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState({
        search: '',
        list: '',
    });
    const token = localStorage.getItem('TOKEN');
    const handlechange = (event) => {
        setSearch(event.target.value)
    };
    const config = {
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${token}`,
        },
    };
    const getuserdata = () => {
        setSearch('');
        axios.get("http://localhost:8082/users", config)
            .then(res => {
                if (res.data.length == 0) {
                    setError({
                        search: 'No Data Found'
                    });
                }
                else{
                    setError({
                        search: ''
                    });
                }
                setData(res.data);
                setError({
                    list: ''
                });
            })
            .catch(err => {
                setError({
                    list: err.response.data
                })
            })
    }

    useEffect(() => {
        document.title = "Users";
        getuserdata()
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get("http://localhost:8082/user?search=" + search, config)
            .then(res => {
                setData(res.data);
                setError({
                    search: ''
                })
            })
            .catch(err => {
                setError({
                    search: err.response.data
                })
            })
    };
    const handeDelete = (id) => {
        axios.delete('http://localhost:8082/delete/' + id, config)
            .then(res => {
                try {
                    getuserdata();
                }
                catch (err) {
                    setError({
                        list: err.response.data
                    })
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            Users List
                        </h2>
                        <div className="d-flex justify-content-end">
                            <Link to="/user/create" className="btn btn-success">Create +</Link>
                        </div>
                    </div>
                    {error.search ? (<span className="alert alert-danger" role="alert">{error.search}</span>) : ''}
                    {error.list ? (<span className="alert alert-danger" role="alert">{error.list}</span>) : ''}
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group d-flex w-50">
                                <input className="form-control" type="text" value={search} name='search' placeholder="Search" onChange={handlechange}
                                    required />
                                <button type="submit" className="btn btn-primary ms-2">Search</button>
                                <button onClick={getuserdata} className="btn btn-danger ms-2">Clear</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/user/read/${user.id}`} className="btn btn-sm btn-primary">Read</Link>
                                        <Link to={`/user/edit/${user.id}`} className="btn btn-sm btn-info">Edit</Link>
                                        <button onClick={() => handeDelete(user.id)} className="btn btn-sm btn-danger">Delete</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default Users;