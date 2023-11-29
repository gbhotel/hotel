import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function GuestRoom() {

    const { id } = useParams();

    const [guestId, setGuestId] = useState([]);
    const [checkInDate, setCheckInDate] = useState(''); //дата заселения
    const [checkOutDate, setCheckOutDate] = useState('');//дата выселения
    const [countGuests, setCountGuests] = useState(0); //общее количество гостей
    const [totalCost, setTotalCost] = useState(0); //общая стоимость за всех гостей и все дни
    const [showRoom, setShowRoom] = useState(false); //инфа о комнате



    // useEffect(() => {
    //     fetch(`/api/guest/room/${id}/get-room`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setData(data[0]);
    //             console.error(data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, [])


    return (
        <>
            <h1>Страница гостя</h1>

            {/*<h1 className="text-center my-4">Комната №{data.roomNumber}</h1>*/}
            {/*<div className=" my-0 container row row-cols-1 row-cols-sm-2 row-cols-md-2 ">*/}
            {/*    <div className="text-center">*/}
            {/*        <h3>О Комнате</h3>*/}
            {/*        <p>Статус комнаты: {data.status}</p>*/}
            {/*        <p>Категория комнаты: {data.category}</p>*/}
            {/*        <p>Кровать: {data.bed}</p>*/}
            {/*        <p>Кондиционер: {data.conditioner}</p>*/}
            {/*        <p>Количество комнат: {data.roomsNumber}</p>*/}
            {/*        <p>Душь: {data.shower}</p>*/}
            {/*        <p>Туалет: {data.toilet}</p>*/}
            {/*        <p>WiFi: {data.wifi}</p>*/}

            {/*        <h3>О госте</h3>*/}
            {/*        <p>ID: {data.guestsId}</p>*/}
            {/*        <p>Имя: {data.guestsFirstName}</p>*/}
            {/*        <p>Фамилия: {data.guestsLastName}</p>*/}
            {/*        <p>Телефон: {data.guestsPhone}</p>*/}
            {/*        <p>Email: {data.guestsEmail}</p>*/}
            {/*        <p>№ паспорта: {data.guestsPassport}</p>*/}
            {/*    </div>*/}

            {/*    <div className="text-center">*/}
            {/*        <h3>О брони</h3>*/}
            {/*        <p>ID брони: {data.bookingId}</p>*/}
            {/*        <p>Дата начала брони: {data.bookingCheckIn}</p>*/}
            {/*        <p>Дата окончания брони: {data.bookingCheckOut}</p>*/}
            {/*        <h5>Сотрудник создавшийи бронь</h5>*/}
            {/*        <p>ID сотрудника: {data.staffIdB}</p>*/}
            {/*        <p>Имя: {data.staffFirstNameB}</p>*/}
            {/*        <p>Фамилия: {data.staffLastNameB}</p>*/}
            {/*        <p>Телефон: {data.staffPhoneB}</p>*/}
            {/*        <p>Email: {data.staffEmailB}</p>*/}
            {/*        <p>Должность: {data.staffPositionB}</p>*/}
            {/*        <p>№ паспорта: {data.staffPassportB}</p>*/}
            {/*        <p>Трудоустроен с {data.staffEmploymentDateB}</p>*/}

            {/*        <h3>О заселении</h3>*/}
            {/*        <p>ID заселения: {data.checkId}</p>*/}
            {/*        <p>Дата заселения: {data.checkCheckIn}</p>*/}
            {/*        <p>Дата выселения: {data.checkCheckOut}</p>*/}
            {/*        <h5>Сотрудник создавшийи заселение</h5>*/}
            {/*        <p>ID сотрудника: {data.staffIdCh}</p>*/}
            {/*        <p>Имя: {data.staffFirstNameCh}</p>*/}
            {/*        <p>Фамилия: {data.staffLastNameCh}</p>*/}
            {/*        <p>Телефон: {data.staffPhoneCh}</p>*/}
            {/*        <p>Email: {data.staffEmailCh}</p>*/}
            {/*        <p>Должность: {data.staffPositionCh}</p>*/}
            {/*        <p>№ паспорта: {data.staffPassportCh}</p>*/}
            {/*        <p>Трудоустроен с {data.staffEmploymentDateCh}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {showRoom && (
                <div className="room-info-container mt-5">
                    <div className="room-info">
                        <h3 className="text-purple">Категория номера</h3>
                        <p className="uppercase text-bold" >"{selectedTask.room_category}"</p>
                        <h3 className="text-purple">Принадлежности</h3>
                        <ul className="d-flex flex-column justify-content-start">
                            {
                                Object.keys(sets).map(key => (
                                    <li className=" li-task d-flex m-0" key={key}>
                                        {key}: {sets[key]} шт.
                                    </li>
                                ))
                            }
                        </ul>
                        <h3 className="text-purple">Пожелания гостей</h3>
                        <p>{selectedTask.comment}</p>
                    </div>
                </div>
            )}
        </>
    )
}
