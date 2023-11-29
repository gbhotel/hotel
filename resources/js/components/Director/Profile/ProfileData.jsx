import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector,} from "react-redux";
import {changeRender} from "../../../store/slices/director/directorRender.js";
import {changeData} from "../../../store/slices/director/directorData.js";
import {establishAlertPass} from "../../../store/slices/director/alertPass";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

export default function ProfileDirector() {

    const alertPassState = useSelector(state => state.alertPass);
    // const [alertShow, setAlertShow] = useState(alertPassState.condition);
    // const [alertMessage, setAlertMessage] = useState(alertPassState.message);
    let alertShow = alertPassState.condition;
    const alertMessage = alertPassState.message;

    const dispatch = useDispatch();

    const editData = 'editData';
    const editPhoto = 'editPhoto';
    const editPass = 'editPass';
    const clearAlert = {condition: 'false',message:'',}

    const changeEditDataHandler = () => {
        dispatch(changeRender(editData))
    }
    const changeEditPhotoHandler = () => {
        dispatch(changeRender(editPhoto))
    }
    const changeEditPassHandler = () => {
        dispatch(changeRender(editPass))
    }

    const clearAlertHandler = () => {
        dispatch(establishAlertPass(clearAlert))
    }

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        fetch(`/api/director/profile/get-my-data`, {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setEmployee(data)
                dispatch(changeData(data))
            })
            .catch(error => {
                console.error(error.message);
            });
        return () => {
            abortController.abort();
        }
    }, []);

    function alertGood() {
        if (alertShow) {
            return (
                <Alert variant="success" onClick={clearAlertHandler} dismissible>
                    {alertMessage}
                </Alert>
            );
        }
    }

    return (
        <>
            {alertGood()}
                <Container className="w-100 m-0 mb-3">
                    <Row className="align-items-center m-3 text-center" >
                        <Col xs={12}>
                            <h3>Личные данные</h3>
                        </Col>
                    </Row>
                    <Row className="align-items-start text-center font-22" >
                        <Col className="p-0 d-flex justify-content-center" xs={4}>
                            <div className="d-flex justify-content-center" style={{width:'300px', height:'400px', overflow: 'hidden', borderRadius: '6px'}}>
                                <img style={{height:'400px'}} src={"../" + employee.photo} alt="Ваше фото"/>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Табельный номер
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{'000' + employee.id}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Должность
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.position}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Имя
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.first_name}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Фамилия
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.last_name}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Дата рождения
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.birthdayAt}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Возрост
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.age}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Пол
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.gender}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    № паспорта
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.passport}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Username
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.username}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    № телефона
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.phone}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Email
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.email}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Трудоустроен с
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.employment}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Стаж
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.experience}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Зарегестрирован
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.createdAt}</b>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-2" >
                                <Col className="text-start" xs={6}>
                                    Изменено
                                </Col>
                                <Col className="text-start" xs={6}>
                                    <b>{employee.updatedAt}</b>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={2}>
                            <Row className="align-items-center" >
                                <Col xs={12}>
                                    <div className="p-2">
                                        <button type="button" onClick={changeEditDataHandler} className="w-100 btn btn-sm btn-outline-secondary">
                                            Редактировать
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="align-items-center" >
                                <Col xs={12}>
                                    <div className="p-2">
                                        <button type="button" onClick={changeEditPhotoHandler} className="w-100 btn btn-sm btn-outline-secondary">
                                            Изменить фото
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="align-items-center" >
                                <Col xs={12}>
                                    <div className="p-2">
                                        <button type="button" onClick={changeEditPassHandler} className="w-100 btn btn-sm btn-outline-secondary">
                                            Изменить пароль
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        </>
    );
}
