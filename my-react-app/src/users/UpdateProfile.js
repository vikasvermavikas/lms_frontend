import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const UpdateProfile = () => {
    const token = localStorage.getItem('TOKEN');
    const [error, setError] = useState({
        token: '',
        server: '',
    });
    const [user, setUser] = useState({});
    const config = {
        headers: {
            "Content-type": "multipart/form-data",
            "authorization": `Bearer ${token}`,
        },
    };
    const userdata = JSON.parse(localStorage.getItem('USER'));
    const getUserData = async () => {
        const response = await axios.get('http://localhost:8082/read/' + userdata.id, {
            headers: {
                'authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            setUser(response.data[0]);
        }
    };
    useEffect(() => {
        document.title = 'Update Profile';
        getUserData();
    }, []);
    
    const navigate = useNavigate();
    const handlechange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const handleFile = (e) => {
        setUser({ ...user, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', user.first_name);
        formData.append('last_name', user.last_name);
        formData.append('email', user.email);
        formData.append('gender', user.gender);
        formData.append('image', user.image);
        formData.append('mobile', user.mobile);
        formData.append('aadhar', user.aadhar);
        axios.put('http://localhost:8082/user/updateprofile/' + user.id, formData, config)
            .then((response) => {
                if (response.errno) {
                    setError({
                        server: response.sqlMessage
                    });
                }
                else {
                    navigate('/user/profile');
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };

    
    return (
        <div className="container justify-content-center align-items-center">
            <div className="w-100 bg-white rounded p-3">
                {error.token ? (<span className="text-danger" role="alert">* {error.token}</span>) : ''}
                {error.server ? (<span className="text-danger" role="alert">* {error.server}</span>) : ''}
                <Link to="/user/profile" className="btn btn-primary float-right me-2">Back</Link>

                <form onSubmit={handleSubmit}>
                    <h2>Update Profile</h2>
                    <div className='row'>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" placeholder='Enter User Name' value={user.username} disabled />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" className="form-control" name="first_name" placeholder='Enter First Name' value={user.first_name} onChange={handlechange} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className="form-control" name="last_name" placeholder='Enter Last Name' value={user.last_name} onChange={handlechange} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" value={user.email} placeholder='Enter Email' onChange={handlechange} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="gender">Gender</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="male" checked={user.gender == 'male' ? 'checked' : ''} onChange={handlechange} />
                                <label className="form-check-label" htmlFor="gender1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" value="female" checked={user.gender == 'female' ? 'checked' : ''} onChange={handlechange} />
                                <label className="form-check-label" htmlFor="gender2">
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="mobile">mobile</label>
                            <input type="number" className="form-control" name="mobile" value={user.mobile} placeholder='Enter Mobile' onChange={handlechange} required />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="aadhar">Aadhar Card</label>
                            <input type="number" className="form-control" name="aadhar" value={user.aadhar} placeholder='Enter Aadhar' onChange={handlechange} required />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label htmlFor="image">Photo</label>
                            <input type="file" accept='.jpg,.jpeg,.png' className="form-control" name="image" onChange={handleFile} />
                        </div>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>

            </div>
        </div>
    )
};

export default UpdateProfile;