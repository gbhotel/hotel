import { useSelector} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";

export default function GuestRoom() {

    const roomInfo = useSelector((state) => state.setRoomInfoForGuest.RoomInfoForGuest);
    console.log(roomInfo.comfort);
    return (
        <>
            <div className="width-1200 mt-4 mx-auto col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-5 shadow-sm h-md-250 position-relative">
                    <Container>
                        {/*Имя гостя и №комнаты*/}
                        <Row className="align-items-start border-bottom my-3 text-center" >
                            <Col className="border-end" xs={4}>
                                <h3>{roomInfo.guestName}</h3>
                            </Col>
                            <Col xs={4}>
                                <h3>Комната №{roomInfo.roomNumber}</h3>
                            </Col>
                        </Row>
                        {/*Информация о проживании*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>О проживании</b>
                            </Col>
                        </Row>
                        {/*даты проживания*/}
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}><p>Даты проживания:</p></Col>
                                    <Col xs={6}>{roomInfo.dates}</Col>
                                </Row>
                            </Col>
                            {/*взрослые*/}
                            <Col className="border-start border-end" xs={4}>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Количество взрослых:</Col>
                                    <Col xs={6}>{roomInfo.adults}</Col>
                                </Row>
                            </Col>
                            {/*дети*/}
                            <Col xs={4}>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Количество детей:</Col>
                                    <Col xs={6}>{roomInfo.children}</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*Информация о стоимости*/}
                        <Row className="align-items-start border-bottom border-top mb-2 text-start" >
                            <Col xs={4}>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}><p>Стоимость проживания за день:</p></Col>
                                    <Col xs={6}>{roomInfo.price} рублей</Col>
                                </Row>
                            </Col>
                            <Col className="border-start" xs={4}>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Общая стоимость проживания:</Col>
                                    <Col xs={6}>{roomInfo.totalCost} рублей</Col>
                                </Row>
                            </Col>
                        </Row>
                        {/*Информация о комнате*/}
                        <Row className="align-items-start text-start" >
                            <Col xs={12}>
                                <b>О комнате</b>
                            </Col>
                        </Row>
                        <Row className="align-items-start border-top mb-2 text-start" >
                            <Col xs={4}>
                                <Row className="align-items-center border-bottom my-1 text-start" >
                                    <Col xs={6}>Категория комнаты:</Col>
                                    <Col xs={6}>{roomInfo.roomCategory}</Col>
                                </Row>
                            </Col>
                            <Row className="align-items-start mb-2 text-start" >
                                <Col className="border-start" xs={4}>
                                    <Row className="align-items-center my-1 text-start" >
                                        <Col xs={6}>Количество комнат:</Col>
                                        <Col xs={6}>{roomInfo.roomsNumber}</Col>
                                    </Row>
                                    <Row className="align-items-center my-1 text-start" >
                                        <Col xs={6}>Кондиционер:</Col>
                                        <Col xs={6}>{roomInfo.conditioner}</Col>
                                    </Row>
                                    <Row className="align-items-center my-1 text-start" >
                                        <Col xs={6}>Душ:</Col>
                                        <Col xs={6}>{roomInfo.shower}</Col>
                                    </Row>
                                    <Row className="align-items-center my-1 text-start" >
                                        <Col xs={6}>Туалет:</Col>
                                    <Col xs={6}>{roomInfo.toilet}</Col>
                                    </Row>
                                </Col>
                                <Col className="border-start" xs={4}>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>Кровать:</Col>
                                    <Col xs={6}>{roomInfo.bed}</Col>
                                </Row>
                                <Row className="align-items-center my-1 text-start" >
                                    <Col xs={6}>WiFi:</Col>
                                    <Col xs={6}>{roomInfo.wifi}</Col>
                                </Row>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
        )
}

