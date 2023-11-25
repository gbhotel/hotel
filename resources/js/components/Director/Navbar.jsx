import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from "react-router-dom";


export default function NavbarDirector() {

    return (
        <>
            <nav style={{ padding: '20px' }} className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="/director/staff" className="nav-link text-black w-100">Сотрудники</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="/director/analysis" className="nav-link text-black w-100">Анализ</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="/director/profile" className="nav-link text-black w-100">Профиль</Link>
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
