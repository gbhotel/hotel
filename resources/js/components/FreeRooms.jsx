import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export default function FreeRooms(props) {
    const {checkinDate, checkoutDate, freeRooms} = props;

    console.log(checkinDate, checkoutDate);

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedRoomComfort, setSelectedRoomComfort] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bookingNumber, setBookingNumber] =useState('');

    const [bookingData, setBookingData] = useState({
        checkinDate: "",
        checkoutDate: "",
        id_room: null,
        first_name: "",
        last_name: "",
        phone: ""
    });

    useEffect(() => {
        setBookingData(prevState => ({
            ...prevState,
            checkinDate: checkinDate,
            checkoutDate:checkoutDate,
        }));
    }, [checkinDate, checkoutDate]);

    const handleBookingDataChange = (e) => {
        const {name, value} = e.target;
        setBookingData(prevState => ({...prevState, [name]: value}))
    }

    const handleBookingSubmit = async () => {

            const response = await fetch('/api/admin/room/book-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...bookingData,
                    id_room: selectedRoom.id,
                    checkinDate: checkinDate,
                    checkoutDate: checkoutDate,
                }),
            });

            if (response.ok) {
                // Обработка успешного ответа от сервера
                const data = await response.json();
                setBookingNumber(data);
                console.log(data);
            } else {
                // Обработка ошибки
                console.log(response.body)
                console.error('Ошибка при выполнении fetch-запроса');
            }

            setIsBooking(false);
            setSuccess(true);


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

        return (
            <div className= 'my-4 container row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3' >
                {freeRooms.map((freeRoom,index)=>(
                    <div key={index} className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                                 preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                                <text  className="font-22" x="50%" y="50%" fill="#eceeef" dy=".3em" textAnchor="middle" dominantBaseline="middle">
                                    {freeRoom.category}
                                </text>
                            </svg>

                            <div className=" d-flex justify-content-between card-body">

                                <button
                                    className="btn blue-color rounded-pill px-3"
                                    type="button"
                                    onClick={() => {
                                        setIsBooking(true)
                                        setSelectedRoom(freeRoom)}}
                                >Забронировать
                                </button>

                                <div className="d-flex justify-content-between  align-items-center">
                                    <div
                                        className=" mr-5 text-decoration-none text-dark "
                                        onClick={() => openModal(freeRoom)}
                                    > Подробнее...
                                    </div>
                                    <div className="btn-group">
                                        {/*<button type="button" className="btn btn-sm btn-outline-secondary">booking</button>*/}
                                        {/*<button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isModalOpen && selectedRoom && (
                    <div className="modal" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Подробная информация о комнате</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p className="font-22">Номер: {selectedRoom.number}</p>
                                    <p className="font-22">Категория: {selectedRoom.category}</p>
                                    {
                                        Object.keys(selectedRoomComfort).map(key => (
                                            <div className="font-22" key={key}>
                                                {key}: {selectedRoomComfort[key]}
                                            </div>
                                        ))
                                    }
                                    {/*<p>Номер: {selectedRoom.comfort}</p>*/}
                                    {/* Другие данные о комнате */}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                    >
                                        Закрыть
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
                                            onChange={ handleBookingDataChange}
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

                {success && (
                    <div  className="modal" style={{ display: "block" }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content rounded-3 shadow">
                                <div className="modal-body p-4 text-center">
                                    <h3 className="mb-0">Ваша бронь успешно добавлена</h3>
                                    <p className="mb-0">Номер брони: {bookingNumber.bookingId} </p>

                                </div>
                                <div className="modal-footer flex-nowrap p-0">
                                    <button type="button"
                                            className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
                                            onClick={() => setSuccess(false)}
                                    >
                                        <strong>Закрыть</strong></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>)
}

