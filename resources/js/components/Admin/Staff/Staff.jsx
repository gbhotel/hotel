import React, {useEffect, useRef, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

export default function Staff() {

    const [data, setData] = useState([]);
    const [dateTime, setDateTime] = useState([])
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [stateAnswer, setStateAnswer] = useState('info')


    useEffect(() => {
        fetch('/api/admin/staff', {
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(createArrAction(data));
            })
            .catch(error => {
                console.error(error);
            });

    }, [dateTime]);

    //Дата и время по умолчанию для полей выбода даты и времени
    const strDate = dateToStr(new Date());
    const strTime = timeToStr(new Date());

    const urlWorkingIn = '/api/admin/staff/working-in';
    const urlWorkingOut = '/api/admin/staff/working-out';

    async function setWorking (url, arr){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
                _token,
                id_staff: arr['id_staff'],
                work: arr['dateTime'],
                beginning: arr['beginning'],
                end: arr['end'],
        })};

        const answer = await sendData(url, requestOptions);

        if(answer.ok && answer['answer']){
            //Изменения сохранены
            console.log('Изменения сохранены');
            console.log(answer);
            setStateAnswer('success')
            setMessage(answer.message)
            setShow(true)
        }else{
            //действия, если пользователь не сохранен
            console.log('Изменения не сохранены');
            console.log(answer);
            setStateAnswer('danger')
            setMessage(answer.message)
            setShow(true)
        }
    }

    async function sendData (url, data)  {

        let response = await fetch(url, data);
        let answer = await response.json()

        answer.ok = response.ok;
        answer.status = response.status;

        return answer;
    }

    function setWorkingData(event){
        event.preventDefault();

        const arr = []
        arr['action'] = event.target.action.value
        arr['id_staff'] = data[event.target.id_staff.value].id
        arr['dateTime'] = event.target.date.value + ' ' + event.target.time.value
        arr['beginning'] = data[event.target.id_staff.value].working.beginning
        arr['end'] = data[event.target.id_staff.value].working.end
        setDateTime(arr)

        if(arr['action'] === 'приход'){
            setWorking(urlWorkingIn, arr)
        }else if (arr['action'] === 'уход'){
            setWorking(urlWorkingOut, arr)
        }
    }

    function AlertMessage() {
        if (show) {
            return (
                <Alert variant={stateAnswer} onClose={() => setShow(false)} dismissible>
                    <p className="p-0 m-0">
                        {message}
                    </p>
                </Alert>
            );
        }
    }

    return (
        <>
            {AlertMessage()}
            <Container className="w-100 m-0 mb-3" >
                <Row className="align-items-center m-3 text-start" >
                    <Col xs={12}>
                        <h3>Штат сотрудников</h3>
                    </Col>
                </Row>
                <Row className="align-items-center text-start" >
                    <Col xs={2}>
                        <p className="m-0"><b>Должность</b></p>
                    </Col>
                    <Col xs={2}>
                        <p className="m-0"><b>Имя Фамилия</b></p>
                    </Col>

                    <Col xs={1}>
                        <p className="m-0"><b>Статус</b></p>
                    </Col>
                    <Col className="text-center" xs={2}>
                        <p className="m-0"><b>Данные</b></p>
                    </Col>
                    <Col className="text-center" xs={5}>
                        <p className="m-0"><b>Отметить время прихода/ухода</b></p>
                    </Col>
                </Row>
                {data.map((item, index) => (
                    <Row key={index} className="align-items-center text-start" >
                        <Col xs={2}>
                            <p className="m-0">{item.position}</p>
                        </Col>
                        <Col xs={2}>
                            <p className="m-0">{item.first_name} {item.last_name}</p>
                        </Col>
                        <Col xs={1}>
                            <p className="m-0" >{item.status}</p>
                        </Col>
                        <Col xs={2}>
                            <Link to={`/employee/${item.id}`} className="text-decoration-none w-100 btn btn-sm btn-outline-secondary">Карточка</Link>
                        </Col>
                        <Col xs={5}>
                            <form id="workForm"
                                  className="my-2"
                                  onSubmit={setWorkingData}
                            >
                                <input type="hidden"
                                       id="id_staff"
                                       value={index}
                                />
                                <input type="hidden"
                                       id="action"
                                       value={item.action}
                                />
                                <Row>
                                    <Col xs={4}>
                                        <input type="date"
                                               id="date"
                                               defaultValue={strDate}
                                               disabled={item.disabled}
                                               className={`form-control ${item.borderColor}`}
                                        />
                                    </Col>
                                    <Col xs={4}>
                                        <input type="time"
                                               id="time"
                                               defaultValue={strTime}
                                               disabled={item.disabled}
                                               className={`form-control ${item.borderColor}`}
                                        />
                                    </Col>
                                    <Col xs={4}>
                                        <button type="submit"
                                                disabled={item.disabled}
                                                className={`w-75 h-100 btn btn-sm ${item.buttonColor}`}
                                        >
                                            {item.action}
                                        </button>
                                    </Col>
                                </Row>
                            </form>
                        </Col>
                    </Row>
                ))}
            </Container>
        </>
    );
}

