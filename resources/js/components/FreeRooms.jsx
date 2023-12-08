import React, { useEffect, useRef, useState } from 'react';
import star from "../../img/star3.svg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';
import star_full from '../../img/star-full.svg';
import { useNavigate } from "react-router-dom";

export default function FreeRooms(props) {

    const navigate = useNavigate();

    const { checkinDate, checkoutDate, freeRooms, isEditing, callBack, isCheckInWithoutBooking, saveCheckIn } = props;
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedRoomComfort, setSelectedRoomComfort] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [response, setResponce] = useState(false);
    const [bookingNumber, setBookingNumber] = useState('');

    const [bookingData, setBookingData] = useState({
        checkinDate: "",
        checkoutDate: "",
        id_room: null,
        first_name: "",
        last_name: "",
        phone: ""
    });


    const [isDragging, setIsDragging] = useState(false);
    const modalRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const offsetX = e.clientX - modalRef.current.getBoundingClientRect().left;
        const offsetY = e.clientY - modalRef.current.getBoundingClientRect().top;
        setPosition({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const x = e.clientX - position.x;
            const y = e.clientY - position.y;
            modalRef.current.style.left = `${x}px`;
            modalRef.current.style.top = `${y}px`;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    useEffect(() => {
        setBookingData(prevState => ({
            ...prevState,
            checkinDate: checkinDate,
            checkoutDate: checkoutDate,
        }));
    }, [checkinDate, checkoutDate]);

    const handleBookingDataChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleBookingSubmit = async () => {

        const response = await fetch('/api/admin/room/book-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': _token,
            },
            body: JSON.stringify({
                ...bookingData,
                _token: _token,
                id_room: selectedRoom.id,
                checkinDate: checkinDate,
                checkoutDate: checkoutDate,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setBookingNumber(data);
            console.log(data);
        } else {
            // Обработка ошибки
            console.log(response.body)
            console.error('Ошибка при выполнении fetch-запроса');
        }

        setIsBooking(false);
        if (isCheckInWithoutBooking)
            saveCheckIn();
        else
            setResponce(true);
    }


    const openModal = (room) => {
        setSelectedRoom(room);
        setSelectedRoomComfort(JSON.parse(room.comfort));
        setModalOpen(true);

    };

    const closeModal = () => {
        setSelectedRoom(null);
        setSelectedRoomComfort(null);
        setModalOpen(false);
    };

    const showBookingForm = () => {
        setIsBooking(true);
        setModalOpen(false);
    }

    const closeBookingResponse = () => {
        setResponce(false);
        onUpdateFreeRooms();

    }

    const checkEditing = (room) => {
        if (!isEditing)
            showBookingForm();

        else {
            callBack(room);
            setModalOpen(false);
        }

    }

    return (<div className='my-4 justify-content-center container d-flex flex-wrap gap-5' >
        {freeRooms.map((freeRoom, index) => (
            <div
                key={index}
                className="card-room"
                onClick={() => openModal(freeRoom)}
            >
                <img alt="photo"
                    src={"../../" + JSON.parse(freeRoom.images)[0]}
                    className="photo-size"
                />
                <div className=" d-flex p-3 flex-column justify-content-between card-body">
                    <div className="d-flex justify-content-between">
                        <p>№{freeRoom.number} {freeRoom.category}</p>
                        <p>{freeRoom.price} руб. в сутки</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <img alt="star" src={star} />
                            <img alt="star" src={star} />
                            <img alt="star" src={star} />
                            <img alt="star" src={star} />
                            <img alt="star" src={star} />
                        </div>
                        <p>0 отзывов</p>
                    </div>
                </div>
            </div>
        ))}
        {isModalOpen && selectedRoom && (
            <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog " >
                    <div className="modal-content" style={{ width: '700px' }}>
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className="slide-container">
                            <Fade>
                                {JSON.parse(selectedRoom["images"]).map((image, index) => (
                                    <div key={index}>
                                        <img alt="photo" style={{ width: '100%' }} src={'../../' + image} />
                                    </div>
                                ))}
                            </Fade>
                        </div>
                        <div className="modal-body d-flex flex-column">
                            <h2 className="text-bold" >Сведения о номере</h2>
                            <div className="mb-1 d-flex gap-5 justify-content-between">
                                <div className="d-flex flex-column">
                                    <h5>Комфорт</h5>
                                    <div className="ml-5">
                                        <div className="text-gray">{selectedRoomComfort.wifi === 'Да' ? 'WIFI' : 'NO WIFI'}</div>
                                        <div className="text-gray">{selectedRoomComfort.conditioner === 'Да' ? 'conditioner' : 'no conditioner'}</div>
                                    </div>
                                    <hr />
                                    <h5>Удобства</h5>
                                    <div>
                                        <div className="text-gray">{selectedRoomComfort.bed}</div>
                                        <div className="text-gray"> Туалет {selectedRoomComfort.toilet}</div>
                                        <div className="text-gray"> Душ {selectedRoomComfort.shower}</div>
                                    </div>
                                    <hr />
                                    <h5>Количество проживающих</h5>
                                    <div className="text-gray">{selectedRoom.max_guests}</div>
                                </div>
                                <div className="d-flex mx-5 flex-column">
                                    <h5>Общая оценка: 5 из 5</h5>
                                    <div>
                                        <img alt="star" src={star_full}></img>
                                        <img alt="star" src={star_full}></img>
                                        <img alt="star" src={star_full}></img>
                                        <img alt="star" src={star_full}></img>
                                        <img alt="star" src={star_full}></img>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="btn w-25 align-self-end btn-task rounded-pill px-3"
                                type="button"
                                onClick={() => checkEditing(selectedRoom)}
                            >Забронировать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {isBooking && (
            <div className="modal" style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Форма бронирования</h5>
                            <button type="button" className="btn-close" onClick={() => setIsBooking(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="firstName">Имя:</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="first_name"
                                    onChange={handleBookingDataChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Фамилия:</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="last_name"
                                    onChange={handleBookingDataChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Телефон:</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phone"
                                    onChange={handleBookingDataChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsBooking(false)}
                            >
                                Отмена
                            </button>
                            <button
                                type="button" className="btn btn-primary"
                                onClick={handleBookingSubmit}
                            >
                                Забронировать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {response && (
            <div className="modal" style={{ display: "block" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-3 shadow">
                        <div className="modal-body p-4 text-center">
                            <h3 className="mb-0">Ваша бронь успешно добавлена</h3>
                            <p className="mb-0">Номер брони: {bookingNumber.bookingId} </p>

                        </div>
                        <div className="modal-footer flex-nowrap p-0">
                            <button type="button"
                                className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
                                onClick={() => setResponce(false)}
                            >
                                <strong>Закрыть</strong></button>
                        </div>
                    </div>
                </div>
            </div>
        )}

    </div>)
}

