import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';


export default function Employee() {
    const id = useParams().id;
    console.log(id)

    const [data, setData] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(`/api/director/employee/${id}`, {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error.message);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    function editUser() {
        window.location.href = `/director/editEmployee/${id}`;
    }

    async function dismissEmployee(){
        const url = '/api/director/dismiss-employee';

        const dismissData = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( {id: id, _token})
        }

        let response = await fetch(url, dismissData);
        let answer = await response.json();

        console.log(answer);

        answer.ok = response.ok;
        answer.status = response.status;

        if(answer.ok && answer.dismissed === 'good'){
            console.log(answer);
            window.location.href = '/director/staff';
        }else{
            //действия, если пользователь не сохранен
            console.log(answer.status);
        }
    }

    function goBack(event) {
        event.preventDefault();
        window.location.href = '/director/staff';
    }

    return (
        <div className=" container my-2 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <Container className="w-100 m-0">
                    <Row className="align-items-center m-3 text-center" >
                        <Col xs={12}>
                            <h3>Карточка сотрудника</h3>
                        </Col>
                    </Row>
                    <Row className="align-items-top m-3 text-center" >
                        <Col xs={6}>
                            <Container className="w-100">
                                <Row className="align-items-center m-2" >
                                    <Col className="text-center" xs={12}>
                                        <b>Данные сотрудника</b>
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="position" >Должность</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.position}
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="firstName" >Имя</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.firstName} {data.lastName}
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="login" >Login</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.username}
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="login" >Email</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.email}
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="login" >Телефон</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.phone}
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="login" >Паспорт</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.passport}
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="login" >Права доступа</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.role}
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="login" >Зарегистрирован</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.createdAt}
                                    </Col>
                                </Row>
                                <Row className="align-items-center m-2" >
                                    <Col className="text-end" xs={6}>
                                        <label htmlFor="login" >Трудоустроен</label>
                                    </Col>
                                    <Col className="text-start" xs={6}>
                                        {data.employment_date}
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={6}>
                            <Container className="w-100">
                                <Row className="align-items-center m-3 text-center" >
                                    <Col className="align-items-center" xs={12}>
                                        <b className="m-2">Фото сотрудника</b>
                                        <div className="mx-auto m-2" style={{height: '300px', overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
                                            <img className="h-100" src={`http://127.0.0.1:8000/${data.photo}`} alt="У сотрудника нет фотографии"/>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Stack className="m-2" direction="horizontal" gap={1}>
                        <div className="p-2 mr_auto">
                            <button type="button" onClick={editUser} className="btn btn-sm btn-outline-secondary">
                                Редактировать
                            </button>
                        </div>
                        <div className="p-2 mr_auto">
                            <button type="submit" onClick={goBack} className="btn btn-sm btn-outline-secondary">
                                Назад
                            </button>
                        </div>
                        <div className="p-2 ">
                            <button type="button" onClick={dismissEmployee} className="btn btn-sm btn-outline-secondary">
                                Уволить
                            </button>
                        </div>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}
