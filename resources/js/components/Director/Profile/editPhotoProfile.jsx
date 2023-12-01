import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {changeRender} from "../../../store/slices/director/directorRender.js";
// import ReactDOM from "react-dom/client.js";

export default function EditPhotoProfileDirector() {
    const profileState = useSelector(state => state.profile);
    const employee = profileState.profile;

    const dispatch = useDispatch();

    const profile = 'profile';
    const editData = 'editData';
    const editPass = 'editPass';

    const changeDataHandler = () => {
        dispatch(changeRender(profile))
    }
    const changeEditDataHandler = () => {
        dispatch(changeRender(editData))
    }
    const changeEditPassHandler = () => {
        dispatch(changeRender(editPass))
    }

    const [image, setImage] = useState("../" + employee.photo)
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    // const myForm = ReactDOM.createRoot(document.getElementById("formEditPhoto"));

    async function setPhoto(event){
        event.preventDefault()
        const urlEditPhoto = '/api/director/profile/change-photo';

        // const fileImg = {image:event.target[0].files[0]}
        // console.dir(fileImg)

        let input = document.getElementById('avatar')

        let formObj = new FormData()
        formObj.append('photo', input.files[0])

        const requestOptions = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': _token,
                "type": "formData"
                },
            body: formObj
        };

        let response = await fetch(urlEditPhoto, requestOptions);
        let answer = await response.json() // читаем ответ в формате JSON

        console.log(answer)

    }

    return (
        <Container className="w-100 m-0 mb-3">
            <Row className="align-items-center m-3 text-center" >
                <Col xs={12}>
                    <h3>Изменение фотографии</h3>
                </Col>
            </Row>
            <Row className="align-items-start text-center font-22" >
                <Col className="p-0 justify-content-center" xs={4}>
                    <Row className="d-flex align-items-center justify-content-center">
                        <Col xs={12} className="d-flex blue-color align-items-center justify-content-center" style={{width:'300px', height:'400px', overflow: 'hidden', borderRadius: '6px'}}>
                            <img style={{height:'400px'}} src={image} alt="Ваше фото"/>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-center my-2 justify-content-center">
                        <Col xs={12} style={{width:'300px', fontSize:'16px'}} className="d-flex align-items-center justify-content-center">
                            <label htmlFor="avatar" className="form-label">Выберите новую фотографию для своего профиля.</label>
                        </Col>
                    </Row>
                    <Row>
                        <form method="POST"
                              id="formEditPhoto"
                              name="formEditPhoto"
                              onSubmit={setPhoto}
                        >
                            <Col xs={12} className="d-flex align-items-center justify-content-center">
                                <div className="p-2" style={{width:'300px'}}>
                                    <input type="file"
                                           onChange={onImageChange}
                                           required
                                           className="form-control"
                                           aria-label="avatar"
                                           id="avatar"
                                           accept="image/*"
                                        // ref={firstNameRef}
                                    />
                                </div>
                            </Col>
                        </form>
                    </Row>
                    <Row>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="p-2" style={{width:'300px'}}>
                                <button type="submit"
                                        form="formEditPhoto"
                                        // onClick={setPhoto}
                                        className="w-100 btn btn-sm btn-outline-secondary"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="p-2" style={{width:'300px'}}>
                                <button type="button" onClick={changeDataHandler} className="w-100 btn btn-sm btn-outline-secondary">
                                    Отмена
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className="text-gray" xs={6}>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Табельный номер
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{'000' + employee.id}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Должность
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.position}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Имя
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.first_name}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Фамилия
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.last_name}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Дата рождения
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.birthdayAt}</b>
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
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Пол
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.gender}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            № паспорта
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.passport}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Username
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.username}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            № телефона
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.phone}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Email
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.email}</b>
                        </Col>
                    </Row>
                    <Row className="align-items-center m-2" >
                        <Col className="text-start" xs={6}>
                            Трудоустроен с
                        </Col>
                        <Col className="text-start" xs={6}>
                            <b>{employee.employment}</b>
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
                </Col>
                <Col xs={2}>
                    <Row className="align-items-center" >
                        <Col xs={12}>
                            <div className="p-2">
                                <button type="button" onClick={changeEditDataHandler} className="w-100 btn btn-sm btn-outline-secondary">
                                    Изменить данные
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center" >
                        <Col xs={12}>
                            <div className="p-2">
                                <button type="button" disabled={true} className="w-100 btn btn-sm btn-outline-secondary">
                                    Изменить фото
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center" >
                        <Col xs={12}>
                            <div className="p-2">
                                <button type="button" onClick={changeEditPassHandler} className="w-100 btn btn-sm btn-outline-secondary">
                                    Изменить пароль
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
