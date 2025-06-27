import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import customFunctions from '../custom/customFunctions';
import axios from 'axios';
import { ConfirmToast } from 'react-confirm-toast';
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";

const Subscriptions = () => {
    const token = customFunctions.get_token();
    const [subscriptions, setSubscriptions] = useState([]);
    const buttonAttributes = { disabled: false, 'aria-label': 'Custom Aria Label' };

    const [error, setError] = useState({
        server: ''
    });
    const [show, setShow] = useState(false);
    const config = {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const get_subscriptions = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_HOST + 'getSubscriptions', config);
            if (response.status === 200 && response.data.data.success) {
                setSubscriptions(response.data.data.data);
            }
            else {
                setError({
                    server: response.message
                });
            }
        } catch (error) {
            setError({
                server: error.message
            });
        }
    };
    const [selectedId, setSelectedId] = useState(null);
    const handeDelete = (id) => {
        setSelectedId(id);
        setShow(true);
    };

    const deleteSubscription = async (id) => {
        try {
            const res = await axios.delete(process.env.REACT_APP_SERVER_HOST + 'subscription/delete/' + id, config);
            if (res.status === 200 && res.data.data.success) {
                toast.success("Subscription deleted successfully");
                get_subscriptions();
            }
        } catch (error) {
            setError({
                server: error.message
            });
        }
    };

    // Functions for pagination.

    const itemperpage = 10;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemperpage;
    const currentItems = subscriptions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(subscriptions.length / itemperpage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemperpage) % subscriptions.length;
        setItemOffset(newOffset);
    };

    // end Code for pagination.


    useEffect(() => {
        document.title = 'Subscriptions';
        get_subscriptions();
    }, []);
    return (
        <div className="container bg-white rounded vh-100">
            <div className="row">
                <div className='col-md-12'>
                    <p className="h4">Subscriptions</p>
                    <ToastContainer transition={Slide} />
                    <ConfirmToast
                        asModal={true}
                        buttonYesText={'Confirm'}
                        buttonYesAttributes={buttonAttributes}
                        customFunction={() => deleteSubscription(selectedId)}
                        setShowConfirmToast={setShow}
                        showConfirmToast={show}
                        toastText='Do you want to delete this subscription ?'
                        theme={'snow'}
                    />

                    <Link to='/subscription/create' className='btn btn-primary float-right'> Add Subscription </Link>
                    {error.server && <span className='alert text-danger'>{error.server}</span>}
                </div>

                <div className='table-responsive mt-2'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">S No.</th>
                                <th scope="col">Subscription Months</th>
                                <th scope="col">Cost <span className='text-muted'>(in INR)</span></th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((subscription, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{subscription.subscription_months} months</td>
                                        <td>{subscription.amount_specify}.00</td>
                                        <td>
                                            <div className='col-sm-12'>
                                                <Link to={`/subscription/edit/${subscription.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                                                <button onClick={() => handeDelete(subscription.id)} className="btn btn-sm btn-danger ml-1">Delete</button>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                            {currentItems.length === 0 && <span className='alert text-danger text-center'>No Data Found</span>}

                        </tbody>
                    </table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName={"react-paginate"}
                    />
                </div>
            </div>
        </div>
    )
};
export default Subscriptions;