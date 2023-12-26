import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";

export default function CheckInWithBooking(props) {
    const { callBackFunc } = props;
    const convertDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const [booking, setBooking] = useState([]);
    const [filteredBooking, setFilteredBooking] = useState([]);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isCheckIn, setIsCheckIn] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [checkInBookingNumber, setCheckInBookingNumber] = useState(0);
    //const [checkInTime, setCheckInTime] = useState('');

    const allTime = useRef(false);
    const bookingNumber = useRef(0);
    const checkInDateString = useRef(convertDate(new Date()));
    const currentDateString = useRef(convertDate(new Date()));
    const checkInTime = useRef('');




    document.getElementById('auth').innerHTML = '';
    useEffect(() => {
        const abortController = new AbortController();

        fetch('/api/admin/nocheckin/booking', {
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
                filterToday(data);
                setCheckInDate(null);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    const getTimeString = (date) => {
        const hours = (date.getHours()).toString().padStart(2, '0');
        const mins = (date.getMinutes()).toString().padStart(2, '0');
        checkInTime.current = hours + ':' + mins + ':00';
        return hours + ':' + mins + ':00';
    }

    const timeChange = (e) => {
        checkInTime.current = e.target.value + ':00';
    }

    const filter = () => {
        console.log(allTime.current);
        console.log(bookingNumber.current);
        let filteredBooking = booking;
        if (!allTime.current)
            filteredBooking = filteredBooking.filter((item) => item.check_in === checkInDateString.current);
        if (bookingNumber.current > 0)
            filteredBooking = filteredBooking.filter((item) => item.booking_number == bookingNumber.current);
        setFilteredBooking(filteredBooking);
    }

    const filterByBookingNumber = (e) => {
        bookingNumber.current = e.target.value;
        filter();
    }

    const filterByBookingDate = (e) => {
        let date = e.target.value;
        checkInDateString.current = date;
        filter();
    };

    const filterToday = (data) => {
        let date = convertDate(new Date);
        let filteredBooking = data.filter((item) => item.check_in === date);
        setFilteredBooking(filteredBooking);
    }



    const filterAllTime = (e) => {
        allTime.current = e.target.checked;
        console.log(e.target.checked);
        filter();
    }

    const buttonStyle = (date) => {
        if (date == currentDateString.current) return 'bright-green-button';
        return 'innactive-check-in';
    }
    const buttonActive = (date) => {
        return !(date == currentDateString.current);
    }

    const checkIn = (booking_number) => {
        setCheckInBookingNumber(booking_number);
        setIsCheckIn(true);
    }

    const canselCheckIn = () => {
        setIsCheckIn(false);
    }

    const adultsValue = (e) => {
        setAdults(e.target.value)
    }

    const childrenValue = (e) => {
        setChildren(e.target.value)
    }

    const editBooking = (id) => {
        callBackFunc(3, id);
    }

    const saveCheckIn = () => {
        const requestData = {
            _token,
            checkInBookingNumber,
            adults,
            children,
            'checkInTime': checkInTime.current,
        };
        fetch(`/api/admin/checkin/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then((data) => {
                if (data['status'] === 'OK') {
                    setIsCheckIn(false);
                    callBackFunc(0);
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
            <div className=" ml-40px flex-grow-0_1 mt-5 col-10 col-lg-10">
                <div className=" d-flex justify-content-between align-items-center m-3 text-center">
                    <h3>Брони</h3>
                </div>
                <div className="d-flex mb-3">
                    <input
                        className="gray-input"
                        placeholder="Номер брони"
                        onChange={(e) => filterByBookingNumber(e)}
                    />
                    {/* <DatePicker
                        name="birthday"
                        selected={checkInDate}
                        onChange={filterByBookingDate}
                        placeholderText="Дата заезда"
                        className="col-9 gray-input"
                        calendarClassName="purple-datepicker"
                    /> */}
                    <input
                        type="date"
                        defaultValue={convertDate(new Date)}
                        onChange={filterByBookingDate}
                        className="gray-input"
                        placeholder="Номер брони"
                    />
                    <div className="gray-input">
                        <input
                            className="mr-5"
                            type="checkbox"
                            onClick={(e) => filterAllTime(e)}
                        />
                        Показать за все время

                    </div>

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
                        filteredBooking.map((item, index) => (
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
                                        className={"btn btn-sm uppercase " + buttonStyle(item.check_in)}
                                        onClick={() => checkIn(item.booking_number)}
                                        disabled={buttonActive(item.check_in)}
                                    >Заселить
                                    </button>
                                    <button type="button"
                                        className="btn btn-sm uppercase bright-orange-button"
                                        onClick={() => editBooking(item.booking_number)}
                                    >Изменить
                                    </button>
                                </Col>
                            </Row>
                        ))

                    }
                    {
                        isCheckIn && (
                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Количество гостей</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={canselCheckIn}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="typeNumber">
                                                    Взрослые:
                                                </label>
                                                <input
                                                    type="number"
                                                    id="typeNumber"
                                                    className="form-control"
                                                    min="0"
                                                    max="10"
                                                    defaultValue={adults}
                                                    onChange={(e) => adultsValue(e)}
                                                />
                                            </div>
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="typeNumber">
                                                    Дети:
                                                </label>
                                                <input
                                                    type="number"
                                                    id="typeNumber"
                                                    className="form-control"
                                                    min="0"
                                                    max="10"
                                                    defaultValue={children}
                                                    onChange={(e) => childrenValue(e)}
                                                />
                                            </div>
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="typeDateTime">
                                                    Время заселения:
                                                </label>
                                                <input
                                                    type="time"
                                                    id="typeDateTime"
                                                    className="form-control"
                                                    defaultValue={getTimeString(new Date())}
                                                    onChange={(e) => timeChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={saveCheckIn}
                                            >Заселить
                                            </button>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={canselCheckIn}>Закрыть</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}