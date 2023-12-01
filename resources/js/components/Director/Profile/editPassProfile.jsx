import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useDispatch} from "react-redux";
import {changeRender} from "../../../store/slices/director/directorRender.js";
import {establishAlertPass} from "../../../store/slices/director/alertPass";
import Alert from 'react-bootstrap/Alert';

export default function EditPassProfileDirector() {

    const urlEditPass = '/api/director/profile/change-password';

    //show и err для работы с уведомлением об ошибках
    const [show, setShow] = useState(false);
    const [err, setErr] = useState('');

    const dispatch = useDispatch();
    const profile = 'profile';
    const goodAlert = {
        condition: 'true',
        message:'Пароль успешно изменен',
    }
    const changeDataHandler = () => {
        dispatch(changeRender(profile))
    }
    const establishGoodAlertHandler = () => {
        dispatch(establishAlertPass(goodAlert))
    }

    async function sendForm(event){
        event.preventDefault()

        const pass1 = event.target.password1.value
        const pass2 = event.target.password2.value
        const pass3 = event.target.password3.value

        //Проверям длину пароля
        if(pass2.length < 3){
            setErr('Пароль не может быть меньше трех символов')
            setShow(true)
            return
        }else if(pass2.length > 15){
            setErr ('Пароль не может быть больше пятнадцати символов')
            setShow(true)
            return
        }
        //Проверям, что пароль повторили верно
        if(pass2 !== pass3){
            setShow(true)
            setErr('Вы не верно ввели пароль в поле "Повторите новый пароль"')
            return;
        }

        const dataForm = [];
        dataForm['password1'] = pass1;
        dataForm['password2'] = pass2;

        const answer = await updatePass(urlEditPass, dataForm);

        console.log(answer);

        if(answer.ok && answer.state === 'Good'){
            //Изменения сохранены
            console.log('Изменения сохранены');
            console.log(answer);
            establishGoodAlertHandler()
            changeDataHandler()
        }else{
            //действия, если пользователь не сохранен
            setErr(answer.message)
            setShow(true)
            console.log('Изменения не сохранены');
            console.log(answer);
        }

        console.log('Пока все хорошо, функция выполняется полностью')
    }

    async function updatePass(url, dataForm){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                _token,
                password1: dataForm['password1'],
                password2: dataForm['password2']}),
        };

        let response = await fetch(url, requestOptions);
        let answer = await response.json() // читаем ответ в формате JSON

        answer.ok = response.ok;
        answer.status = response.status;

        return answer;
    }

    //AlertError - Уведомление об ошибке
    function AlertError() {
        if (show) {
            return (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    {err}
                </Alert>
            );
        }
    }

    return (
        <>
            {AlertError(show)}
            <Container className="w-100 m-0">
                <Row className="align-items-center m-3 text-center" >
                    <Col xs={12}>
                        <h3>Изменение пароля</h3>
                    </Col>
                </Row>
                <Row className="align-items-start m-3 text-center" >
                    <Col className="mt-5" xs={3}>
                        <img width='250px' src="/img/picture/password.png" alt="Пароль"/>
                    </Col>
                    <Col xs={7}>
                        <form id="formEditPass" onSubmit={sendForm}>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={1}></Col>
                            <Col className="align-items-center mb-3 text-start" xs={10}>
                                <label htmlFor="password1" className="form-label">Введите станый пароль</label>
                                <input type="password"
                                       required
                                       className="form-control"
                                       aria-label="password1"
                                       id="password1"
                                />
                            </Col>
                            <Col xs={1}></Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={1}></Col>
                            <Col className="align-items-center mb-3 text-start" xs={10}>
                                <label htmlFor="password2" className="form-label">Введите новый пароль</label>
                                <input type="password"
                                       required
                                       className="form-control"
                                       aria-label="password2"
                                       id="password2"
                                />
                            </Col>
                            <Col xs={1}></Col>
                        </Row>
                        <Row className="align-items-center m-3 text-center" >
                            <Col xs={1}></Col>
                            <Col className="align-items-center mb-3 text-start" xs={10}>
                                <label htmlFor="password3" className="form-label">Повторите новый пароль</label>
                                <input type="password"
                                       required
                                       className="form-control"
                                       aria-label="password3"
                                       id="password3"
                                />
                            </Col>
                            <Col xs={1}></Col>
                        </Row>
                        </form>
                    </Col>
                    <Col xs={2}>
                        <Row className="align-items-center m-3 text-center" >
                            <Col className="mb-3" xs={12}>
                                <button type="submit" form="formEditPass" value="Update" className="w-100 btn btn-sm btn-outline-secondary">
                                    Изменить
                                </button>
                            </Col>
                            <Col className="mb-3" xs={12}>
                                <button type="button" onClick={changeDataHandler} className="w-100 btn btn-sm btn-outline-secondary">
                                    Отмена
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="align-items-center align-content-center m-3 text-center" >
                    <Col xs={2}></Col>
                    <Col className="text-gray" xs={8}>
                        <b>Рекомендации по уровню сложности пароля</b>
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <Row className="align-items-center align-content-center m-3 text-center" >
                    <Col xs={2}></Col>
                    <Col className="text-gray" xs={8}>
                        Пароль должен содержать не менее восьми символов. Кроме цифр, в пароле обязательно должны быть буквы разных регистров. Добавление символов !, ?, $, &, *, ^, %, - и + сильно повышают надежность.
                    </Col>
                    <Col xs={2}></Col>
                </Row>
            </Container>
        </>
    );
}
