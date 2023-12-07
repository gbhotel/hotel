import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Booking from "../routes/Booking.jsx";
import AddBooking from "../routes/AddBooking.jsx";
import Rooms from "../routes/Rooms.jsx";
import Room from "../routes/Room.jsx";
import Staff from "../routes/Staff.jsx";
import Employee from "../routes/Employee.jsx";
import Tasks from "../routes/Tasks.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditBooking from "../routes/EditBooking.jsx";
import CheckInGuest from "../routes/CheckInGuest.jsx";

export default function Admin() {

    return (<>
        <div className="d-flex gap-5">
            <nav style={{ padding: '20px' }} className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <div className=" btn-navbar d-flex align-content-center">
                            <Link to="/" className=" uppercase nav-link text-black">Главная</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center">
                            <Link to="/booking" className="nav-link text-black">Бронирование</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center">
                            <Link to="/checkInGuest" className="nav-link text-black">Заселение</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center ">
                            <Link to="/rooms" className=" nav-link text-black">Комнаты</Link>
                        </div>
                        {/*<Link to="/guests" className="nav-link">Гости</Link>*/}
                        {/*<Link to="/materials" className="nav-link">Материалы</Link>*/}
                        <div className=" btn-navbar d-flex align-content-center ">
                            <Link to="/staff" className=" nav-link text-black ">Сотрудники</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center ">
                            <Link to="/tasks" className=" nav-link text-black">Задачи</Link>
                        </div>

                    </ul>
                </div>
                <form action="/logout" method='post' className=" btn-navbar px-3 py-2">
                    <input type="hidden" name="_token" defaultValue={_token} />
                    <input type="submit" value="Выход" className="nav-link text-black btn" />
                </form>
            </nav>
            <Routes>
                <Route path="/booking" element={<Booking />} />
                <Route path="/addBooking" element={<AddBooking />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/room/:id" element={<Room />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/employee/:id" element={<Employee />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/editBooking/:id" element={<EditBooking />} />
                <Route path="/checkInGuest" element={<CheckInGuest />} />

            </Routes>
        </div>

    </>)
}
