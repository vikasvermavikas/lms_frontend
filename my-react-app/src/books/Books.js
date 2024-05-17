import {Link} from 'react-router-dom';

const Books = () => {
return (
    <div className="container-fluid">
             <div className="row">
                    <div className="col-md-12">
                        <h2>
                            Books List
                        </h2>
                        <div className="d-flex justify-content-end">
                            <Link to="/book/create" className="btn btn-success">Add +</Link>
                        </div>
                    </div>
                    
                    <div className="col-md-12">
                        <form >
                            <div className="form-group d-flex w-50">
                                <input className="form-control" type="text" value="" name='search' placeholder="Search"
                                    required />
                                <button type="submit" className="btn btn-primary ms-2">Search</button>
                                <button  className="btn btn-danger ms-2">Clear</button>
                            </div>
                        </form>
                    </div>
                </div>
    </div>
)
};

export default Books;