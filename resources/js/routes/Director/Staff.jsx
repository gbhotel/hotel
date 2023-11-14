import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Staff() {
    const [data, setData] = useState([]);
    document.getElementById('auth').innerHTML = '';
    useEffect(() => {
        const abortController = new AbortController();

        fetch('/api/director/staff', {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    function addUser(event) {
        event.preventDefault();
        window.location.href = '/director/create-employee';
    }

    return (
        <>
            <p style={{color: 'red'}}>добавить сообщение о сохранении пользователя</p>
            <div className="d-flex container justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Сотрудники</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button type="button" onClick={addUser} className="btn btn-sm btn-outline-secondary">
                        Оформить сотрудника
                    </button>
                </div>
            </div>
            <div className="my-5 container justify-content-center">
                <div className="  table-responsive">
                    <table className=" no-border table table-striped table-sm">
                        <thead className="no-border">
                        <tr className="no-border">
                            <th scope="col">Имя</th>
                            <th scope="col">Фамилия</th>
                            <th scope="col">Телефон</th>
                            <th scope="col">Почта</th>
                            <th scope="col">Должность</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, index) => (

                                <tr key={index}>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.position.name}</td>
                                    <td >
                                        <Link to={`/director/employee/${item.id}`} className=" mr-5 text-decoration-none text-dark "> Подробнее... </Link>
                                    </td>
                                </tr>

                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
