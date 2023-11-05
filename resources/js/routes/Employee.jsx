import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

export default function Employee() {

    const { id } = useParams();
    console.log(id);

    const [employee, setEmployee] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({});

    const handleEdit = (field, value) => {
        setEditedEmployee({ ...editedEmployee, [field]: value });
    };

    const saveChanges = () => {
        fetch(`/api/admin/employee/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedEmployee),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setEmployee(data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    useEffect(() => {
        const abortController = new AbortController();

        fetch(`/api/admin/employee/${id}`, { signal: abortController.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setEmployee(data);
                console.log(employee);
            })
            .catch((error) => {
                console.error(error);
            },[]);

        return () => {
            abortController.abort();
        }
    }, []);

    if (!employee) {
        return <div>Loading...</div>;
    }

    if(isEditing) {
        return <div className=" container my-5 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    {/*<div className="d-flex align-items-center">*/}
                    {/*    <h3 className="mb-0">Должность:</h3>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder={employee.role}*/}
                    {/*        value={editedEmployee.role}*/}
                    {/*        className=" border-0 bg-light no-outline-on-hover align-bottom"*/}
                    {/*        onChange={(e) => handleEdit('role', e.target.value) }*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="d-flex mt-1 align-items-center">
                        <h3 className="mb-0">Имя:</h3>
                        <input
                            type="text"
                            placeholder={employee.first_name}
                            value={editedEmployee.first_name}
                            className=" border-0 bg-light no-outline-on-hover align-bottom"
                            onChange={(e) => handleEdit('first_name', e.target.value)}
                        />
                    </div>
                    <div className="d-flex mt-1 align-items-center">
                        <h3 className="mb-0">Фамилия:</h3>
                        <input
                            type="text"
                            placeholder={employee.last_name}
                            value={editedEmployee.last_name}
                            className=" border-0 bg-light no-outline-on-hover align-bottom"
                            onChange={(e) => handleEdit('last_name', e.target.value)}
                        />
                    </div>
                    <div className="d-flex mt-1 align-items-center">
                        <h3 className="mb-0">Телефон:</h3>
                        <input
                            type="text"
                            placeholder={employee.phone}
                            value={editedEmployee.phone}
                            className=" border-0 bg-light no-outline-on-hover align-bottom"
                            onChange={(e) => handleEdit('phone', e.target.value)}
                        />
                    </div>
                    <div className="d-flex mt-1 align-items-center">
                        <h3 className="mb-0">Почта:</h3>
                        <input
                            type="text"
                            placeholder={employee.email}
                            value={editedEmployee.email}
                            className=" border-0 bg-light no-outline-on-hover align-bottom"
                            onChange={(e) =>
                                handleEdit('email', e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <div className="d-flex  mr_auto align-items-center">
                            <h3 className="mb-0 mr_auto">Дата приема на работу:</h3>
                            <input
                                type="text"
                                placeholder={employee.employment_date}
                                value={editedEmployee.employment_date}
                                className=" border-0 bg-light no-outline-on-hover align-bottom"
                                onChange={(e) => handleEdit('employment_date', e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn   btn-sm  btn-outline-secondary"
                            onClick={saveChanges}
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            className="btn  btn-sm btn-outline-secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg"
                         role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                         focusable="false"><title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c"></rect>
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Фото</text>
                    </svg>
                </div>
            </div>
        </div>
    } else {
        return <div className=" container my-5 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="d-inline-block mb-0 h-37"> должность: {employee.role}</h3>
                    <h3 className="mb-0 h-37">Имя: {employee.first_name}</h3>
                    <h3 className="mb-0 h-37">Фамилия: {employee.last_name}</h3>
                    <h3 className="mb-0 h-37">Телефон: {employee.phone}</h3>
                    <h3 className="mb-0 h-37">Почта: {employee.email}</h3>
                    <div className="d-flex h-37 justify-content-end">
                        <h3 className="mb-0 mr_auto">Дата приема на работу: {employee.employment_date}</h3>
                        <button
                            type="button"
                            className="btn  btn-sm btn-md btn-outline-secondary"
                            onClick={() => setIsEditing(true)}
                        >
                            Редактировать
                        </button>
                        <button type="button" className="btn btn-sm btn-md btn-outline-secondary">Удалить</button>
                    </div>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg"
                         role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                         focusable="false"><title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c"></rect>
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Фото</text>
                    </svg>
                </div>
            </div>
        </div>
    }

}
