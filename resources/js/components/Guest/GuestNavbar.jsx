import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setRoomInfoForGuest} from "../../store/actions/guest_actions.jsx";

export default function Guests() {

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`/api/guest/room`)
            .then(response => response.json())
            .then(data => {
                dispatch(setRoomInfoForGuest(data))
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <>
            <nav style={{ padding: '20px' }} className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <div className="guest_inf align-content-center w-100">
                            <h5>Call us</h5>
                            <text>+7-(495)-122-22-22</text>
                            <h5 style={{ marginTop: '5px' }}>Wi-Fi</h5>
                            <text>Login: myhotel_wifi</text>
                            <text>Password: besthotel</text>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="/guest/room" className="nav-link text-black w-100">О комнате</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="/guest/feedback" className="nav-link text-black w-100">Отзыв</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="/guest/requests" className="nav-link text-black w-100">Заявки</Link>
                        </div>
                    </ul>
                </div>
                <form action="/logout" method='post' className=" btn-navbar px-3 py-2">
                    <input type="hidden" name="_token" defaultValue={_token} />
                    <input type="submit" value="Выход"  className="nav-link text-black btn" />
                </form>



            </nav>
        </>

    )
}
