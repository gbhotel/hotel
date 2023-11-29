import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function GuestFeedback() {

    // const { id } = useParams();
    //
    // const [data, setData] = useState([]);
    //
    // useEffect(() => {
    //     fetch(`/api/guest/room/{id}/get-room`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setData(data[0]);
    //             console.error(data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, [])


    return (
        <div className='container'>
            <div className="rating-area">
                <h1>Оцените качество уборки</h1>
                <input type="radio" id="star-5" name="rating" value="5"></input>
                <label htmlFor="star-5" title="Оценка «5»"></label>
                <input type="radio" id="star-4" name="rating" value="4"></input>
                <label htmlFor="star-4" title="Оценка «4»"></label>
                <input type="radio" id="star-3" name="rating" value="3"></input>
                <label htmlFor="star-3" title="Оценка «3»"></label>
                <input type="radio" id="star-2" name="rating" value="2"></input>
                <label htmlFor="star-2" title="Оценка «2»"></label>
                <input type="radio" id="star-1" name="rating" value="1"></input>
                <label htmlFor="star-1" title="Оценка «1»"></label>
            </div>
            <div>
                <h1>Оставьте запрос на уборку или ремонт</h1>
                <form action="#" className="form-guest-feedback">
                    <p>
                        <textarea className="textarea-guest-feedback" rows="10" name="comment" id="comment"></textarea>
                        <input className="submit-guest-feedback nav-link btn btn-navbar px-3 py-2" type="submit" value="Отправить"/>
                    </p>
                </form>
            </div>
        </div>
    )
}
