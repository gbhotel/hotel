import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";


export default function GuestRequests() {

    const roomInfo = useSelector((state) => state.setRoomInfoForGuest.RoomInfoForGuest);

    const [request, setRequest] = useState({});
    const [response, setResponse] = useState([]);

    const handleRequest = (field, event) => {
        setRequest((prevState) => ({...prevState, [field]: event.target.value}));
        setRequest((prevState) => ({...prevState, 'guestId': roomInfo.id, 'roomId': roomInfo.roomId}));
    }

    const handleRequestSent = async () => {
        try {
            const response = await fetch('/api/guest/setRequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': _token,
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const data = await response.json();
                setResponse(data);

                setTimeout(()=> {
                    setResponse([])
                }, 2000)
            } else {
                console.error('Ошибка при выполнении fetch-запроса');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };


    return (
        <div>
            <div className="requests-form">
                <div className="requests-form-group">
                    <label className="request-label" htmlFor="request4">Услуги в номер:</label>
                    <select
                        id="request4"
                        name="request4"
                        onClick={(e)=>handleRequest('name', e)}
                    >
                        <option value="уборка номера">уборка номера</option>
                        <option value="смена белья">смена белья</option>
                        <option value="доставки еды">доставки еды</option>
                        <option value="услуги прачечной">услуги прачечной</option>
                        <option value="другое">другое</option>
                    </select>
                </div>
                <div className="requests-form-group">
                    <label className="request-label" htmlFor="feedback">Комментарий:</label>
                    <textarea
                        className="request-textarea"
                        id="feedback"
                        name="feedback"
                        rows="4"
                        placeholder="Введите ваши пожелания..."
                        onChange={(e)=>handleRequest('comment', e)}
                    ></textarea>
                </div>
                <button className="w-100 btn btn-task" onClick={handleRequestSent}>Отправить</button>
            </div>
            {
                response && (
                    <h3 className={`btn-border-purple text-black border-with-shadow ${response.length === 0 ? 'invisible' : ''}`}>{response.message}</h3>
                )
            }
        </div>

    )
}

