import React, {useEffect, useRef, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {changeRender} from "../../../store/slices/director/directorRender.js";

export default function EditDataProfileDirector() {
    const profileState = useSelector(state => state.profile);

    const dispatch = useDispatch();

    const profile = 'profile';

    const changeDataHandler = () => {
        dispatch(changeRender(profile))
    }

    const employee = profileState.profile;

    const urlEditEmployee = '/api/director/profile/get-update-my-data';
    const urlPositions = '/api/director/get-all-positions';
    const urlRoles = '/api/director/get-all-roles';

    const positionRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passportRef = useRef();
    const loginRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const rolesRef = useRef();
    const birthdayRef = useRef();
    const genderRef = useRef();
    const employmentRef = useRef();


    /**
     * useState для работы с должностями
     */
    const [allPositions, setAllPositions] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState('1');

    /**
     * useState для работы с ролями
     */
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState('1');

    /**
     * Получаем должности для отображения в форме
     */
    useEffect(() => {
        const abortController = new AbortController();

        fetch(urlPositions,
            {signal: abortController.signal,}
        )
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
        dataForm['birthday'] = birthdayRef.current.value;
        dataForm['gender'] = genderRef.current.value;
        dataForm['employment'] = employmentRef.current.value;
        dataForm['updated_at'] = new Date();
        dataForm['userId'] = employee.id;

        const answer = await updataUser(urlEditEmployee, dataForm);

        if(answer.ok && answer.updataUser === 'good'){
            //Изменения сохранены
            console.log('Изменения сохранены');
            console.log(answer);
            changeDataHandler()
        }else{
            //действия, если пользователь не сохранен
            console.log('Изменения не сохранены');
            console.log(answer);
        }
    }

    async function updataUser(url, dataForm){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                _token,
                position: dataForm['position'],
                first_name: dataForm['firstName'],
                last_name: dataForm['lastName'],
                role_id: dataForm['roles'],
                username: dataForm['login'],
                email: dataForm['email'],
                phone: dataForm['phone'],
                passport: dataForm['passport'],
                birthday: dataForm['birthday'],
                gender: dataForm['gender'],
                employment_date: dataForm['employment'],
                updated_at: dataForm['updated_at'],
                userId: dataForm['userId']}),
        };

        let response = await fetch(url, requestOptions);
        let answer = await response.json() // читаем ответ в формате JSON

        answer.ok = response.ok;
        answer.status = response.status;

        return answer;
    }

    let employmentDate1 = employee.employment;
    let employmentDate2 = employmentDate1.split('.');
    let employmentDate3 = new Date(employmentDate2[2], employmentDate2[1] - 1, employmentDate2[0]);
    let Y = employmentDate3.getFullYear()
    let M = employmentDate3.getMonth()+1
    let D = employmentDate3.getDate()
    if(M <10){M = '0' + M}
    let employmentDate4 = `${Y}-${M}-${D}`

    let birthdayAtDate1 = employee.birthdayAt;
    let birthdayAtDate2 = birthdayAtDate1.split('.');
    let birthdayAtDate3 = new Date(birthdayAtDate2[2], birthdayAtDate2[1] - 1, birthdayAtDate2[0]);
    Y = birthdayAtDate3.getFullYear()
    M = birthdayAtDate3.getMonth()+1
    D = birthdayAtDate3.getDate()
    if(M <10){M = '0' + M}
    let birthdayAtDate4 = `${Y}-${M}-${D}`

    const [employment, setEmployment] = useState(employmentDate4)
    const [birthdayAt, setBirthdayAt] = useState(birthdayAtDate4)
    const [gender, setGender] = useState(employee.gender)

    return (
        <Container className="w-100 m-0 mb-3">
            <Row className="align-items-center m-3 text-center" >
                <Col xs={12}>
                    <h3>Изменение личных данных</h3>
                </Col>
            </Row>
            <Row className="align-items-start text-center font-22" >
                <Col className="p-0 d-flex justify-content-center" xs={4}>
                    <div className="d-flex justify-content-center" style={{width:'300px', height:'400px', overflow: 'hidden', borderRadius: '6px'}}>
                        <img style={{height:'400px'}} src={"../" + employee.photo} alt="Ваше фото"/>
                    </div>
                </Col>
                <Col xs={6}>
                    <form id="formEditProfile" onSubmit={editStaff}>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Табельный номер
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{'000' + employee.id}</b>
                        </Col>
                    </Row>
                    {/*Должность*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="position" className="form-label">Должность</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <select value={selectedPositions}
                                    onChange={e => setSelectedPositions(e.target.value)}
                                    className="form-select"
                                    aria-label="position"
                                    id="position"
                                    ref={positionRef}>
                                {
                                    allPositions.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </Col>
                    </Row>
                    {/*Имя*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="firstName" className="form-label">Имя</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <input type="text"
                                   defaultValue={employee.first_name}
                                   required
                                   className="form-control"
                                   aria-label="firstName"
                                   id="firstName"
                                   ref={firstNameRef}/>
                        </Col>
                    </Row>
                    {/*Фамилия*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="lastName" className="form-label">Фамилия</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <input type="text"
                                   defaultValue={employee.last_name}
                                   required
                                   className="form-control"
                                   aria-label="lastName"
                                   id="lastName"
                                   ref={lastNameRef}/>
                        </Col>
                    </Row>
                    {/*Дата рождения*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="birthday" className="form-label">Дата рождения</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <input type="date"
                                   defaultValue={birthdayAt}
                                   onChange={(e) => setBirthdayAt(e.target.value)}
                                   required
                                   className="form-control"
                                   aria-label="birthday"
                                   id="birthday"
                                   ref={birthdayRef}
                            />
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Возрост
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.age}</b>
                        </Col>
                    </Row>
                    {/*Пол*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="gender" className="form-label">Пол</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <select value={gender}
                                    onChange={e => setGender(e.target.value)}
                                    required
                                    className="form-select"
                                    aria-label="gender"
                                    id="gender"
                                    ref={genderRef}
                            >
                                <option key={'м'} value={'м'}>м</option>
                                <option key={'ж'} value={'ж'}>ж</option>
                            </select>
                        </Col>
                    </Row>
                    {/*passport*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="passport" className="form-label">Номер паспорта</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <input type="text"
                                   defaultValue={employee.passport}
                                   required
                                   className="form-control"
                                   aria-label="passport"
                                   id="passport"
                                   ref={passportRef}/>
                        </Col>
                    </Row>
                    {/*Username*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="login" className="form-label">Username</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <input type="text"
                                   defaultValue={employee.username}
                                   required
                                   className="form-control"
                                   aria-label="login"
                                   id="login"
                                   ref={loginRef}/>
                        </Col>
                    </Row>
                    {/*phone*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="phone" className="form-label">Телефон</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <input type="text"
                                   defaultValue={employee.phone}
                                   required
                                   className="form-control"
                                   aria-label="phone"
                                   id="phone"
                                   ref={phoneRef}/>
                        </Col>
                    </Row>
                    {/*email*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="email" className="form-label">email</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <input type="email"
                                   defaultValue={employee.email}
                                   required
                                   className="form-control"
                                   aria-label="email"
                                   id="email"
                                   ref={emailRef}/>
                        </Col>
                    </Row>
                    {/*Role*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="roles" className="form-label">Права доступа</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <select value={selectedRoles}
                                    onChange={e => setSelectedRoles(e.target.value)}
                                    required
                                    className="form-select"
                                    aria-label="roles"
                                    id="roles"
                                    ref={rolesRef}>
                                {
                                    allRoles.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </Col>
                    </Row>
                    {/*Трудоустроен с*/}
                    <Row className="align-items-center m-2 bg-info bg-opacity-25" >
                        <Col className="text-start" xs={6}>
                            <label htmlFor="employment" className="form-label">Трудоустроен с</label>
                        </Col>
                        <Col className="text-start" xs={6}>
                            <input type="date"
                                   defaultValue={employment}
                                   onChange={(e) => setEmployment(e.target.value)}
                                   required
                                   className="form-control"
                                   aria-label="employment"
                                   id="employment"
                                   ref={employmentRef}
                            />
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Стаж
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.experience}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Зарегестрирован
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.createdAt}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Изменено
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.updatedAt}</b>
                        </Col>
                    </Row>
                    </form>
                </Col>
                <Col xs={2}>
                    <Row className="align-items-center" >
                        <Col xs={12}>
                            <div className="p-2">
                                <button type="submit" form="formEditProfile" value="Update" className="w-100 btn btn-sm btn-outline-secondary">
                                    Сохранить
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center" >
                        <Col xs={12}>
                            <div className="p-2">
                                <button type="button" onClick={changeDataHandler} className="w-100 btn btn-sm btn-outline-secondary">
                                    Отмена
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
