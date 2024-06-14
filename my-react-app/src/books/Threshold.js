import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Slide } from "react-toastify";

const Threshold = () => {
    const token = localStorage.getItem('TOKEN');
    const inputthreshold = useRef(null);
    const [inputenable, setInputenable] = useState(false);
    const [error, setError] = useState({
        server: '',
        threshold: '',
    });
    const [data, setData] = useState({
        threshold: ''
    });
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`,
        }
    };
    const getThreshold = () => {
        axios.get(process.env.REACT_APP_SERVER_HOST+'books/getthreshold', config)
            .then((response) => {
                if (response.status === 200 && response.data) {
                    if (response.data.length > 0) {
                        setData({ ...data, threshold: response.data[0].threshold_percentage });
                    }
                    else {
                        setData({ ...data, threshold: 30 });
                    }

                }
            })
            .catch((error) => {
                setError(
                    {
                        server: error
                    }
                );
            });
    };
    const enableEdit = () => {
        setInputenable(true);
        inputthreshold.current.disabled = false;
        inputthreshold.current.focus();
    };
    const handleinput = (e) => {
        setData({ ...data, threshold: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_HOST+'books/updateThreshold', data, config)
            .then((response) => {
                if (response.status === 200 && response.data) {
                    toast.success("Threshold updated successfully");
                    setInputenable(false);
                    inputthreshold.current.disabled = true;
                    inputthreshold.current.blur();
                }
            })
            .catch((error) => {
                setError(
                    {
                        server: error
                    }
                );
            });

    };
    const handleBlur = (e) => {
        setInputenable(false);
        inputthreshold.current.disabled = true;
        inputthreshold.current.blur();
    };
    const cancelSubmit = (e) => {
        setInputenable(false);
        inputthreshold.current.disabled = true;
        inputthreshold.current.blur();
    };
    useEffect(() => {
        inputthreshold.current.disabled = true;
        getThreshold();
    }, []);
    return (
        <div className="container bg-white vh-100 rounded justify-content-center align-items-center">
            <h2>Setup Threshold</h2>
            <ToastContainer transition={Slide} />
            <div className="row">
                <form className="form-inline mt-4" onSubmit={handleSubmit}>
                    <div className="form-group mx-sm-3 mb-2 col-md-8">
                        <label htmlFor="threshold" className="mr-2">Threshold <small className="text-muted  ">(In Percentage)</small></label>
                        <input type="number" ref={inputthreshold} name="threshold" value={data.threshold} className="form-control" onChange={handleinput} required />
                        {inputenable ? (
                            <><button className='btn btn-primary ml-1' type="submit">Save</button> <span className='btn btn-danger ml-1' onClick={cancelSubmit}>Cancel</span></>
                        ) : (<svg onClick={enableEdit} xmlns="http://www.w3.org/2000/svg" role="button" className="pe-auto" x="0px" y="0px" width="20" height="20" title="edit" viewBox="0 0 24 24">
                            <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
                        </svg>)}

                    </div>
                </form>
            </div>
        </div>
    )
};
export default Threshold;