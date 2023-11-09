import React, {useState} from 'react';
import FreeRooms from "../components/FreeRooms.jsx";
import {Link} from "react-router-dom";

export default function AddBooking() {

    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [freeRooms, setFreeRooms] = useState([]);

    const handleSearchRooms = async () => {
        try {
            // Создаем объект с данными для отправки
            const requestData = {
                checkinDate,
                checkoutDate,
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


    return (
        <div  >
            <div className=" mt-5 container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor=" checkinDate">Дата заезда</label>
                            <input
                                type="date"
                                className="form-control"
                                id="checkinDate"
                                onChange={(e) => setCheckinDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="checkoutDate">Дата выезда</label>
                            <input
                                type="date"
                                className="form-control"
                                id="checkoutDate"
                                onChange={(e) => setCheckoutDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className=" align-self-end col-md-4">
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn mx-3 text-20 h-37  btn-sm btn-outline-secondary"
                                onClick={handleSearchRooms}
                            >
                                Найти свободные комнаты
                            </button>
                            <button
                                type="button"
                                className="  btn text-20 h-37 btn-sm btn-outline-secondary">
                                <Link to="/booking" className=" mr-5 text-decoration-none text-dark "> Назад </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FreeRooms checkinDate = {checkinDate}  checkoutDate = {checkoutDate} freeRooms = {freeRooms}></FreeRooms>
        </div>

    );

}
