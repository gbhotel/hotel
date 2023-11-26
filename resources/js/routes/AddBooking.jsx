import React, {useEffect, useState} from 'react';
import FreeRooms from "../components/FreeRooms.jsx";



export default function AddBooking() {

    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [freeRooms, setFreeRooms] = useState([]);

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 10);


    useEffect(() => {
        fetch('/api/admin/free-rooms-period')

            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleSearchRooms = async () => {
        try {
            const requestData = {
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

    return (
        <div  >
            <div className=" mt-5 container col-11">
                <div className="row p-3 justify-content-around btn-gradient-background">
                    <div className="col-md-5 p-0">
                        <div className="form-group ">
                            <input
                                placeholder="Дата заезда"
                                type="text"
                                className="form-control uppercase py-2"
                                id="checkinDate"
                                onChange={(e) => setCheckinDate(e.target.value)}
                                onBlur={(e) => e.target.type ='text'}
                                onFocus={(e) => e.target.type ='date'}
                            />
                        </div>
                    </div>
                    <div className="col-md-5 p-0">
                        <div className="form-group">
                            <input
                                placeholder="Дата выезда"
                                type="text"
                                className="form-control uppercase py-2"
                                id="checkoutDate"
                                onChange={(e) => setCheckoutDate(e.target.value)}
                                onBlur={(e) => e.target.type ='text'}
                                onFocus={(e) => e.target.type ='date'}
                            />
                        </div>
                    </div>
                    <div className=" d-flex justify-content-center col-md-1 p-0 btn-empty">
                        <button
                            type="submit"
                            className="no-outline-on-active btn text-20 uppercase"
                            onClick={handleSearchRooms}
                        >
                            Найти
                        </button>
                    </div>
                </div>
            </div>
            <FreeRooms checkinDate={checkinDate} checkoutDate={checkoutDate} freeRooms={freeRooms}></FreeRooms>
        </div>

    );

}
