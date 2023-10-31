import React from "react";
import { Navbar, Nav, Link, Button } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Room from "../Admin/Room";
import Guest from "../Admin/Guest";
import Materials from "../Admin/Materials";
import Working from "../Admin/Working";

export default function Navibar() {
    return (
        <BrowserRouter>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>My Hotel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/room">Комнаты</Nav.Link>
                        <Nav.Link href="/guest">Гости</Nav.Link>
                        <Nav.Link href="/materials">Материалы</Nav.Link>
                        <Nav.Link href="/working">Сотрудники</Nav.Link>

                    </Nav>

                </Navbar.Collapse>
                <Nav><Button variant="primary">Вход</Button></Nav>
            </Navbar>

            <Routes>
                <Route exact path="/room/" element={<Room />} />
                <Route path="/guest" element={<Guest />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/working" element={<Working />} />
            </Routes>
        </BrowserRouter>
    )
}