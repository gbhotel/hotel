import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";

export default function Booking() {

    const [booking, setBooking] = useState([]);
    const [filteredBooking, setFilteredBooking] = useState([]);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkInDateString, setCheckInDateString] = useState('');

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
                setCheckInDate(null);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    const filterByBookingNumber = (e) => {
        console.log(e.target.value);
        let filteredBooking = booking.filter((item) => item.booking_number === parseInt(e.target.value));
        console.log(filteredBooking);
        setFilteredBooking(filteredBooking);
    }

    const filterByBookingDate = (date) => {
        setCheckInDate(date);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1, так как месяцы в JavaScript начинаются с 0
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);

        setCheckInDateString(formattedDate);

        let filteredBooking = booking.filter((item) => item.check_in === formattedDate);

        setFilteredBooking(filteredBooking);

        console.log(filteredBooking);

    };
    const editBooking = (booking_id) => {
        window.location.href = '/editBooking/' + booking_id;
    }

    const deleteBooking = (booking_id) => {
        //console.log(booking_id);
        let _method = 'DELETE';
        const requestData = {
            _method,
            _token,
        };
        //console.log(JSON.stringify(requestData));
        if (confirm('Вы уверены, что хотите удалить бронь №' + booking_id + '?'))
            fetch(`/api/admin/booking/${booking_id}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
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
            <div className=" ml-40px flex-grow-0_1 mt-5 col-7 col-md-7">
                <div className=" d-flex justify-content-between align-items-center m-3 text-center">
                    <h3>Брони</h3>
                    <button type="button" className="btn p-2 btn-add btn-sm uppercase text-black btn-sm">
                        <Link to="/addBooking" className="  link text-decoration-none text-black"> Добавить
                            бронь </Link>
                    </button>
                </div>
                <div className="d-flex mb-3">
                    <input
                        className="gray-input"
                        placeholder="Номер брони"
                        onChange={(e) => filterByBookingNumber(e)}
                    />
                    <DatePicker
                        name="birthday"
                        selected={checkInDate}
                        onChange={filterByBookingDate}
                        placeholderText="Дата заезда"
                        className="col-9 gray-input"
                        calendarClassName="purple-datepicker"
                    />
                </div>
                <div
                    className="row g-0 p-4 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
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
                            (booking.map((item, index) => (
                                <Row key={index} className="align-items-center border-top">
                                    <Col className="my-3" lg={1} xs={1}>
                                        {item.booking_number}
                                    </Col>
                                    <Col className="my-3" lg={1} xs={1}>
                                        {item.room_number}
                                    </Col>
                                    <Col className="my-3" lg={2} xs={2}>
                                        {item.guest_name}
                                    </Col>
                                    <Col className="my-3" lg={2} xs={2}>
                                        {item.guest_phone}
                                    </Col>
                                    <Col className="my-3" lg={2} xs={1}>
                                        {item.check_in}
                                    </Col>
                                    <Col className="my-3" lg={2} xs={1}>
                                        {item.check_out}
                                    </Col>
                                    <Col className="my-3 flex-grow-1 d-flex justify-content-center" lg={2}
                                        xs={2}>
                                        <button type="button"
                                            className="btn  btn-sm uppercase bright-green-button"
                                            onClick={() => editBooking(item.booking_number)}
                                        >Редактировать
                                        </button>
                                        <button type="button"
                                            className="btn btn-sm uppercase bright-red-button"
                                            onClick={() => deleteBooking(item.booking_number)}
                                        >Удалить
                                        </button>
                                    </Col>
                                </Row>
                            ))
                            ) :
                            (filteredBooking.map((item, index) => (
                                <Row key={index} className="align-items-center border-top">
                                    <Col className="my-3" lg={1} xs={1}>
                                        {item.booking_number}
                                    </Col>
                                    <Col className="my-3" lg={1} xs={1}>
                                        {item.room_number}
                                    </Col>
                                    <Col className="my-3" lg={2} xs={2}>
                                        {item.guest_name}
                                    </Col>
                                    <Col className="my-3" lg={2} xs={2}>
                                        {item.guest_phone}
                                    </Col>
                                    <Col className="my-3" lg={2} xs={1}>
                                        {item.check_in}
                                    </Col>
                                    <Col className="my-3" lg={2} xs={1}>
                                        {item.check_out}
                                    </Col>
                                    <Col className="my-3 flex-grow-1 d-flex justify-content-center" lg={2}
                                        xs={2}>
                                        <button type="button"
                                            className="btn  btn-sm uppercase bright-green-button"
                                            onClick={() => editBooking(item.booking_number)}
                                        >Редактировать
                                        </button>
                                        <button type="button"
                                            className="btn btn-sm uppercase bright-red-button"
                                            onClick={() => deleteBooking(item.booking_number)}
                                        >Удалить
                                        </button>
                                    </Col>
                                </Row>
                            ))
                            )
                    }

                </div>
            </div>
        </>
    )
}

