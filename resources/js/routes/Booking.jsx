import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Booking() {

    const [booking, setBooking] = useState([]);

    document.getElementById('auth').innerHTML = '';

    useEffect(() => {
        const abortController = new AbortController();

        fetch('/api/admin/booking', {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setBooking(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);
    return (
        <>
            <div className="d-flex flex-column container">
                <div className="d-flex mt-5 justify-content-between">
                    <h1 className="h2">Брони</h1>
                    <div className="btn-toolbar mr-5 mb-2 mb-md-0">
                        <button type="button" className="btn  btn-sm btn-outline-secondary">
                            <Link to="/addBooking" className="  text-decoration-none text-dark "> Добавить бронь </Link>
                        </button>
                    </div>
                </div>
                <div className="my-5 container justify-content-center">
                <div className="  table-responsive">
                    <table className=" no-border table table-striped table-sm">
                        <thead className="no-border">
                        <tr className="no-border">
                            <th scope="col">Номер брони</th>
                            <th scope="col">Номер комнаты</th>
                            <th scope="col">На кого бронь</th>
                            <th scope="col">Телефон</th>
                            <th scope="col">дата заезда</th>
                            <th scope="col">дата выезда</th>
                            <th scope="col">Кто забронировал</th>
                            {/*<th scope="col"></th>*/}
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            booking.map((item, index) => (

                                <tr key={index}>
                                    <td>{item.booking_number}</td>
                                    <td>{item.room_number}</td>
                                    <td>{item.guest_name}</td>
                                    <td>{item.guest_phone}</td>
                                    <td>{item.check_in}</td>
                                    <td>{item.check_out}</td>
                                    <td>{item.admin_name}</td>
                                    <td className="btn-group me-2">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Редактировать</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Удалить</button>
                                    </td>
                                </tr>

                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>

        </>
    )
}
