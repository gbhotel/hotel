import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navibar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>My Hotel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" className="nav-link">Главная</Link>
                        <Link to="/rooms" className="nav-link">Комнаты</Link>
                        <Link to="/guests" className="nav-link">Гости</Link>
                        <Link to="/materials" className="nav-link">Материалы</Link>
                        <Link to="/staff" className="nav-link">Сотрудники</Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    <Button variant="primary">Вход</Button>
                </Nav>
            </Navbar>
        </>
    )
}