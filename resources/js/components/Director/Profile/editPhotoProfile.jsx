import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useDispatch} from "react-redux";
import {changeRender} from "../../../store/slices/director/directorRender.js";

export default function EditPhotoProfileDirector() {

    const dispatch = useDispatch();

    const profile = 'profile';
    const editData = 'editData';
    const editPass = 'editPass';

    const changeDataHandler = () => {
        dispatch(changeRender(profile))
    }
    const changeEditDataHandler = () => {
        dispatch(changeRender(editData))
    }
    const changeEditPassHandler = () => {
        dispatch(changeRender(editPass))
    }

    return (
        <Container className="w-100 m-0 mb-3">
            <Row className="align-items-center m-3 text-center" >
                <Col xs={12}>
                    <h3>Изменение фотографии</h3>
                </Col>
            </Row>
            <Row className="align-items-center m-3 text-center" >
                <Col xs={4}>
                    <button type="button" onClick={changeDataHandler} className="w-100 btn btn-sm btn-outline-secondary">
                        Профиль
                    </button>
                </Col>
                <Col xs={4}>
                    <button type="button" onClick={changeEditDataHandler} className="w-100 btn btn-sm btn-outline-secondary">
                        Редактировать данные
                    </button>
                </Col>
                <Col xs={4}>
                    <button type="button" onClick={changeEditPassHandler} className="w-100 btn btn-sm btn-outline-secondary">
                        Редактировать пароль
                    </button>
                </Col>
            </Row>
            {/*<Row className="align-items-start text-center font-22" >*/}
            {/*    <Col className="p-0 d-flex justify-content-center" xs={4}>*/}
            {/*        <div className="d-flex justify-content-center" style={{width:'300px', height:'400px', overflow: 'hidden', borderRadius: '6px'}}>*/}
            {/*            <img style={{height:'400px'}} src={"../" + employee.photo}/>*/}
            {/*        </div>*/}
            {/*    </Col>*/}
            {/*    <Col xs={6}>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Табельный номер*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{'000' + employee.id}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Должность*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.position}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Имя*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.first_name}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Фамилия*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.last_name}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Дата рождения*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.birthdayAt}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Дата рождения*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.age}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Пол*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.gender}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                № паспорта*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.passport}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Username*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.username}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                № телефона*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.phone}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Email*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.email}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Трудоустроен с*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.employment}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Трудоустроен с*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.experience}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Зарегестрирован*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.createdAt}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center m-2" >*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                Изменено*/}
            {/*            </Col>*/}
            {/*            <Col className="text-start" xs={6}>*/}
            {/*                <b>{employee.updatedAt}</b>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Col>*/}
            {/*    <Col xs={2}>*/}
            {/*        <Row className="align-items-center" >*/}
            {/*            <Col xs={12}>*/}
            {/*                <div className="p-2">*/}
            {/*                    <button type="button" className="w-100 btn btn-sm btn-outline-secondary">*/}
            {/*                        Редактировать*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center" >*/}
            {/*            <Col xs={12}>*/}
            {/*                <div className="p-2">*/}
            {/*                    <button type="button" className="w-100 btn btn-sm btn-outline-secondary">*/}
            {/*                        Изменить фото*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="align-items-center" >*/}
            {/*            <Col xs={12}>*/}
            {/*                <div className="p-2">*/}
            {/*                    <button type="button" className="w-100 btn btn-sm btn-outline-secondary">*/}
            {/*                        Изменить пароль*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Container>
    );
}
