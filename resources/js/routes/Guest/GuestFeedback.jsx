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

//покостылила немного - переделаю (Вика)
    return (
        <div className='container'>
            <h1>Оцените качество уборки</h1>
            <div className="rating-area">
                <h5>Выброшен ли мусор?</h5>
                <input type="radio" id="star1-5" name="rating" value="5"></input>
                <label className="star" htmlFor="star1-5" title="Оценка «5»"></label>
                <input type="radio" id="star1-4" name="rating" value="4"></input>
                <label htmlFor="star1-4" title="Оценка «4»"></label>
                <input type="radio" id="star1-3" name="rating" value="3"></input>
                <label htmlFor="star1-3" title="Оценка «3»"></label>
                <input type="radio" id="star1-2" name="rating" value="2"></input>
                <label htmlFor="star1-2" title="Оценка «2»"></label>
                <input type="radio" id="star1-1" name="rating" value="1"></input>
                <label htmlFor="star1-1" title="Оценка «1»"></label>
            </div>
            <div className="rating-area">
                <h5>Все ли лампочки горят?</h5>
                <input type="radio" id="star2-5" name="rating" value="5"></input>
                <label className="star" htmlFor="star2-5" title="Оценка «5»"></label>
                <input type="radio" id="star2-4" name="rating" value="4"></input>
                <label htmlFor="star2-4" title="Оценка «4»"></label>
                <input type="radio" id="star2-3" name="rating" value="3"></input>
                <label htmlFor="star2-3" title="Оценка «3»"></label>
                <input type="radio" id="star2-2" name="rating" value="2"></input>
                <label htmlFor="star2-2" title="Оценка «2»"></label>
                <input type="radio" id="star2-1" name="rating" value="1"></input>
                <label htmlFor="star2-1" title="Оценка «1»"></label>
            </div>
            <div className="rating-area">
                <h5>Оцените чистоту постельного белья и полотенец</h5>
                <input type="radio" id="star3-5" name="rating" value="5"></input>
                <label className="star" htmlFor="star3-5" title="Оценка «5»"></label>
                <input type="radio" id="star3-4" name="rating" value="4"></input>
                <label htmlFor="star3-4" title="Оценка «4»"></label>
                <input type="radio" id="star3-3" name="rating" value="3"></input>
                <label htmlFor="star3-3" title="Оценка «3»"></label>
                <input type="radio" id="star3-2" name="rating" value="2"></input>
                <label htmlFor="star3-2" title="Оценка «2»"></label>
                <input type="radio" id="star3-1" name="rating" value="1"></input>
                <label htmlFor="star3-1" title="Оценка «1»"></label>
            </div>
            <div className="rating-area">
                <h5>Оцените чистоту ванной комнаты</h5>
                <input type="radio" id="star4-5" name="rating" value="5"></input>
                <label className="star" htmlFor="star4-5" title="Оценка «5»"></label>
                <input type="radio" id="star4-4" name="rating" value="4"></input>
                <label htmlFor="star4-4" title="Оценка «4»"></label>
                <input type="radio" id="star4-3" name="rating" value="3"></input>
                <label htmlFor="star4-3" title="Оценка «3»"></label>
                <input type="radio" id="star4-2" name="rating" value="2"></input>
                <label htmlFor="star4-2" title="Оценка «2»"></label>
                <input type="radio" id="star4-1" name="rating" value="1"></input>
                <label htmlFor="star4-1" title="Оценка «1»"></label>
            </div>
            <div className="rating-area">
                <h5>Оцените чистоту зеркал</h5>
                <input type="radio" id="star5-5" name="rating" value="5"></input>
                <label className="star" htmlFor="star5-5" title="Оценка «5»"></label>
                <input type="radio" id="star5-4" name="rating" value="4"></input>
                <label htmlFor="star5-4" title="Оценка «4»"></label>
                <input type="radio" id="star5-3" name="rating" value="3"></input>
                <label htmlFor="star5-3" title="Оценка «3»"></label>
                <input type="radio" id="star5-2" name="rating" value="2"></input>
                <label htmlFor="star5-2" title="Оценка «2»"></label>
                <input type="radio" id="star5-1" name="rating" value="1"></input>
                <label htmlFor="star5-1" title="Оценка «1»"></label>
            </div>
            <div className="rating-area">
                <h5>Оцените чистоту коврового покрытия</h5>
                <input type="radio" id="star6-5" name="rating" value="5"></input>
                <label className="star" htmlFor="star6-5" title="Оценка «5»"></label>
                <input type="radio" id="star6-4" name="rating" value="4"></input>
                <label htmlFor="star6-4" title="Оценка «4»"></label>
                <input type="radio" id="star6-3" name="rating" value="3"></input>
                <label htmlFor="star6-3" title="Оценка «3»"></label>
                <input type="radio" id="star6-2" name="rating" value="2"></input>
                <label htmlFor="star6-2" title="Оценка «2»"></label>
                <input type="radio" id="star6-1" name="rating" value="1"></input>
                <label htmlFor="star6-1" title="Оценка «1»"></label>
            </div>
            <div>
                <h1>Здесь вы можете оставить комментарий</h1>
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
