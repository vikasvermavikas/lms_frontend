import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate} from "react-router-dom";

const Qrsearch = (props) => {
    const [data, setData] = useState('No result');
    const navigate = useNavigate();

    const afterscan = (result, error) => {
        if (!!result) {
            // setData();
            navigate(result?.text);
        }

        if (!!error) {
            console.info(error);
        }
    };
    return (
        <div className='container bg-white w-50'>
            <QrReader
                className=''
                onResult={afterscan}
            />
            {/* <p>{data}</p> */}
        </div>
    )
};

export default Qrsearch;