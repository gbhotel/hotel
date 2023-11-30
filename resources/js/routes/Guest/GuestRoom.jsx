import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function GuestRoom() {

    const [guestRoom, setGuestRoom] = useState([]);

    useEffect(() => {
        fetch(`/api/guest/room`)
            .then(response => response.json())
            .then(data => {
                setGuestRoom(data);//data[0]
                 console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        }, [])

    console.log(guestRoom);

    return (
            <div className=" my-0 container row row-cols-1 row-cols-sm-2 row-cols-md-2 ">
                <div>
                    <h1 className="my-4">{guestRoom.guestName}</h1>
                    <h2 className="my-4">Комната №{guestRoom.roomNumber}</h2>
                    <p>Категория комнаты: {guestRoom.roomCategory}</p>
                    <p>Кровать: Три односпальные кровати</p>
                    <p>Кондиционер: Нет</p>
                    <p>Количество комнат: 2</p>
                    <p>Даты проживания: {guestRoom.dates}</p>
                    <p>Душ: В номере</p>
                    <p>Туалет: В номере</p>
                    <p>WiFi: Да</p>
                    <p>Количество взрослых: {guestRoom.adults}</p>
                    <p>Количество детей: {guestRoom.children}</p>
                    <p>Стоимость проживания за день: {guestRoom.price}</p>
                    {/*<p>Общая стоимость проживания: {guestRoom.totalCost} рублей</p>*/}
                </div>
            </div>
        )
                }
