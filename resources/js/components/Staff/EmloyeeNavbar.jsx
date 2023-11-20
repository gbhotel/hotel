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
            <nav style={{ padding: '20px' }} className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="/employee/myAccount" className="nav-link text-black w-100">Мой профиль</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to={`/employee/${id}/tasks`} className="nav-link text-black w-100">Мои задачи</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="#" className="nav-link text-black w-100">Моя успеваемость</Link>
                        </div>
                        <div className=" btn-navbar d-flex align-content-center w-100">
                            <Link to="#" className="nav-link text-black w-100">Мои награды</Link>
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
