import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

export default function Employee() {

    const { id } = useParams();
    console.log(id);

    const [employee, setEmployee] = useState([]);

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

    return <div className=" container my-5 col-md-6">
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
                <h3 className="d-inline-block mb-3 text-primary "> должность: {employee.role}</h3>
                <h3 className="mb-0">Имя: {employee.first_name}</h3>
                <h3 className="mb-0">Фамилия: {employee.last_name}</h3>
                <h3 className="mb-0">Телефон: {employee.phone}</h3>
                <h3 className="mb-0">Email: {employee.email}</h3>
                <div className="d-flex justify-content-end">
                    <h3 className="mb-0 custom-h3-style">employment date: {employee.employment_date}</h3>
                    <button type="button" className="btn btn-sm btn-md btn-outline-secondary">Редактировать</button>
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
