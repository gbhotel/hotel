import { useEffect, useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AllCheckIns() {

    const convertDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const [checkIns, setCheckIns] = useState([]);
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isOldCheckOut, setIsOldCheckOut] = useState(false);
    const [checkInNumber, setCheckInNumber] = useState(0);
    const [updateBooking, setUpdateBooking] = useState(false);
    const [checkInIndex, setCheckInIndex] = useState(-1);

    const GuestcheckOutTime = useRef('');
    const GuestcheckOutDate = useRef('');


    useEffect(() => {
        const abortController = new AbortController();

        fetch(`/api/admin/checkin/${convertDate(new Date)}/get`, {
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
                setCheckIns(data);
                // filterToday(data);
                // setCheckInDate(null);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    const getCheckOutStatus = (dateTime) => {
        let date = dateTime.split(' ')[0];
        date = date.split('-');
        let time = dateTime.split(' ')[1];
        time = time.split(':');
        let checkOutTime = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        let deltaTime = checkOutTime - new Date();
        if (deltaTime < 0) return 2;
        else if (deltaTime > 12 * 60 * 60 * 1000) return 0;
        else return 1;
    }

    const buttonStyle = (dateTime) => {
        let status = getCheckOutStatus(dateTime);
        if (status == 2) return 'bright-red-button';
        else if (status == 0) return 'innactive-check-in';
        else return 'bright-green-button';
    }

    const canselCheckOut = () => {
        setIsCheckOut(false);
        setIsOldCheckOut(false);
        setUpdateBooking(false);
    }

    const checkOutGuest = (id, checkOutTime, index) => {
        setCheckInNumber(id);
        setCheckInIndex(index);
        if (getCheckOutStatus(checkOutTime) == 1)
            setIsCheckOut(true);
        else if (getCheckOutStatus(checkOutTime) == 2) {
            setIsOldCheckOut(true);
            setIsCheckOut(true);
        }
        else if (confirm('Дата выселения еще не наступила. Вы уверены, что хотите выселить гостя?')) {
            setIsCheckOut(true);
            setUpdateBooking(true);
            GuestcheckOutDate.current = convertDate(new Date());

        }
    }


    const getTimeString = (date) => {
        const hours = (date.getHours()).toString().padStart(2, '0');
        const mins = (date.getMinutes()).toString().padStart(2, '0');
        GuestcheckOutTime.current = hours + ':' + mins + ':00';
        return hours + ':' + mins + ':00';
    }

    const timeChange = (e) => {
        GuestcheckOutTime.current = e.target.value + ':00';
    }

    const dateChange = (e) => {
        GuestcheckOutDate.current = e.target.value;
    }

    const deleteRaw = (id) => {

    }

    const saveCheckOut = () => {
        if (GuestcheckOutDate.current == '')
            GuestcheckOutDate.current = convertDate(new Date());
        let requestData = {
            _token,
            'checkOutTime': GuestcheckOutTime.current,
            'checkOutDate': GuestcheckOutDate.current,
            'id': checkInNumber,
            updateBooking,
        };
        fetch(`/api/admin/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then((data) => {
                if (data['status'] === 'OK') {
                    console.log('Успешное выселение');
                    setIsCheckOut(false);
                    setIsOldCheckOut(false);
                    let cIn = checkIns;
                    cIn.splice(checkInIndex, 1)
                    setCheckIns(cIn);
                }
                else
                    console.log('Ошибка удаления брони');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <div>Все заселения</div>
            <div
                className="row g-0 p-4 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <Row className=" uppercase align-items-center">
                    <Col className="my-3" lg={1} xs={1}>
                        <b>Номер</b>
                    </Col>
                    <Col className="my-3" lg={1} xs={2}>
                        <b>Гость</b>
                    </Col>
                    <Col className="my-3" lg={2} xs={1}>
                        <b>Телефон</b>
                    </Col>
                    <Col className="my-3" lg={1} xs={1}>
                        <b>Взрослых / детей</b>
                    </Col>
                    <Col className="my-3" lg={2} xs={1}>
                        <b>дата заезда</b>
                    </Col>
                    <Col className="my-3" lg={2} xs={1}>
                        <b>дата выезда</b>
                    </Col>

                    <Col className="my-3 flex-grow-1" lg={2} xs={1}>
                        <b></b>
                    </Col>
                </Row>
                {
                    checkIns.map((item, index) => (
                        <Row key={index} className="align-items-center border-top">
                            <Col className="my-3" lg={1} xs={1}>
                                {item.roomNumber}
                            </Col>
                            <Col className="my-3" lg={1} xs={1}>
                                {item.name}
                            </Col>
                            <Col className="my-3" lg={2} xs={2}>
                                {item.phone}
                            </Col>
                            <Col className="my-3" lg={1} xs={2}>
                                {item.adults}/{item.children}
                            </Col>
                            <Col className="my-3" lg={2} xs={1}>
                                {item.checkIn}
                            </Col>
                            <Col className="my-3" lg={2} xs={1}>
                                {item.checkOut}
                            </Col>
                            <Col className="my-3 flex-grow-1 d-flex justify-content-center" lg={2}
                                xs={2}>
                                <button type="button"
                                    className={"btn btn-sm uppercase " + buttonStyle(item.checkOut)}
                                    onClick={() => checkOutGuest(item.id, item.checkOut, index)}
                                // disabled={buttonActive(item.check_in)}
                                >Выселить
                                </button>
                            </Col>
                        </Row>
                    ))

                }
                {
                    isCheckOut && (
                        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Выселение гостя</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={canselCheckOut}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {isOldCheckOut && (
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="typeDate">
                                                    Уточните дату выселения:
                                                </label>
                                                <input
                                                    type="date"
                                                    id="typeDate"
                                                    className="form-control"
                                                    defaultValue={convertDate(new Date())}
                                                    onChange={(e) => dateChange(e)}
                                                />
                                            </div>

                                        )}
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="typeDateTime">
                                                Уточните время выселения:
                                            </label>
                                            <input
                                                type="time"
                                                id="typeDateTime"
                                                className="form-control"
                                                defaultValue={getTimeString(new Date())}
                                                onChange={(e) => timeChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={saveCheckOut}
                                        >Выселить
                                        </button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={canselCheckOut}>Закрыть</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}