import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";


export default function Staff() {

    const [countStaff, setCountStaff] = useState([]);
    const countAllStaff = new Object (countStaff[0]);
    const [countStaffDismiss, setCountStaffDismiss] = useState([]);
    const countAllStaffDismiss = new Object (countStaffDismiss[0])

    //Получаем количество работающих сотрудников
    useEffect(() => {
        const abortController = new AbortController();

        fetch(`/api/director/analysis`, {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCountStaff(data);
            })
            .catch(error => {
                console.error(error.message);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    //получаем уволеных сотрудников
    useEffect(() => {
        const abortController = new AbortController();

        fetch(`/api/director/analysis-dismiss`, {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setCountStaffDismiss(data);
            })
            .catch(error => {
                console.error(error.message);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <>
            <div className=" container my-2 col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <Container>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={12}>
                                <h3>Штат сотрудников</h3>
                            </Col>
                        </Row>
                        {countStaff.map((item, index)=>(
                            <Row key={index} className="align-items-center border-top">
                                <Col xs={4}>
                                    {item.name}
                                </Col>
                                <Col xs={1}>
                                    {item.count}
                                </Col>
                                <Col xs={7}>
                                    <ProgressBar className="my-3" variant="success" now={Math.round( item.count / countAllStaff.count *100)} label={`${Math.round( item.count / countAllStaff.count *100)}%`}/>
                                </Col>
                            </Row>
                        ))}
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={12}>
                                <h3>Уволенные сотрудники</h3>
                            </Col>
                        </Row>
                        {
                            countStaffDismiss.map((item, index)=>(
                            <Row key={index} className="align-items-center border-top">
                                <Col xs={4}>
                                    {item.name}
                                </Col>
                                <Col xs={1}>
                                    {item.count}
                                </Col>
                                <Col xs={7}>
                                    <ProgressBar
                                        className="my-3"
                                        variant="success"
                                        now={Math.round( item.count / countAllStaffDismiss.count *100)}
                                        label={`${Math.round( item.count / countAllStaffDismiss.count *100)}%`}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </Container>
                </div>
            </div>

            {/*<div className=" container my-2 col-md-6">*/}
            {/*    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">*/}
            {/*        <Container vstack>*/}
            {/*            <Row className="align-items-center m-3 text-center" >*/}
            {/*                <Col xs={12}>*/}
            {/*                    <h3>Анализ комнат</h3>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*            <Row className="align-items-center border-top">*/}
            {/*                <Col xs={4}>*/}
            {/*                    Всего комнат*/}
            {/*                </Col>*/}
            {/*                <Col xs={1}>*/}
            {/*                    10*/}
            {/*                </Col>*/}
            {/*                <Col xs={7}>*/}
            {/*                    <ProgressBar className="my-3" variant="success" now={100} />*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*            <Row className="align-items-center border-top">*/}
            {/*                <Col xs={4}>*/}
            {/*                    Свободны*/}
            {/*                </Col>*/}
            {/*                <Col xs={1}>*/}
            {/*                    2*/}
            {/*                </Col>*/}
            {/*                <Col xs={7}>*/}
            {/*                    <ProgressBar className="my-3" variant="success" now={20} />*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*            <Row className="align-items-center border-top">*/}
            {/*                <Col xs={4}>*/}
            {/*                    Заселены*/}
            {/*                </Col>*/}
            {/*                <Col xs={1}>*/}
            {/*                    6*/}
            {/*                </Col>*/}
            {/*                <Col xs={7}>*/}
            {/*                    <ProgressBar className="my-3" variant="success" now={60} />*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*            <Row className="align-items-center border-top">*/}
            {/*                <Col xs={4}>*/}
            {/*                    На брони*/}
            {/*                </Col>*/}
            {/*                <Col xs={1}>*/}
            {/*                    1*/}
            {/*                </Col>*/}
            {/*                <Col xs={7}>*/}
            {/*                    <ProgressBar className="my-3" variant="success" now={10} />*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*            <Row className="align-items-center border-top">*/}
            {/*                <Col xs={4}>*/}
            {/*                    На ремонте*/}
            {/*                </Col>*/}
            {/*                <Col xs={1}>*/}
            {/*                    1*/}
            {/*                </Col>*/}
            {/*                <Col xs={7}>*/}
            {/*                    <ProgressBar className="my-3" variant="success" now={10} />*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </Container>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>

    )
}
