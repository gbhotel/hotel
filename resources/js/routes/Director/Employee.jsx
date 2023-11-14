import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";


export default function Employee() {
    const id = useParams().id;
    console.log(id)

    const [data, setData] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(`/api/director/employee/${id}`, {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error.message);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    function editUser() {
        window.location.href = `director/edit-employee/${id}`;
    }

    async function dismissEmployee(){
        const url = '/api/director/dismissEmployee';

        const dismissData = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( {id: id, _token})
        }

        let response = await fetch(url, dismissData);
        let answer = await response.json();

        console.log(answer);

        answer.ok = response.ok;
        answer.status = response.status;

        if(answer.ok && answer.delete === 'good'){
            console.log(answer);
            window.location.href = '/director/staff';
        }else{
            //действия, если пользователь не сохранен
            console.log(answer.status);
        }
    }

    function goBack(event) {
        event.preventDefault();
        window.location.href = '/director/staff';
    }

    return (
        <div className=" container my-5 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <div className=" d-flex  align-items-center form-group">
                        <p className="mb-0">Должность: {data.position}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0">Имя: {data.firstName} {data.lastName}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0">login: {data.username}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0">Email: {data.email}</p>
                    </div>
                    <div className="d-flex  mr_auto align-items-center">
                        <p className="mb-0">Верификация email: {data.emailVerifiedAt}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0">Телефон: {data.phone}</p>
                    </div>
                    <div className="d-flex  mr_auto align-items-center">
                        <p className="mb-0">Паспорт: {data.passport}</p>
                    </div>
                    <div className="d-flex  mr_auto align-items-center">
                        <p className="mb-0">Должность: {data.position}</p>
                    </div>
                    <div className="d-flex  mr_auto align-items-center">
                        <p className="mb-0">Доступ: {data.role}</p>
                    </div>
                    <div className="d-flex  mr_auto align-items-center">
                        <p className="mb-0">Зарегистрирован: {data.createdAt}</p>
                    </div>
                    <div className="d-flex  mr_auto align-items-center">
                        <p className="mb-0">Последнее обновление: {data.updatedAtt}</p>
                    </div>
                    <div className="d-flex  mr_auto align-items-center">
                        <p className="mb-0">Принат на работу: {data.employment_date}</p>
                    </div>
                    <button type="button" onClick={editUser} className="btn btn-sm btn-outline-secondary">
                        Редактировать данные
                    </button>
                    <button type="button" onClick={dismissEmployee} className="btn btn-sm btn-outline-secondary">
                        Уволить сотрудника
                    </button>
                    <button type="submit" onClick={goBack} className="mx-2 btn btn-primary">
                        Назад к сотрудникам
                    </button>
                </div>
            </div>
        </div>
    );
}
