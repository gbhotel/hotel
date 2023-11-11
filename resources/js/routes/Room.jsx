import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Rooms() {

    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/api/admin/room/${id}/get-room`)
            .then(response => response.json())
            .then(data => {
                setData(data[0]);
                console.error(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])


    return (
        <>
            <h1 className="text-center my-4">Комната №{data.roomNumber}</h1>
            <div className=" my-0 container row row-cols-1 row-cols-sm-2 row-cols-md-2 ">
                <div className="text-center">
                    <h3>О Комнате</h3>
                    <p>Статус комнаты: {data.status}</p>
                    <p>Категория комнаты: {data.category}</p>
                    <p>Кровать: {data.bed}</p>
                    <p>Кондиционер: {data.conditioner}</p>
                    <p>Количество комнат: {data.roomsNumber}</p>
                    <p>Душь: {data.shower}</p>
                    <p>Туалет: {data.toilet}</p>
                    <p>WiFi: {data.wifi}</p>

                    <h3>О госте</h3>
                    <p>ID: {data.guestsId}</p>
                    <p>Имя: {data.guestsFirstName}</p>
                    <p>Фамилия: {data.guestsLastName}</p>
                    <p>Телефон: {data.guestsPhone}</p>
                    <p>Email: {data.guestsEmail}</p>
                    <p>№ паспорта: {data.guestsPassport}</p>
                </div>

                <div className="text-center">
                    <h3>О брони</h3>
                    <p>ID брони: {data.bookingId}</p>
                    <p>Дата начала брони: {data.bookingCheckIn}</p>
                    <p>Дата окончания брони: {data.bookingCheckOut}</p>
                    <h5>Сотрудник создавшийи бронь</h5>
                    <p>ID сотрудника: {data.staffIdB}</p>
                    <p>Имя: {data.staffFirstNameB}</p>
                    <p>Фамилия: {data.staffLastNameB}</p>
                    <p>Телефон: {data.staffPhoneB}</p>
                    <p>Email: {data.staffEmailB}</p>
                    <p>Должность: {data.staffPositionB}</p>
                    <p>№ паспорта: {data.staffPassportB}</p>
                    <p>Трудоустроен с {data.staffEmploymentDateB}</p>

                    <h3>О заселении</h3>
                    <p>ID заселения: {data.checkId}</p>
                    <p>Дата заселения: {data.checkCheckIn}</p>
                    <p>Дата выселения: {data.checkCheckOut}</p>
                    <h5>Сотрудник создавшийи заселение</h5>
                    <p>ID сотрудника: {data.staffIdCh}</p>
                    <p>Имя: {data.staffFirstNameCh}</p>
                    <p>Фамилия: {data.staffLastNameCh}</p>
                    <p>Телефон: {data.staffPhoneCh}</p>
                    <p>Email: {data.staffEmailCh}</p>
                    <p>Должность: {data.staffPositionCh}</p>
                    <p>№ паспорта: {data.staffPassportCh}</p>
                    <p>Трудоустроен с {data.staffEmploymentDateCh}</p>
                </div>
            </div>
        </>
    )
}











