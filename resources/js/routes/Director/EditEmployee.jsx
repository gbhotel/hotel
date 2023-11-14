import React, {useEffect, useState, useRef} from 'react';
import {Link, useParams} from "react-router-dom";
import {request} from "../../services/http.js";


export default function CreateEmployee() {

    const id = useParams();

    //API:
    const urlEditEmployee = '/api/director/edit-employee';
    const urlEmployee = `/api/director/employee/${id.id}`;
    const urlPositions = '/api/director/get-all-positions';
    const urlRoles = '/api/director/get-all-roles';

    /**
     * useRefs для работы с формой
     * @type {React.MutableRefObject<undefined>}
     */
    const positionRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passportRef = useRef();
    const loginRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const rolesRef = useRef();

    let staffId = useParams()


    /**
     * useState для работы с должностями
     */
    const [allPositions, setAllPositions] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState('1');

    /**
     * useState для работы с ролями
     */
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState('4');
    /**
     * useState для работы с ролями
     */
    const [employee, setEmployee] = useState([]);

    /**
     * Получаем сотрудника для отображения в форме
     */
    useEffect(() => {
        const abortController = new AbortController();

        fetch(urlEmployee, {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setEmployee(data);
                setSelectedPositions(data.positionId);
                setSelectedRoles(data.roleId);
                console.log(data)
            })
            .catch(error => {
                console.error(error.message);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    /**
     * Получаем должности для отображения в форме
     */
    useEffect(() => {
        const abortController = new AbortController();

        fetch(urlPositions, {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setAllPositions(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    /**
     * Получаем роли для отображения в форме
     */
    useEffect(() => {
        const abortController = new AbortController();

        fetch(urlRoles, {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setAllRoles(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    async function editStaff(event) {
        event.preventDefault();

        const dataForm = [];

        dataForm['position'] = positionRef.current.value;
        dataForm['firstName'] = firstNameRef.current.value;
        dataForm['lastName'] = lastNameRef.current.value;
        dataForm['roles'] = rolesRef.current.value;
        dataForm['login'] = loginRef.current.value;
        dataForm['email'] = emailRef.current.value;
        dataForm['phone'] = phoneRef.current.value;
        dataForm['passport'] = passportRef.current.value;
        dataForm['updated_at'] = new Date();
        dataForm['staffId'] = staffId['id'];
        dataForm['userId'] = employee['id_user'];

        const answer = await updataUser(urlEditEmployee, dataForm);

        if(answer.ok && answer.updataUser === 'good'){
            console.log(answer);
            window.location.href = '/director/staff';
        }else{
            //действия, если пользователь не сохранен
            console.log(answer.status);
        }
    }

    async function updataUser(url, dataForm){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {_token, position: dataForm['position'], first_name: dataForm['firstName'],
                last_name: dataForm['lastName'], role_id: dataForm['roles'], username: dataForm['login'],
                email: dataForm['email'], phone: dataForm['phone'], passport: dataForm['passport'],
                updated_at: dataForm['updated_at'], staffId: dataForm['staffId'], userId: dataForm['userId']}),
        };

        let response = await fetch(url, requestOptions);
        let answer = await response.json() // читаем ответ в формате JSON

        answer.ok = response.ok;
        answer.status = response.status;

        return answer;
    }

    function goBack(event) {
        event.preventDefault();
        window.location.href = '/director/staff';
    }

    return (
        <div className=" container my-5 col-md-6">
            <p style={{color: 'red'}}>добавить сообщение о изменении пользователя</p>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <h3>Форма изменения данных сотрудника в систему</h3>
                    <form onSubmit={editStaff}>
                        <div className="mb-3">
                            <label htmlFor="position" className="form-label">Должность</label>
                            <select value={selectedPositions} onChange={e => setSelectedPositions(e.target.value)}
                                    className="form-select" aria-label="position" id="position" ref={positionRef}>
                                {
                                    allPositions.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">Имя</label>
                            <input type="text" defaultValue={employee.firstName} required className="form-control" id="firstName" aria-describedby="emailHelp" ref={firstNameRef}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Фамилия</label>
                            <input type="text" defaultValue={employee.lastName} required className="form-control" id="lastName" ref={lastNameRef}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passport" className="form-label">Номер паспорта</label>
                            <input type="text" defaultValue={employee.passport} required className="form-control" id="passport" ref={passportRef}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">login</label>
                            <input type="text" defaultValue={employee.username} required className="form-control" id="login" ref={loginRef}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">email</label>
                            <input type="email" defaultValue={employee.email} required className="form-control" id="email" ref={emailRef}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Телефон</label>
                            <input type="text" defaultValue={employee.phone} required className="form-control" id="phone" ref={phoneRef}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roles" className="form-label">Права доступа</label>
                            <select value={selectedRoles} onChange={e => setSelectedRoles(e.target.value)}
                                    className="form-select" aria-label="roles" id="roles" ref={rolesRef}>
                                {
                                    allRoles.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <button type="submit" className="mx-2 btn btn-primary">
                            Изменить данные
                        </button>
                        <button type="submit" onClick={goBack} className="mx-2 btn btn-primary">
                            Назад к сотрудникам
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

