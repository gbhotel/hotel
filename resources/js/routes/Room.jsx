import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

    console.log(data)

    return (
        <>
            <div className=" width-1200 mt-4 mx-auto col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-5 shadow-sm h-md-250 position-relative">
                    <Container>
                        {/*Шапка таблицы*/}
                        <Row className="align-items-start my-3 text-center" >
                            <Col xs={8}>
                                <h3>Комната №{data.roomNumber}</h3>
                            </Col>
                            <Col xs={4}>
                                <button type="button" className="btn btn-sm btn-outline-secondary mx-1">
                                    Забронировать
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-secondary mx-1">
                                    Заселить
                                </button>
                            </Col>
                        </Row>
                        {/*Блок о комнате*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>О комнате</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                {/*Первая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Статус комнаты:</Col>
                                    <Col xs={6}>{data.status}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Категория комнаты:</Col>
                                    <Col xs={6}>{data.category}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Вместимость:</Col>
                                    <Col xs={6}>{data.roomMaxGuests}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Цена за сутки</Col>
                                    <Col xs={6}>{data.roomPrice}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Дополнительный гость:</Col>
                                    <Col xs={6}>{data.roomAdditionalGuest}</Col>
                                </Row>
                            </Col>
                            <Col className="border-start border-end" xs={4}>
                                {/*Вторая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Кондиционер:</Col>
                                    <Col xs={6}>{data.conditioner}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Количество комнат:</Col>
                                    <Col xs={6}>{data.roomsNumber}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Душь:</Col>
                                    <Col xs={6}>{data.shower}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Туалет:</Col>
                                    <Col xs={6}>{data.toilet}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>WiFi:</Col>
                                    <Col xs={6}>{data.wifi}</Col>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                {/*третья треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Тапочки:</Col>
                                    <Col xs={6}>{data.towel}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Шампунь:</Col>
                                    <Col xs={6}>{data.shampoo}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Гель для душа:</Col>
                                    <Col xs={6}>{data.showerGel}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Полотенце:</Col>
                                    <Col xs={6}>{data.slippers}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Кровать:</Col>
                                    <Col xs={6}>{data.bed}</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*О госте*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>О госте</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                {/*Первая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>ID гостя:</Col>
                                    <Col xs={6}>{data.guestsId}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Паспорт</Col>
                                    <Col xs={6}>{data.guestsPassport}</Col>
                                </Row>
                            </Col>
                            <Col className="border-start border-end" xs={4}>
                                {/*Вторая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Имя:</Col>
                                    <Col xs={6}>{data.guestsFirstName}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Фамилия:</Col>
                                    <Col xs={6}>{data.guestsLastName}</Col>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                {/*третья треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Телефон:</Col>
                                    <Col xs={6}>{data.guestsPhone}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Email:</Col>
                                    <Col xs={6}>{data.guestsEmail}</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*О брони*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>О брони</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                {/*Первая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>ID брони:</Col>
                                    <Col xs={6}>{data.bookingId}</Col>
                                </Row>
                            </Col>
                            <Col className="border-start border-end" xs={4}>
                                {/*Вторая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Дата начала брони:</Col>
                                    <Col xs={6}>{data.bookingCheckIn}</Col>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                {/*третья треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Дата окончания брони:</Col>
                                    <Col xs={6}>{data.bookingCheckOut}</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*Забронировал*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>Забронировал</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                {/*Первая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>ID сотрудника:</Col>
                                    <Col xs={6}>{data.staffIdB}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Имя:</Col>
                                    <Col xs={6}>{data.staffFirstNameB}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Фамилия:</Col>
                                    <Col xs={6}>{data.staffLastNameB}</Col>
                                </Row>
                            </Col>
                            <Col className="border-start border-end" xs={4}>
                                {/*Вторая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Телефон:</Col>
                                    <Col xs={6}>{data.staffPhoneB}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Email:</Col>
                                    <Col xs={6}>{data.staffEmailB}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Должность:</Col>
                                    <Col xs={6}>{data.staffPositionB}</Col>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                {/*третья треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>№ паспорта:</Col>
                                    <Col xs={6}>{data.staffPassportB}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Трудоустроен с </Col>
                                    <Col xs={6}>{data.staffEmploymentDateB}</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*О заселении*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>О заселении</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                {/*Первая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>ID брони:</Col>
                                    <Col xs={6}>{data.checkId}</Col>
                                </Row>
                            </Col>
                            <Col className="border-start border-end" xs={4}>
                                {/*Вторая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Дата начала брони:</Col>
                                    <Col xs={6}>{data.checkCheckIn}</Col>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                {/*третья треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Дата окончания брони:</Col>
                                    <Col xs={6}>{data.checkCheckOut}</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*Заселил*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>Заселил</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                {/*Первая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>ID сотрудника:</Col>
                                    <Col xs={6}>{data.staffIdCh}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Имя:</Col>
                                    <Col xs={6}>{data.staffFirstNameCh}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Фамилия:</Col>
                                    <Col xs={6}>{data.staffLastNameCh}</Col>
                                </Row>
                            </Col>
                            <Col className="border-start border-end" xs={4}>
                                {/*Вторая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Телефон:</Col>
                                    <Col xs={6}>{data.staffPhoneCh}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Email:</Col>
                                    <Col xs={6}>{data.staffEmailCh}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Должность:</Col>
                                    <Col xs={6}>{data.staffPositionCh}</Col>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                {/*третья треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>№ паспорта:</Col>
                                    <Col xs={6}>{data.staffPassportCh}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Трудоустроен с </Col>
                                    <Col xs={6}>{data.staffEmploymentDateCh}</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*О закрытии*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>О закрытии</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                {/*Первая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>ID брони:</Col>
                                    <Col xs={6}>{data.closedId}</Col>
                                </Row>
                            </Col>
                            <Col className="border-start border-end" xs={4}>
                                {/*Вторая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Дата начала брони:</Col>
                                    <Col xs={6}>{data.closedClosure}</Col>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                {/*третья треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Дата окончания брони:</Col>
                                    <Col xs={6}>{data.closedOpening}</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*Закрыл комнату*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>Закрыл комнату</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                {/*Первая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>ID сотрудника:</Col>
                                    <Col xs={6}>{data.staffIdCl}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Имя:</Col>
                                    <Col xs={6}>{data.staffFirstNameCl}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Фамилия:</Col>
                                    <Col xs={6}>{data.staffLastNameCl}</Col>
                                </Row>
                            </Col>
                            <Col className="border-start border-end" xs={4}>
                                {/*Вторая треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Телефон:</Col>
                                    <Col xs={6}>{data.staffPhoneCl}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Email:</Col>
                                    <Col xs={6}>{data.staffEmailCl}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Должность:</Col>
                                    <Col xs={6}>{data.staffPositionCl}</Col>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                {/*третья треть параметров о комнате*/}
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>№ паспорта:</Col>
                                    <Col xs={6}>{data.staffPassportCl}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Трудоустроен с </Col>
                                    <Col xs={6}>{data.staffEmploymentDateCl}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}











