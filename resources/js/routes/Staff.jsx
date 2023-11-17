import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Staff() {
    const [data, setData] = useState([]);
    document.getElementById('auth').innerHTML = '';
    useEffect(() => {
        const abortController = new AbortController();

        fetch('/api/admin/staff', {
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

    return (
        <>
            <div className="d-flex flex-column container">
                <div className="d-flex mt-5 justify-content-between">
                    <h1 className="h2">Сотрудники</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            Принять на работу
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
                                            <Link to={`/employee/${item.id}`} className=" mr-5 text-decoration-none text-dark "> Подробнее... </Link>
                                        </td>
                                    </tr>

                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    )
}
