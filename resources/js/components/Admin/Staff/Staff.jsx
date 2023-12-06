import React, {useEffect, useRef, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {Link} from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

export default function Staff() {

    // const alertPassState = useSelector(state => state.alertPass);
    // // const [alertShow, setAlertShow] = useState(alertPassState.condition);
    // // const [alertMessage, setAlertMessage] = useState(alertPassState.message);
    // let alertShow = alertPassState.condition;
    // const alertMessage = alertPassState.message;
    //
    // const dispatch = useDispatch();
    //
    // const editData = 'editData';
    // const editPhoto = 'editPhoto';
    // const editPass = 'editPass';
    // const clearAlert = {condition: false, message:'',}
    //
    // const changeEditDataHandler = () => {
    //     dispatch(changeRender(editData))
    // }
    // const changeEditPhotoHandler = () => {
    //     dispatch(changeRender(editPhoto))
    // }
    // const changeEditPassHandler = () => {
    //     dispatch(changeRender(editPass))
    // }
    //
    // const clearAlertHandler = () => {
    //     dispatch(establishAlertPass(clearAlert))
    // }
    //
    // const [employee, setEmployee] = useState({});
    //
    // useEffect(() => {
    //     const abortController = new AbortController();
    //     fetch(`/api/director/profile/get-my-data`, {
    //         signal: abortController.signal,
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`Network response was not ok: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setEmployee(data)
    //             dispatch(changeData(data))
    //         })
    //         .catch(error => {
    //             console.error(error.message);
    //         });
    //     return () => {
    //         abortController.abort();
    //     }
    // }, []);
    //
    // function alertGood() {
    //     if (alertShow) {
    //         return (
    //             <Alert variant="success" onClick={clearAlertHandler} dismissible>
    //                 {alertMessage}
    //             </Alert>
    //         );
    //     }
    // }

    const [data, setData] = useState([]);

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

    const strDate = dateToStr(new Date());

    function dateToStr(dataObj){
        let Y = dataObj.getFullYear()
        let M = dataObj.getMonth()+1
        let D = dataObj.getDate()
        if(M < 10) {M = '0' + M}
        if(D < 10) {D = '0' + D}
        return `${Y}-${M}-${D}`
    }

    let now = new Date()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    if(h < 10) {h = '0' + h}
    if(m < 10) {m = '0' + m}
    if(s < 10) {s = '0' + s}
    let strTime = `${h}:${m}:${s}`

    const [date, setDate] = useState(strDate)
    const [time, setTime] = useState(strTime)

    const refDate = useRef();
    const refTime = useRef();
    const refEmployee = useRef()

    const urlWorkingIn = '/api/admin/staff/working-in';
    const urlWorkingOut = '/api/admin/staff/working-out';

    async function setWorkingIn (event){
        event.preventDefault();
        const setBodyFetch = []
        setBodyFetch['workingIn'] = refDate.current.value + ' ' + refTime.current.value;
        setBodyFetch['employee'] =  data[refEmployee.current.value].id;
        setBodyFetch['beginning'] = data[refEmployee.current.value].working.beginning
        setBodyFetch['end'] = data[refEmployee.current.value].working.end

        console.log(setBodyFetch)

        const answer = await sendData(urlWorkingIn, setBodyFetch);

        if(answer.ok && answer['answer']){
            //Изменения сохранены
            console.log('Изменения сохранены');
            console.log(answer);
        }else{
            //действия, если пользователь не сохранен
            console.log('Изменения не сохранены');
            console.log(answer);
        }
    }

    async function setWorkingOut (event){
        event.preventDefault();
        const setBodyFetch = []
        setBodyFetch['workingIn'] = refDate.current.value + ' ' + refTime.current.value;
        setBodyFetch['employee'] =  data[refEmployee.current.value].id;
        setBodyFetch['beginning'] = data[refEmployee.current.value].working.beginning
        setBodyFetch['end'] = data[refEmployee.current.value].working.end

        console.log(setBodyFetch)

        const answer = await sendData(urlWorkingOut, setBodyFetch);

        if(answer.ok && answer['answer']){
            //Изменения сохранены
            console.log('Изменения сохранены');
            console.log(answer);
        }else{
            //действия, если пользователь не сохранен
            console.log('Изменения не сохранены');
            console.log(answer);
        }
    }

    async function sendData(url, setData){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                _token,
                work_in: setData['workingIn'],
                id_staff: setData['employee'],
                beginning : setData['beginning'],
                end : setData['end'],
            }),
        }

        console.log(requestOptions)

        let response = await fetch(url, requestOptions);
        let answer = await response.json() // читаем ответ в формате JSON

        answer.ok = response.ok;
        answer.status = response.status;

        return answer;
    }

    //Форма для отметки прибытия на работу
    const workingIn = (targetEl) => {

        return (<>
            <form id="workInForm" name="workInForm" className="my-4" onSubmit={setWorkingIn}>
                <Row className="align-items-center justify-content-center text-center disabled">
                    <Col xs={3}>
                        <label htmlFor="date">Дата</label>
                    </Col>
                    <Col xs={3}>
                        <label htmlFor="time">Время</label>
                    </Col>
                    <Col xs={4}>
                        {/*<label htmlFor="violation">Нарущение</label>*/}
                    </Col>
                    <Col xs={2}>
                        {/*Действие*/}
                    </Col>
                </Row>
                <Row className="align-items-center justify-content-center mb-3 text-center">
                    <Col xs={3}>
                        <input type="date" id="date" defaultValue={date} onChange={(e) => setDate(e.target.value)} ref={refDate} className="form-control"/>
                    </Col>
                    <Col xs={3}>
                        <input type="time" id="time" defaultValue={time} onChange={(e) => setTime(e.target.value)} ref={refTime} className="form-control"/>
                    </Col>
                    <Col xs={2}>
                        {/*<input type="checkbox" name="violation" ref={refViolation} />*/}
                    </Col>
                    <Col xs={2}>
                        <input type="hidden" id="id_staff" value={targetEl} ref={refEmployee}/>
                    </Col>
                    <Col xs={2}>
                        <input type="submit" value="Прибытие" className="form-control"/>
                    </Col>
                </Row>
            </form>
        </>)
    }

    //Форма для отметки ухода с работы
    const workingOut = (targetEl) => {

        return (<>
            <form id="workOutForm" className="my-4" onSubmit={setWorkingOut}>
                {/*<b><p className="p-0 m-0" >Отметить конец рабочей смены {date} {time}</p></b>*/}
                <Row className="align-items-center justify-content-center text-center">
                    <Col xs={3}>
                        Дата
                    </Col>
                    <Col xs={3}>
                        Время
                    </Col>
                    <Col xs={2}>
                        {/*Нарущение*/}
                    </Col>
                    <Col xs={2}>
                        {/*Нарущение*/}
                    </Col>
                    <Col xs={2}>
                        {/*Действие*/}
                    </Col>
                </Row>
                <Row className="align-items-center justify-content-center mb-3 text-center">
                    <Col xs={3}>
                        <input type="date" defaultValue={date} onChange={(e) => setDate(e.target.value)} ref={refDate} className="form-control"/>
                    </Col>
                    <Col xs={3}>
                        <input type="time" defaultValue={time} onChange={(e) => setTime(e.target.value)} ref={refTime} className="form-control"/>
                    </Col>
                    <Col xs={2}>
                        {/*<input type="checkbox" name="violation" ref={refViolation} />*/}
                    </Col>
                    <Col xs={2}>
                        <input type="hidden" id="id_staff" value={targetEl} ref={refEmployee}/>
                    </Col>
                    <Col xs={2}>
                        <input type="submit"  value="Уход" className="form-control"/>
                    </Col>
                </Row>
            </form>
        </>)
    }

    const [render, setRender] = useState()

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>{
            console.log(eventKey)

            let beginningStr;
            let endStr;
            let work_inStr;
            let work_outStr;

            //Для изменения формата даты переводим их в объекты
            if(data[eventKey].working.beginning !== null){
                const beginningObj = new Date(data[eventKey].working.beginning)
                beginningStr = dateToStr(beginningObj)
            }else{
                beginningStr = false
            }
            if(data[eventKey].working.end !== null){
                const endObj = new Date(data[eventKey].working.end)
                endStr = dateToStr(endObj)
            }else{
                endStr = false
            }
            if(data[eventKey].working.work_in !== null){
                const work_inObj = new Date(data[eventKey].working.work_in)
                work_inStr = dateToStr(work_inObj)
            }else{
                work_inStr = false
            }
            if(data[eventKey].working.work_out !== null){
                const work_outObj = new Date(data[eventKey].working.work_out)
                work_outStr = dateToStr(work_outObj)
            }else{
                work_outStr = false
            }

            const todayStr = dateToStr(new Date())

            if(todayStr === beginningStr || todayStr === endStr){
                console.log('Сегодня есть смена')
                if(work_inStr === false && work_outStr === false){
                    console.log('Сегодня прийдет на смену')
                    setRender(workingIn(eventKey))
                }
                if(todayStr === work_inStr && todayStr !== work_outStr){
                    console.log('Сейчас на смене')
                    setRender(workingOut(eventKey))
                }
                if(work_inStr !== false && todayStr === work_outStr){
                    console.log('Сегодня ушел со смены')
                    setRender(<p>Все отметки проставлены</p>)
                }
            }else{
                console.log('Сегодня нет смены')
                setRender(<p>Нельзя отметить смену если ее нет в графике</p>)
            }
        });

        return (
            <button type="button" onClick={decoratedOnClick} className="w-100 btn btn-sm btn-outline-secondary">
                {children}
            </button>
        );
    }

    return (
        <>
            {/*{alertGood()}*/}
            <Container className="w-100 m-0 mb-3" >
                <Row className="align-items-center m-3 text-start" >
                    <Col xs={12}>
                        <h3>Штат сотрудников</h3>
                    </Col>
                </Row>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Row className="align-items-center text-start" >
                                <Col xs={1}>
                                    <p className="m-0"><b>Таб. №</b></p>
                                </Col>
                                <Col xs={2}>
                                    <p className="m-0"><b>Должность</b></p>
                                </Col>
                                <Col xs={2}>
                                    <p className="m-0"><b>Имя Фамилия</b></p>
                                </Col>
                                <Col xs={2}>
                                    <p className="m-0"><b>Телефон</b></p>
                                </Col>
                                <Col xs={1}>
                                    <p className="m-0"><b>Статус</b></p>
                                </Col>
                                <Col xs={1}>
                                    <p className="m-0"><b>Факт</b></p>
                                </Col>
                                <Col className="text-center" xs={3}>
                                    <p className="m-0"><b>Действия</b></p>
                                </Col>
                            </Row>
                        </Card.Header>
                    </Card>
                    {data.map((item, index) => (
                        <Card key={index}>
                            <Card.Header>
                                <Row key={index} className="align-items-center text-start" >
                                    <Col xs={1}>
                                        <p className="m-0" >000{item.id}</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p className="m-0">{item.position}</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p className="m-0">{item.first_name} {item.last_name}</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p className="m-0" >{item.phone}</p>
                                    </Col>
                                    <Col xs={1}>
                                        <p className="m-0" >{item.status}</p>
                                    </Col>
                                    <Col xs={1}>
                                        <p className="m-0 p-0" >{item.statusFact}</p>
                                    </Col>
                                    <Col className="text-center" xs={3}>
                                        <Row className="align-items-center justify-content-center text-center">
                                            <Col xs={6}>
                                                {/*<button type="button" className="w-100 btn btn-sm btn-outline-secondary">*/}
                                                    <Link to={`/employee/${index}`} className="text-decoration-none w-100 btn btn-sm btn-outline-secondary">Карточка</Link>
                                                {/*</button>*/}
                                            </Col>
                                            <Col xs={6} >
                                                <CustomToggle className="w-100 btn btn-sm btn-outline-secondary" eventKey={index}>Время</CustomToggle>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index}>
                                <Card.Body>
                                    {render}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
            </Container>
        </>
    );
}
