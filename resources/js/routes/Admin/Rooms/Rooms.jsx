import {useEffect, useState} from "react";
import StatusBtn from "../../../components/Status.jsx";
import {Link} from "react-router-dom";

export default function Rooms() {
    document.getElementById('auth').innerHTML = '';
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/admin/rooms')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])


    return (
        <>
            <div className=" my-4 container row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {data.map((item, index) => (
                    <div key={index} className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                                xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                                preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em"></text>
                            </svg>

                            <div className="card-body">
                                <p className="card-text">Room number: {item.id}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <Link to={`/room/${item.id}`} className=" mr-5 text-decoration-none text-dark "> Подробнее... </Link>
                                        {/*<button type="button" className="btn btn-sm btn-outline-secondary">booking</button>*/}
                                        {/*<button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>*/}
                                    </div>
                                    <StatusBtn status={item.status} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </> )
}
