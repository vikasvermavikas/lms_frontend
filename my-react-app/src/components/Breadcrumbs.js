import {Link} from 'react-router-dom';

const Breadcrumbs = (props) => {
    const breadcrumb = {
        fontSize: '14px',
        fontWeight: 'bold',
        backgroundColor: 'white',
        border : '1px solid rgba(0, 0, 0, 0)'
    };
    const islast = (index) => {
        return index === props.crumbs.length - 1;
    };
    console.log(props.crumbs);
    return (
       
        <nav className="row justify-content-center mt-4">
            <ol className="breadcrumb" style={breadcrumb}>
                {
                    props.crumbs.map((crumb, index) => {
                        console.log(crumb[index]);
                        return (
                            <li className="breadcrumb-item align-items-center" key={index}>
                                <Link to={crumb[index]}>{index}</Link>
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    )

};

export default Breadcrumbs;