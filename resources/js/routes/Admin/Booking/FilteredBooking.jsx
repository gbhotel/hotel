import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

export default function FilteredBooking(props) {

    const {filteredBooking, deleteBooking, editBooking} = props;

    return  (
        <>
            {
            filteredBooking.map((item, index) => (
                <Row key = {index} className="align-items-center border-top">
                    <Col className="my-3" lg={1} xs={1}>
                        {item.booking_number}
                    </Col>
                    <Col className="my-3" lg={1} xs={1}>
                        {item.room_number}
                    </Col>
                    <Col className="my-3" lg={2} xs={2}>
                        {item.guest_name}
                    </Col>
                    <Col className="my-3" lg={2} xs={2}>
                        {item.guest_phone}
                    </Col>
                    <Col className="my-3" lg={2} xs={1}>
                        {item.check_in}
                    </Col>
                    <Col className="my-3" lg={2} xs={1}>
                        {item.check_out}
                    </Col>
                    <Col className="my-3 flex-grow-1 d-flex justify-content-center" lg={2}
                         xs={2}>
                        <button type="button"
                                className="btn  btn-sm uppercase bright-green-button"
                        >
                            <Link to={`/editBooking/${item.booking_number}`} className="link text-decoration-none text-white">Редактировать</Link>
                        </button>
                        <button type="button"
                                className="btn btn-sm uppercase bright-red-button"
                                onClick={() => deleteBooking(item.booking_number)}
                        >Удалить
                        </button>
                    </Col>

                </Row>
            ))
        }
        </>)

}