/**
 * Принимает объект DateTime и возвращает строку с датой в стандартном формате
 * @param dataObj объект DateTime
 * @returns {string} строка с датой в стандартном формате
 */
function dateToStr(dataObj){
    let Y = dataObj.getFullYear()
    let M = dataObj.getMonth()+1
    let D = dataObj.getDate()
    if(M < 10) {M = '0' + M}
    if(D < 10) {D = '0' + D}
    return `${Y}-${M}-${D}`
}

/**
 * Принимает объект DateTime и возвращает строку с временем в стандартном формате
 * @param dataObj объект DateTime
 * @returns {string} строка с временем в стандартном формате
 */
function timeToStr(dataObj){
    let H = dataObj.getHours()
    let M = dataObj.getMinutes()
    let S = dataObj.getSeconds()
    if(H < 10) {H = '0' + H}
    if(M < 10) {M = '0' + M}
    if(S < 10) {S = '0' + S}
    return `${H}:${M}:${S}`
}

/**
 * Добавляет в объекты сотрудников статус и действие, которое нужно делать (отметить приход/уход)
 * @param data массив с сотрудниками
 * @returns {*[]} массив сотрудников с добавлеными статусом и действием
 */
function createArrAction(data){
    const todayObj = new Date();
    const todayStrD = dateToStr(todayObj)
    const arr = [...data]
    for(let i = 0; i < data.length; i++){
        let beginningObj = new Date(data[i].working.beginning);
        let beginningStrD = dateToStr(beginningObj)
        let endObj = new Date(data[i].working.end);
        let endStrD = dateToStr(endObj)

        let workInObj;
        let workInStrD
        if(data[i].working.work_in !== null){
            workInObj = new Date(data[i].working.work_in);
            workInStrD = dateToStr(workInObj)
        }else{
            workInObj = null;
            workInStrD = null
        }

        let workOutObj
        let workOutStrD
        if(data[i].working.work_out !== null){
            workOutObj = new Date(data[i].working.work_out);
            workOutStrD = dateToStr(workOutObj)
        }else{
            workOutObj = null;
            workOutStrD = null
        }

        if((todayStrD === beginningStrD && todayStrD === endStrD) || (todayStrD === beginningStrD && todayStrD !== endStrD) || (todayStrD !== beginningStrD && todayStrD === endStrD)){
            if(workInObj !== null && workOutObj !== null){
                actionFinish(arr[i])    //все отметки проставлены
            }
            else if(workInObj !== null && workOutObj === null){
                if(todayObj <= endObj){
                    actionShiftOut(arr[i])   //На смене/уход
                }else if (todayObj > endObj){
                    actionFinishOut(arr[i])  //Закончил/уход
                }else{
                    actionRest(arr[i])
                }
            }
            else if(workInObj === null && workOutObj === null){
                if(todayObj < beginningObj){
                    actionNowIn(arr[i])  //Скоро/приход
                }else if (todayObj >= beginningObj && todayObj <= endObj){
                    actionLateIn(arr[i]) //Опоздал/приход
                }else if(todayObj >= endObj){
                    actionTruancyIn(arr[i])  //Прогул/приход
                }else{
                    actionRest(arr[i])
                }
            }
            else{
                actionError(arr[i])
            }
        }
        else if(todayStrD !== beginningStrD && todayStrD !== endStrD){
            actionRest(arr[i])
        }
        else{
            actionError(arr[i])
        }
    }
    return arr;
}

