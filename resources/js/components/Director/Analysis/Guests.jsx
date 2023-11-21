import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useEffect, useState} from "react";

export default function Guests() {

    const newDate = new Date();
    const today = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`

    const [date, setDate] = useState(today)
    const [countGuests, setCountGuests] = useState([]);
    const [sumGuests, setSumGuests] = useState([]);
    const countAllGuests = new Object (countGuests)
    const sumAllGuests = new Object (sumGuests[0])

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`/api/director/analysis-quantity-guests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': _token,
            },
            body: JSON.stringify({"date":date}),
            signal: abortController.signal,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setSumGuests(data[0]);
                setCountGuests(data[1]);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, [date]);

    let allGuests = sumAllGuests.allGuests
    let allAdults = sumAllGuests.allAdults
    let allChildren = sumAllGuests.allChildren

    return (
        <>
            <div className=" container my-2 col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <Container >
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={8}>
                                <h3>Анализ гостей</h3>
                            </Col>
                            <Col xs={4}>
                                <div className="form-group">
                                    <input
                                        defaultValue={date}
                                        type="date"
                                        className="form-control"
                                        id="checkinDate"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="align-items-center border-top">
                            <Col xs={3}>
                                Комната
                            </Col>
                            <Col xs={1}>
                                Взрослые
                            </Col>
                            <Col xs={1}>
                                Дети
                            </Col>
                            <Col xs={1}>
                                Всего
                            </Col>
                            <Col xs={6}>
                                График
                            </Col>
                        </Row>
                        {countAllGuests.map((item, index)=>(
                            <Row key={index} className="align-items-center border-top">
                                <Col xs={3}>
                                    Комната №{item.number}
                                </Col>
                                <Col xs={1}>
                                    {item.quantity_adults}
                                </Col>
                                <Col xs={1}>
                                    {item.quantity_children}
                                </Col>
                                <Col xs={1}>
                                    {item.quantity_adults + item.quantity_children}
                                </Col>
                                <Col xs={6}>
                                    <ProgressBar
                                        className="my-3"
                                        variant="success"
                                        now={Math.round( (item.quantity_adults + item.quantity_children) / allGuests *100)}
                                        label={`${Math.round( (item.quantity_adults + item.quantity_children) / allGuests *100)}%`}
                                    />
                                </Col>
                            </Row>
                        ))}
                        <Row className="align-items-center border-top">
                            <Col xs={3}>
                                Итого
                            </Col>
                            <Col xs={1}>
                                {allAdults}
                            </Col>
                            <Col xs={1}>
                                {allChildren}
                            </Col>
                            <Col xs={1}>
                                {allGuests}
                            </Col>
                            <Col xs={6}>
                                <ProgressBar className="my-3">
                                    <ProgressBar striped variant="success" now={Math.round( allAdults / allGuests *100)} label={`${Math.round( allAdults / allGuests *100)}%`} key={1} />
                                    <ProgressBar variant="success" now={Math.round( allChildren / allGuests *100)} label={`${Math.round( allChildren / allGuests *100)}%`} key={2} />
                                </ProgressBar>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>

    )
}
