import React, {useEffect, useState, useRef} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";



export default function CreateEmployee() {
    //API:
    const urlSaveUser = '/api/director/create-employee';
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
    const employmentDateRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    /**
     * useState для работы с должностями
     */
    const [allPositions, setAllPositions] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState('4');

    /**
     * useState для работы с ролями
     */
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState('4');

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
                console.log(data);
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
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);


    async function createStaff(event) {
        event.preventDefault();

        const dataForm = [];

        dataForm['position'] = positionRef.current.value;
        dataForm['firstName'] = firstNameRef.current.value;
        dataForm['lastName'] = lastNameRef.current.value;
        dataForm['roles'] = rolesRef.current.value;
        dataForm['login'] = loginRef.current.value;
        dataForm['email'] = emailRef.current.value;
        dataForm['phone'] = phoneRef.current.value;
        dataForm['employmentDate'] = employmentDateRef.current.value;
        dataForm['password'] = passwordRef.current.value;
        dataForm['passport'] = passportRef.current.value;


        let today = new Date();
        let x = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if(x < dataForm['employmentDate']){
            console.log('Нельзя указывать дату больше текущей');
            return;
        }
        if(dataForm['password'] !== password2Ref.current.value) {
            console.log('Пароли не совпадают');
            return
        }
        const answer = await setUser(urlSaveUser, dataForm);

        if(answer.ok && answer.saveUser === 'good'){
            console.log(answer);
            window.location.href = '/director/staff';
        }else{
            //действия, если пользователь не сохранен
            console.log(answer);
        }
    }

    async function setUser(url, dataForm){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {position: dataForm['position'], first_name: dataForm['firstName'],
                last_name: dataForm['lastName'], role_id: dataForm['roles'], username: dataForm['login'],
                email: dataForm['email'], phone: dataForm['phone'], employmentDate: dataForm['employmentDate'],
                password: dataForm['password'], passport: dataForm['passport'], _token}),
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
        <div className="width-1200 mx-4 mt-5 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <form onSubmit={createStaff}>
                    <Container className="w-100 m-0">
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={12}>
                                <h3>Форма добавления сотрудника в систему</h3>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="position" className="form-label">Должность</label>
                            </Col>
                            <Col xs={9}>
                                <select value={selectedPositions} onChange={e => setSelectedPositions(e.target.value)}
                                        className="form-select" aria-label="position" id="position" ref={positionRef}>
                                    {
                                        allPositions.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="firstName" className="form-label">Имя</label>
                            </Col>
                            <Col xs={9}>
                                <input type="text" required className="form-control" id="firstName" aria-describedby="emailHelp" ref={firstNameRef}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="lastName" className="form-label">Фамилия</label>
                            </Col>
                            <Col xs={9}>
                                <input type="text" required className="form-control" id="lastName" ref={lastNameRef}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="passport" className="form-label">Номер паспорта</label>
                            </Col>
                            <Col xs={9}>
                                <input type="text" required className="form-control" id="passport" ref={passportRef}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="login" className="form-label">login</label>
                            </Col>
                            <Col xs={9}>
                                <input type="text" required className="form-control" id="login" ref={loginRef}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="email" className="form-label">email</label>
                            </Col>
                            <Col xs={9}>
                                <input type="email" required className="form-control" id="email" ref={emailRef}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="phone" className="form-label">Телефон</label>
                            </Col>
                            <Col xs={9}>
                                <input type="text" required className="form-control" id="phone" ref={phoneRef}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="roles" className="form-label">Права доступа</label>
                            </Col>
                            <Col xs={9}>
                                <select value={selectedRoles} onChange={e => setSelectedRoles(e.target.value)}
                                        className="form-select" aria-label="roles" id="roles" ref={rolesRef}>
                                    {
                                        allRoles.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="employmentDate" className="form-label">Дата трудоустройства</label>
                            </Col>
                            <Col xs={9}>
                                <input type="date" required className="form-control" id="employmentDate" ref={employmentDateRef}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="password" className="form-label">Пароль</label>
                            </Col>
                            <Col xs={9}>
                                <input type="password" required className="form-control" id="password" ref={passwordRef}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>
                                <label htmlFor="password2" className="form-label">Повторите пароль</label>
                            </Col>
                            <Col xs={9}>
                                <input type="password" required className="form-control" id="password2" ref={password2Ref}/>
                            </Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={3}>

                            </Col>
                            <Col xs={3}>

                            </Col>
                            <Col xs={3}>
                                <button type="submit" className="mx-2 btn btn-primary">
                                    Добавить в систему
                                </button>
                            </Col>
                            <Col xs={3}>
                                <button type="submit" onClick={goBack} className="mx-2 btn btn-primary">
                                    Назад к сотрудникам
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </form>
            </div>
        </div>
    );
}

