import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";



export default function Navibar() {
    return (
        <>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div className="d-flex main-container">
                    <Navbar.Brand >My Hotel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/" className="nav-link">Главная</Link>
                            <Link to="/booking" className="nav-link">Бронирование</Link>
                            <Link to="/rooms" className="nav-link">Комнаты</Link>
                            <Link to="/guests" className="nav-link">Гости</Link>
                            <Link to="/materials" className="nav-link">Материалы</Link>
                            <Link to="/staff" className="nav-link">Сотрудники</Link>
                            <Link to="/tasks" className="nav-link">Задачи</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav>
                        <form action="/logout" method='post'>
                            <input type="hidden" name="_token" defaultValue={_token} />
                            <input type="submit" value="Выход" class="btn btn-primary" />
                        </form>
                        {/* <Button variant="primary">LogOut</Button> */}
                    </Nav>
                </div>
            </Navbar>

        </>
    )
}