/**
 * Сотрудник сейчас прийдет, нужно отметить приход
 * @param data объект сотрудник
 */
function actionNowIn(data){
    data.message = 'Сотрудник сейчас прийдет, нужно отметить приход'
    data.status = 'Скоро'
    data.action = 'приход'
    data.disabled = false
    data.buttonColor = 'btn-outline-success'
    data.borderColor = 'border-success'
}

/**
 * Сотрудник опаздал, нужно отметить приход
 * @param data объект сотрудник
 */
function actionLateIn(data){
    data.message = 'Сотрудник опаздал, нужно отметить приход'
    data.status = 'Опаздал'
    data.action = 'приход'
    data.disabled = false
    data.buttonColor = 'btn-outline-success'
    data.borderColor = 'border-success'
}

/**
 * Сотрудник прогулял, нужно отметить приход
 * @param data объект сотрудник
 */
function actionTruancyIn(data){
    data.message = 'Сотрудник прогулял, нужно отметить приход'
    data.status = 'Прогул'
    data.action = 'приход'
    data.disabled = false
    data.buttonColor = 'btn-outline-success'
    data.borderColor = 'border-success'
}

/**
 * Сотрудник прогулял, можно отметить уход
 * @param data объект сотрудник
 */
function actionShiftOut(data){
    data.message = 'Сотрудник прогулял, можно отметить уход'
    data.status = 'На смене'
    data.action = 'уход'
    data.disabled = false
    data.buttonColor = 'btn-outline-primary'
    data.borderColor = 'border-primary'
}

/**
 * Сотрудник закончила смену, нужно отметить уход
 * @param data объект сотрудник
 */
function actionFinishOut(data){
    data.message = 'Сотрудник закончила смену, нужно отметить уход'
    data.status = 'Закончил'
    data.action = 'уход'
    data.disabled = false
    data.buttonColor = 'btn-outline-primary'
    data.borderColor = 'border-primary'
}

/**
 * Сотрудник закончил смену, все отметки проставлены
 * @param data объект сотрудник
 */
function actionFinish(data){
    data.message = 'Сотрудник закончил смену, все отметки проставлены'
    data.status = 'Закончил'
    data.action = 'отмечен'
    data.disabled = true
    data.buttonColor = 'btn-outline-secondary'
    data.borderColor = 'border-secondary'
}

/**
 * Сотрудник отдыхает, у него нет сегодня смены
 * @param data объект сотрудник
 */
function actionRest(data){
    data.message = 'Сотрудник отдыхает, у него нет сегодня смены'
    data.status = 'Отдых'
    data.action = 'отдых'
    data.disabled = true
    data.buttonColor = 'btn-outline-secondary'
    data.borderColor = 'border-secondary'
}

/**
 * Не предусмотреный сценарий
 * @param data объект сотрудник
 */
function actionError(data){
    data.message = 'Не предусмотреный сценарий'
    data.status = 'Ошибка'
    data.action = 'ошибка'
    data.disabled = true
    data.buttonColor = 'btn-outline-dangers'
    data.borderColor = 'border-dangers'
}
