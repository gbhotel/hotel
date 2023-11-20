import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useEffect, useState} from "react";



export default function Guests() {

    const today = new Date();
    const year = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    const [date, setDate] = useState(year)
    const [countRooms, setCountRooms] = useState([]);
    const countAllRooms = new Object (countRooms[0])

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`/api/director/analysis-quantity-rooms`, {
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
                setCountRooms(data);
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, [date]);



    return (
        <>
            <div className=" container my-2 col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className=" container my-2 col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <Container >
                                <Row className="align-items-center m-3 text-center" >
                                    <Col xs={8}>
                                        <h3>Анализ комнат</h3>
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
                                {countRooms.map((item, index)=>(
                                    <Row key={index} className="align-items-center border-top">
                                        <Col xs={4}>
                                            {item.name}
                                        </Col>
                                        <Col xs={1}>
                                            {item.count}
                                        </Col>
                                        <Col xs={7}>
                                            <ProgressBar className="my-3" variant="success" now={Math.round( item.count / countAllRooms.count *100)} label={`${Math.round( item.count / countAllRooms.count *100)}%`}/>
                                        </Col>
                                    </Row>
                                ))}
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
