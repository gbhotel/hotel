import React, { useEffect, useState, useRef } from 'react';
import FreeRooms from "../components/FreeRooms.jsx";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function test() {
    alert('Ok');
}

export default function EditBooking() {

    const id = useParams();

    //API:
    const urlBooking = `/api/admin/booking/get/${id.id}`;


    /**
     * useRefs для работы с формой
     * @type {React.MutableRefObject<undefined>}
     */

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const checkInRef = useRef();
    const checkOutRef = useRef();
    const roomIdRef = useRef();


    const [booking, setBooking] = useState({});
    const [room, setRoom] = useState({});
    const [images, setImages] = useState([]);
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [freeRooms, setFreeRooms] = useState([]);
    const [adultCount, setAdultCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);




    useEffect(() => {
        // const abortController = new AbortController();

        fetch(urlBooking, {
            //signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setBooking(data[0]);
                setRoom(data[1]);
                setImages(data[2].images);
                setCheckinDate(data[0].check_in);
                setCheckoutDate(data[0].check_out);
                console.log(data);

            })
            .catch(error => {
                console.log(error.message);
            });

        // return () => {
        //     //  abortController.abort();
        // }
    }, []);




    function goBack(event) {
        event.preventDefault();
        window.location.href = '/booking';
    }
    const handleSearchRooms = async () => {
        try {
            const requestData = {
                'people': {
                    adultCount,
                    childrenCount,
                },
                checkinDate,
                checkoutDate,
                _token,
            };

            const response = await fetch('/api/admin/free-rooms-period', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                // Обработка успешного ответа от сервера
                const data = await response.json();
                setFreeRooms(data);
                console.log(data);
            } else {
                // Обработка ошибки
                console.error('Ошибка при выполнении fetch-запроса');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    function newRoom(rm) {
        console.log(rm);
        let checkedRoom = {
            'number': rm.number,
            'category': rm.category,
            'max_guests': rm.max_guests,
            'price': rm.price,
        };
        setRoom(checkedRoom);
        setImages(JSON.parse(rm.images));
        let editedBooking = booking;
        editedBooking.room_id = rm.id;
        setBooking(editedBooking);

    }

    const saveEditedBooking = async () => {
        let requestData = {
            'id': booking.booking_number,
            'firstname': firstNameRef.current.value,
            'lastname': lastNameRef.current.value,
            'phone': phoneRef.current.value,
            'checkin_date': checkInRef.current.value,
            'checkout_date': checkOutRef.current.value,
            'guest_id': booking.guest_id,
            'user_id': booking.user_id,
            'room_id': booking.room_id,
            '_token': _token,
        }

        const response = await fetch('/api/admin/save-edited-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }).then(response => response.json())
            .then(data => {
                if (data['saved'] === 'OK')
                    window.location.href = '/booking';
                else alert('При сохранении данных произошла ошибка!');
            })
            .catch(error => {
                console.error(error);
            });;

    }

    return (
        <div className="width-1200 mx-4 mt-5 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <form>
                    <Container className="w-100 m-0">
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={12}>
                                <h3>Форма редактирования брони</h3>
                            </Col>
                        </Row>

                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="firstName" className="form-label">Имя</label>
                            </Col>
                            <Col xs={9}>
                                <input type="text" defaultValue={booking.guest_firstname} required className="form-control" id="firstName" aria-describedby="emailHelp" ref={firstNameRef} />
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="lastName" className="form-label">Фамилия</label>
                            </Col>
                            <Col xs={9}>
                                <input type="text" defaultValue={booking.guest_lastname} required className="form-control" id="lastName" ref={lastNameRef} />
                            </Col>
                        </Row>

                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="phone" className="form-label">Телефон</label>
                            </Col>
                            <Col xs={9}>
                                <input type="text" defaultValue={booking.guest_phone} required className="form-control" id="phone" ref={phoneRef} />

                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                Заезд:
                            </Col>
                            <Col xs={3}>
                                <input type="date" onChange={(e) => setCheckinDate(e.target.value)} required className="form-control" id="check_in_date" ref={checkInRef} defaultValue={booking.check_in} />
                            </Col>
                            <Col xs={6}>

                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                Выезд
                            </Col>
                            <Col xs={3}>
                                <input type="date" onChange={(e) => setCheckoutDate(e.target.value)} required className="form-control" id="check_out_date" ref={checkOutRef} defaultValue={booking.check_out} />
                            </Col>
                            <Col xs={6}>

                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                Номер:
                            </Col>
                            <Col xs={3}>
                                <div>
                                    <img src={"../../" + images[0]} alt="" className="photo-edit-booking" />

                                </div>
                            </Col>
                            <Col xs={3}>
                                <p><b>Номер: </b>{room.number} {room.category}</p>
                                <p><b>Цена: </b>{room.price}</p>
                                <p><b>Максимальное число гостей: </b>{room.max_guests}</p>
                            </Col>
                            <Col xs={3}>
                                <div className="mx-2 btn btn-primary" onClick={handleSearchRooms} >
                                    Поменять номер
                                </div>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>

                            </Col>
                            <Col xs={3}>

                            </Col>
                            <Col xs={3}>
                                <div className="mx-2 btn btn-primary" onClick={saveEditedBooking}>
                                    Сохранить данные
                                </div>
                            </Col>
                            <Col xs={3}>
                                <div onClick={goBack} className="mx-2 btn btn-primary">
                                    Назад к бронированиям
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </form>
            </div>
            <FreeRooms checkinDate={checkinDate} checkoutDate={checkoutDate} freeRooms={freeRooms} isEditing={true} callBack={newRoom}></FreeRooms>
        </div >

    );
}

