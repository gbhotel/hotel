import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import EmployeeTasks from "../../components/Staff/EmployeeTasks.jsx";

export default function EmployeeNavbar () {

    const [id, setId] = useState(0);

    useEffect(() => {
        const abortController = new AbortController();

        fetch('/api/user', {
            signal: abortController.signal,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setId(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);
    return(
        <>
            <nav style={{ padding: '20px' }} className=" col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <div className=" btn-navbar d-flex align-content-center">
                            <Link to="/employee/myAccount" className="nav-link text-black">Мой профиль</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center">
                            <Link to={`/employee/${id}/tasks`} className="nav-link text-black">Мои задачи</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center">
                            <Link to="#" className="nav-link text-black">Моя успеваемость</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center">
                            <Link to="#" className="nav-link text-black">Мои награды</Link>
                        </div>
                        <li>
                            <form action="/logout" method='post'>
                                <input type="hidden" name="_token" defaultValue={_token} />
                                <input type="submit" value="Выход" className="text-black btn" />
                            </form>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}
