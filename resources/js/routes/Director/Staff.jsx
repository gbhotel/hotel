import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Staff() {
    const [data, setData] = useState([]);
    document.getElementById('auth').innerHTML = '';
    useEffect(() => {
        const abortController = new AbortController();

        fetch('/api/director/staff', {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    function addUser(event) {
        event.preventDefault();
        window.location.href = '/director/createEmployee';
    }

    return (
        <>
            <div className="width-1200 mx-4 mt-5 col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <Container className="w-100 m-0">
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={8}>
                                <h3>Штат сотрудников</h3>
                            </Col>
                            <Col xs={4}>
                                <button type="button" onClick={addUser} className="btn btn-sm btn-outline-secondary">
                                    Оформить сотрудника
                                </button>
                            </Col>
                        </Row>
                        <Row className="align-items-center border-top">
                            <Col className="my-3" xs={1}>
                                <b>ID</b>
                            </Col>
                            <Col className="my-3" xs={3}>
                                <b>Имя Фамилия</b>
                            </Col>
                            <Col className="my-3" xs={2}>
                                <b>Должность</b>
                            </Col>
                            <Col className="my-3" xs={2}>
                                <b>Телефон</b>
                            </Col>
                            <Col className="my-3" xs={2}>
                                <b>Email</b>
                            </Col>
                            <Col className="my-3" xs={2}>
                                <b>действия</b>
                            </Col>
                        </Row>
                        {data.map((item, index) => (
                            <Row key={index} className="align-items-center border-top">
                                <Col className="my-3" xs={1}>
                                    {item.id}
                                </Col>
                                <Col className="my-3" xs={3}>
                                    {item.first_name} {item.last_name}
                                </Col>
                                <Col className="my-3" xs={2}>
                                    {item.position}
                                </Col>
                                <Col className="my-3" xs={2}>
                                    {item.phone}
                                </Col>
                                <Col className="my-3" xs={2}>
                                    {item.email}
                                </Col>
                                <Col className="my-3" xs={2}>
                                    <Link to={`/director/employee/${item.id}`} className=" mr-5 text-decoration-none text-dark "> Подробнее... </Link>
                                </Col>
                            </Row>
                            ))
                        }
                    </Container>
                </div>
            </div>

        </>
    )
}
