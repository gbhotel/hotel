import React from 'react';
import StatusBtn from "@/components/Status.jsx";
import {isVisible} from "bootstrap/js/src/util/index.js";

export default function FreeRooms(props) {
    const {freeRooms} = props;

    if (isVisible) {
        return <div className= 'my-4 container row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3' >
            {freeRooms.map((freeRoom,index)=>(
                <div key={index} className="col">
                    <div className="card shadow-sm">
                        <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#55595c"></rect>
                            <text  className="font-22" x="50%" y="50%" fill="#eceeef" dy=".3em" textAnchor="middle" dominantBaseline="middle">
                                № {freeRoom.number}
                            </text>
                        </svg>

                        <div className="card-body">
                            {/*<p className="card-text">Номер комнаты: {freeRoom.number}</p>*/}
                            <button className="btn blue-color rounded-pill px-3" type="button">{freeRoom.category}</button>
                            {/*<p className="card-text">Категория комнаты: </p>*/}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    {/*<button type="button" className="btn btn-sm btn-outline-secondary">booking</button>*/}
                                    {/*<button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    }
}

