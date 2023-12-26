import React from "react";
import {Link} from "react-router-dom";

export default function NavBar() {
    return (
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
    )
}
