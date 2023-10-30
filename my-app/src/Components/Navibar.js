import React from "react";
import { Navbar, Nav, Link, Button } from "react-bootstrap";

export default function Navibar() {
    return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Hotel</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id= "responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link>Комнаты</Nav.Link>
                <Nav.Link>Гости</Nav.Link>
                <Nav.Link>Материалы</Nav.Link>
                <Nav.Link>Сотрудники</Nav.Link>
                
            </Nav>
            
        </Navbar.Collapse>
        <Nav><Button variant="primary">Вход</Button></Nav>
    </Navbar>
    
    </>
)}