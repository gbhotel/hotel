import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {request} from "../../../services/http.js";

export default function Staff() {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [employee, setEmployee] = useState({});
    const [positions, setPositions] = useState({});
    const [disable, setDisable] = useState(true);

    employee._token = _token

    const updateEmployee = (event, field) => {
        setEmployee(prevState => ({ ...prevState, [field]: event.target.value }))
    }

    const saveChanges = () => {
        fetch(`/api/admin/employee/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        })
            .then(response => response.json())
            .then((data) => {
                setEmployee(data);
                setDisable(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        setLoading(true);

        request(`/api/admin/employee/${id}`).then(response => {
            setPositions(response.positions);
            setEmployee(response.employee);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className=" container my-5 col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <div className="d-flex m-0 align-items-center">
                            <div className=" d-flex  align-items-center form-group">
                                <h3 className="mb-0">Должность: </h3>
                                <select
                                    disabled={disable}
                                    className="no-box-shadow form-control font-22"
                                    value={employee.position}
                                    onChange={(e) => updateEmployee(e, 'position')}
                                >
                                    {
                                        Object.keys(positions).map((key, index) => (
                                            <option key={key + index} value={positions[key]}>{positions[key]}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>


                        <div className="d-flex align-items-center">
                            <h3 className="mb-0">Имя: </h3>
                            <input
                                disabled={disable}
                                type="text"
                                placeholder={employee.first_name}
                                className=" border-0 mb-2 no-outline-on-hover align-bottom"
                                onChange={(e) => updateEmployee(e, 'first_name')}
                            />
                        </div>
                        <div className="d-flex align-items-center">
                            <h3 className="mb-0">Фамилия: </h3>
                            <input
                                disabled={disable}
                                type="text"
                                placeholder={employee.last_name}
                                className=" border-0 mb-2 no-outline-on-hover align-bottom"
                                onChange={(e) => updateEmployee(e, 'last_name')}
                            />
                        </div>
                        <div className="d-flex align-items-center">
                            <h3 className="mb-0">Телефон: </h3>
                            <input
                                disabled={disable}
                                type="text"
                                placeholder={employee.phone}
                                className=" border-0 mb-2 no-outline-on-hover align-bottom"
                                onChange={(e) => updateEmployee(e, 'phone')}
                            />
                        </div>
                        <div className="d-flex align-items-center">
                            <h3 className="mb-0">Почта: </h3>
                            <input
                                disabled={disable}
                                type="text"
                                placeholder={employee.email}
                                className=" border-0  mb-2 no-outline-on-hover align-bottom"
                                onChange={(e) => updateEmployee(e, 'email')}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="d-flex  mr_auto align-items-center">
                                <h3 className="mb-0 mr_auto">Принят: </h3><form action=""></form>
                                <input
                                    disabled={disable}
                                    type="text"
                                    placeholder={employee.employment_date}
                                    className=" border-0 mb-2  p-0 no-outline-on-hover align-bottom"
                                    onChange={(e) => updateEmployee(e, 'employment_date')}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-sm  btn-outline-secondary"
                                onClick={() => setDisable(false)}
                            >
                                Редактировать
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm  btn-outline-secondary"
                                onClick={saveChanges}
                            >
                                <Link to={`/staff`} className=" mr-5 text-decoration-none text-dark "> Сохранить </Link>
                            </button>
                        </div>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg"
                             role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                             focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#55595c"></rect>
                            <text x="50%" y="50%" fill="#eceeef" dy=".3em">Фото</text>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
