import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from "react-router-dom";

export default function Guests() {

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
                        <Link to="/guest/room:id" className="nav-link text-black w-100">О комнате</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="/guest/feedback" className="nav-link text-black w-100">Отзыв</Link>
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
