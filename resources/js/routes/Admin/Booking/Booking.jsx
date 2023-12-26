import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";
import FilterBookingId from "./FilterBookingId.jsx";
import FilterBookingDate from "./FilterBookingDate.jsx";
import {createOptions} from "../../../services/requestFunction.js";
import {request} from "../../../services/requestFunction.js";
import AllBooking from "./AllBooking";
import FilteredBooking from "./FilteredBooking.jsx";

export default function Booking() {

    let currentDate = new Date();
    const [booking, setBooking] = useState([]);
    const [filteredBooking, setFilteredBooking] = useState([]);

    useEffect(() => {
        // const abortController = new AbortController();
        request('/api/admin/booking')
            .then(data => {setBooking(data)})
            .catch(error => {
                console.error(error);
            });
    }, []);

    const filterByBookingId = (e) => {
        setFilteredBooking(booking.filter((item) => item.booking_number === parseInt(e.target.value)));
    }

    const filterByBookingDate = (date) => {

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFilteredBooking(booking.filter((item) => item.check_in === formattedDate));
    };

    const deleteBooking = (booking_id) => {

        if (confirm('Вы уверены, что хотите удалить бронь №' + booking_id + '?'))

                request(`/api/admin/booking/${booking_id}/delete`, createOptions('DELETE'))
                .then((data) => {
                    if (data['delete'] === 'OK') {
                        let d_booking = booking.filter(value => value.booking_number !== booking_id)
                        setBooking(d_booking);
                    }
                    else
                        console.log('Ошибка удаления брони');
                })
                .catch((error) => {
                    console.error(error);
                });
    }

    return (
        <>
            <div className=" ml-40px mt-5 col-7">
                <div className=" d-flex justify-content-between align-items-center m-3">
                    <h3>Брони</h3>
                    <button type="button" className="btn p-2 btn-add btn-sm uppercase text-black btn-sm">
                        <Link to="/addBooking" className="link text-decoration-none text-black">
                            Добавить бронь
                        </Link>
                    </button>
                </div>
                <div className="d-flex mb-3">
                    <FilterBookingId filterByBookingId={filterByBookingId}/>
                    <FilterBookingDate currentDate={currentDate} filterByBookingDate={filterByBookingDate}/>
                </div>
                <div
                    className="row p-4 border rounded overflow-hidden">
                    <Row className=" uppercase align-items-center">
                        <Col className="my-3" lg={1} xs={1}>
                            <b>бронь</b>
                        </Col>
                        <Col className="my-3" lg={1} xs={1}>
                            <b>номер</b>
                        </Col>
                        <Col className="my-3" lg={2} xs={1}>
                            <b>Гость</b>
                        </Col>
                        <Col className="my-3" lg={2} xs={1}>
                            <b>Телефон</b>
                        </Col>
                        <Col className="my-3" lg={2} xs={1}>
                            <b>дата заезда</b>
                        </Col>
                        <Col className="my-3" lg={2} xs={1}>
                            <b>дата выезда</b>
                        </Col>

                        <Col className="my-3 flex-grow-1" lg={2} xs={1}>
                            <b></b>
                        </Col>
                    </Row>
                    {
                        filteredBooking.length === 0 ?
                            <AllBooking booking = {booking} deleteBooking = {deleteBooking}/>
                             :
                            <FilteredBooking filteredBooking = {filteredBooking} deleteBooking = {deleteBooking}/>
                    }
                </div>
            </div>
        </>
    )
}

