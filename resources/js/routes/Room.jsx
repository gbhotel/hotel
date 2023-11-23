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


    return (
        <>
            <div className=" width-1200 mt-4 mx-auto col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <Container>
                        <Row className="align-items-center m-3 text-center" >
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
                        <Row className="align-items-center border-top">
                            <Col className="my-3" xs={4}>
                                <b>О комнате</b>
                            </Col>
                            <Col className="my-3" xs={4}>
                                <b>О брони</b>
                            </Col>
                            <Col className="my-3" xs={4}>
                                <b>О заселении</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-top">
                            <Col className="border-end" xs={4}>
                                <Row className="align-items-center">
                                    <Col className="my-3" xs={6}>Статус комнаты:</Col>
                                    <Col className="my-3" xs={6}>{data.status}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Категория комнаты:</Col>
                                    <Col className="my-3" xs={6}>{data.category}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Вместимость:</Col>
                                    <Col className="my-3" xs={6}>{data.roomMaxGuests}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Цена за зутки</Col>
                                    <Col className="my-3" xs={6}>{data.roomPrice}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Дополнительный гость:</Col>
                                    <Col className="my-3" xs={6}>{data.roomAdditionalGuest}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Кондиционер:</Col>
                                    <Col className="my-3" xs={6}>{data.conditioner}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Количество комнат:</Col>
                                    <Col className="my-3" xs={6}>{data.roomsNumber}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Душь:</Col>
                                    <Col className="my-3" xs={6}>{data.shower}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Туалет:</Col>
                                    <Col className="my-3" xs={6}>{data.toilet}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>WiFi:</Col>
                                    <Col className="my-3" xs={6}>{data.wifi}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Тапочки:</Col>
                                    <Col className="my-3" xs={6}>{data.towel}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Полотенце:</Col>
                                    <Col className="my-3" xs={6}>{data.slippers}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Шампунь:</Col>
                                    <Col className="my-3" xs={6}>{data.shampoo}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Гель для душа:</Col>
                                    <Col className="my-3" xs={6}>{data.showerGel}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Кровать:</Col>
                                    <Col className="my-3" xs={6}>{data.bed}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={12}>О госте</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>ID гостя:</Col>
                                    <Col className="my-3" xs={6}>{data.guestsId}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Имя:</Col>
                                    <Col className="my-3" xs={6}>{data.guestsFirstName}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Фамилия:</Col>
                                    <Col className="my-3" xs={6}>{data.guestsLastName}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Телефон:</Col>
                                    <Col className="my-3" xs={6}>{data.guestsPhone}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Email:</Col>
                                    <Col className="my-3" xs={6}>{data.guestsEmail}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Паспорт</Col>
                                    <Col className="my-3" xs={6}>{data.guestsPassport}</Col>
                                </Row>
                            </Col>
                            <Col className="border-end border-bottom" xs={4}>
                                <Row className="align-items-center">
                                    <Col className="my-3" xs={6}>ID брони:</Col>
                                    <Col className="my-3" xs={6}>{data.bookingId}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Дата начала брони:</Col>
                                    <Col className="my-3" xs={6}>{data.bookingCheckIn}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Дата окончания брони:</Col>
                                    <Col className="my-3" xs={6}>{data.bookingCheckOut}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={12}>Сотрудник создавшийи бронь</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>ID сотрудника:</Col>
                                    <Col className="my-3" xs={6}>{data.staffIdB}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Имя:</Col>
                                    <Col className="my-3" xs={6}>{data.staffFirstNameB}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Фамилия:</Col>
                                    <Col className="my-3" xs={6}>{data.staffLastNameB}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Телефон:</Col>
                                    <Col className="my-3" xs={6}>{data.staffPhoneB}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Email:</Col>
                                    <Col className="my-3" xs={6}>{data.staffEmailB}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Должность:</Col>
                                    <Col className="my-3" xs={6}>{data.staffPositionB}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>№ паспорта:</Col>
                                    <Col className="my-3" xs={6}>{data.staffPassportB}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Трудоустроен с </Col>
                                    <Col className="my-3" xs={6}>{data.staffEmploymentDateB}</Col>
                                </Row>
                            </Col>
                            <Col className="border-bottom" xs={4}>
                                <Row className="align-items-center">
                                    <Col className="my-3" xs={6}>ID заселения:</Col>
                                    <Col className="my-3" xs={6}>{data.checkId}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Дата заселения: </Col>
                                    <Col className="my-3" xs={6}>{data.checkCheckIn}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Дата выселения: </Col>
                                    <Col className="my-3" xs={6}>{data.checkCheckOut}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={12}>Сотрудник создавшийи заселение</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>ID сотрудника:</Col>
                                    <Col className="my-3" xs={6}>{data.staffIdCh}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Имя:</Col>
                                    <Col className="my-3" xs={6}>{data.staffFirstNameCh}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Фамилия:</Col>
                                    <Col className="my-3" xs={6}>{data.staffLastNameCh}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Телефон: </Col>
                                    <Col className="my-3" xs={6}>{data.staffPhoneCh}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Email:</Col>
                                    <Col className="my-3" xs={6}>{data.staffEmailCh}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Должность:</Col>
                                    <Col className="my-3" xs={6}>{data.staffPositionCh}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>№ паспорта:</Col>
                                    <Col className="my-3" xs={6}>{data.staffPassportCh}</Col>
                                </Row>
                                <Row className="align-items-center border-top">
                                    <Col className="my-3" xs={6}>Трудоустроен с</Col>
                                    <Col className="my-3" xs={6}>{data.staffEmploymentDateCh}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}











