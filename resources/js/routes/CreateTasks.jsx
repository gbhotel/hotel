import React, {useEffect, useState} from "react";
import StatusBtn from "../components/Status.jsx";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";


export default function CreateTasks() {

    const [date, setDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [roomForCleaning, setRoomForCleaning] = useState([]);
    const [guestRequest, setGuestRequest] = useState([]);
    const [createdTask, setCreatedTask ] = useState([]);
    const [success, setSuccess] = useState(false);
    const [response , setResponse ] = useState([]);


    const staff = useSelector((state)=> state.setStaffAction.Staff);

    const [countTasksForEmployee, setCountTasksForEmployee ] = useState(() => {
            return staff.map(employee => ({ id: employee.id, tasks: 0 }));
    });
    const tasksName = useSelector((state)=> state.setTasksNameAction.TasksName);
    const rooms = useSelector(state => state.setRoomsAction.Rooms);


    useEffect(() => {
        const abortController = new AbortController();

        fetch('/api/admin/roomsForCleaning', {
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
                setRoomForCleaning(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);


    useEffect( () => {

        fetch('/api/guest/requests')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при выполнении fetch-запроса');
                }
                return response.json();
            })
            .then(data => {
                setGuestRequest(data);
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
    }, []);


    const handleTasks = (e) => {
        setCreatedTask(prevState => ({...prevState, ['id_staff']: e.target.value}));
    }

    const generateTask = async () => {
        try {
            const response = await fetch('/api/admin/addTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': _token,
                },
                body: JSON.stringify(createdTask),
            });

            if (response.ok) {
                const data = await response.json();
                setResponse(data);
                setSuccess(true);
            } else {
                console.error('Ошибка при выполнении fetch-запроса');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };


    // useEffect для обновления даты при монтировании компонента
    useEffect(() => {
        const intervalId = setInterval(() => {

            setCurrentDate(new Date());
        }, 3600000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="d-flex flex-column gap-3 mt-5">
            <div className="d-flex flex-row gap-5">
                <div className="d-flex flex-column task-box">
                    <div className="d-flex justify-content-between gap-5  mt-5">
                        <div className="d-flex justify-content-between flex-column">
                            <div className="text-center">
                                <label className="uppercase mb-1">Задачи</label>
                                <ul className=" dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
                                    {
                                        tasksName.map((item, index) => (
                                            <li
                                                className=" d-flex justify-content-between dropdown-item rounded-2 gap-4 "
                                                key={index}
                                                value={index}
                                                onClick={(e)=> setCreatedTask(prevState => ({...prevState, ['task_name']:tasksName[e.target.value] }))}
                                            >
                                                {item}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="text-center mt-4">
                                <label className="uppercase">Исполнители</label>
                                <ul className="add-scroll dropdown-menu position-static d-grid gap-1 p-2 mx-0 shadow">
                                    {
                                        staff.map((item, index) => (
                                            <li
                                                className=" d-flex justify-content-between dropdown-item rounded-2 gap-4 "
                                                key={index}
                                                value ={item.id}
                                                onClick={(e)=> handleTasks(e)}
                                            >
                                                {item.first_name} {item.last_name} ({item.position})
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className=" d-flex flex-column text-center">
                            <label className="uppercase">Номера комнат</label>
                            <ul className=" flex-grow-1 dropdown-menu position-static d-grid gap-1 p-2 mx-0 shadow w-220px">

                                {
                                    rooms.map((item, index) => (
                                        <li
                                            className=" d-flex justify-content-between dropdown-item rounded-2 gap-4 "
                                            key={index}
                                            value ={item.number}
                                            onClick={(e)=> setCreatedTask(prevState => ({...prevState, ['id_room']: e.target.parentNode.value}))}
                                        >
                                            <div className={`d-flex ${item.number === '10' ? 'gap-3' : 'gap-4'}`} > Комната номер - {item.number}
                                                <StatusBtn status={item.status} />
                                            </div>

                                            {/*<div> {(item.checkOut === currentDate)?*/}
                                            {/*    <StatusBtn status='clean'/>: ''}*/}
                                            {/*</div>*/}

                                            <div>
                                                {roomForCleaning.map((room,index) => ((item.id === room.id_room)?
                                                    <StatusBtn key = {index} status='clean'/>: ''))}
                                            </div>

                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className=" mt-3">
                        <div className="text-center">
                            <label className="uppercase">Заявки от гостей гостиницы</label>
                            <ul className=" add-scroll dropdown-menu position-static d-grid gap-1 p-2 mx-0 shadow w-220px">

                                {
                                    guestRequest.map((item, index) => (

                                        // item.created_date === '2023-11-12' ? (
                                        <li
                                            className="d-flex align-items-center dropdown-item rounded-2 gap-4 "
                                            key={index}
                                            value={item.id}
                                            onClick={(e)=> setCreatedTask(prevState => ({...prevState, ['id_room']: item.id_room, ['task_name']: item.name}))}
                                        >
                                            <div className="name-block d-flex flex-column justify-content-center align-items-center">
                                                {item.name.split(' ').map((word, wordIndex) => (
                                                    <div key={wordIndex}>{word}</div>
                                                ))}
                                            </div>

                                            <div>
                                                <p className="m-0">Дата составления: {item.created_date}</p>
                                                <p className="m-0">Номер комнаты: {item.id_room}</p>
                                                <p className="m-0">Комментарий гостя: "{item.comment?? "здесь пока ничего не оставили..."}"</p>
                                            </div>


                                        </li>
                                        // ) : null
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column gap-2">
                    <div className="mt-5 p-3 text-center">
                        <label className="uppercase">Текущая задача</label>
                        <div style = {{minWidth: "255px"}}  className=" d-flex flex-column text-center p-3 dropdown-menu position-static shadow">
                            <div className="text-gray">Название:</div>

                            {
                                createdTask.task_name ? (
                                    <div>

                                        <div className="text-bold">  {createdTask.task_name}</div>
                                    </div>
                                ) : (<div className="text-bold text-red"> Выберите задачу </div>)
                            }

                            <div className="text-gray mt-2">Исполнитель:</div>
                            {
                                createdTask.id_staff ? (
                                    <div>
                                        <div className="text-bold">
                                            {
                                                staff.filter((item) => item.id === createdTask.id_staff)
                                                    .map((filteredItem, index) => (
                                                        <span>{filteredItem.first_name + " " + filteredItem.last_name} </span>
                                                    ) )
                                            }
                                        </div>
                                    </div>
                                ) : (<div className="text-bold text-red"> Выберите исполнителя </div>)
                            }
                            <div className="text-gray mt-2">Номер комнаты:</div>
                            {
                                createdTask.id_room ? (
                                    <div>
                                        <div className="text-bold">{createdTask.id_room}</div>
                                    </div>
                                ) : (<div className="text-bold text-red"> Выберите номер комнаты  </div>)
                            }
                        </div>
                        <div className="align-self-center mt-3 w-100">
                            <button className=" btn btn-add py-3 px-4 w-100" onClick={generateTask}>Сформировать задачу</button>
                        </div>
                    </div>
                    <div className="p-3 text-center">
                        <label className="uppercase">Распределение нагрузки</label>
                        <div style = {{minWidth: "255px"}} className=" d-flex flex-column justify-content-start gap-2 p-3 dropdown-menu position-static shadow">

                            {
                                countTasksForEmployee.map(item => (
                                    <div>
                                        {
                                            staff.filter((employee) => employee.id == item.id).map(employee => (
                                                <div className="text-bold">
                                                    {employee.first_name} {employee.last_name} :
                                                    {item.tasks !== 0 &&(<span className="text-gray"> {item.tasks}</span> )}
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                            <div className="text-gray text-bold mt-2">Общее количество задач:
                                <span>
                                {
                                    countTasksForEmployee.reduce((accumulator, currentValue) => accumulator + currentValue.tasks, 0) !== 0 && (
                                         countTasksForEmployee.reduce((accumulator, currentValue) => accumulator + currentValue.tasks, 0)
                                    )
                                }
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {success && (
                <div className="overlay">
                    <div
                        className="modal"
                        style={{ display: "block" }}

                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content rounded-3 shadow">
                                <div className="modal-body p-4 text-center">
                                    <h3 className="mb-0">{response.message}</h3>
                                    <p className="mb-0">{response.task}</p>

                                </div>
                                <div className="modal-footer flex-nowrap p-0">
                                    <button type="button"
                                            className="text-black btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
                                            onClick={() => {
                                                setSuccess(false)
                                                setCountTasksForEmployee(prevState => prevState.map(employee => (employee.id == createdTask.id_staff ? {
                                                    ...employee, tasks:employee.tasks + 1}: employee )))
                                                setCreatedTask([])
                                            }
                                            }
                                    >
                                        <strong>Закрыть</strong></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

// <label>Номер</label>
// <select
//     className="form-control h-37"
//     id="employeeSelector"
//     onClick={(e)=> addTask(e, 'id_room')}
// >
//     {
//         rooms.map((item, index) => (
//             <option key={index} value ={item.id}>
//                 Номер комнаты: {item.number} {item.status}
//
//                 {(item.checkOut === currentDate )? ' clean': ''}
//
//                 {roomForCleaning.map((room,index) => ((item.id === room.id_room)? ' clean': ''))}
//
//             </option>
//         ))
//     }
// </select>

{/*<select*/}
{/*    className="form-control"*/}
{/*    id="taskSelector"*/}
{/*    onClick={(e)=> addTask(e, 'task_name')}*/}
{/*>*/}
{/*    {*/}

{/*        tasksName.map((item, index)=>(*/}
{/*            <option key={index} value={item}>{item}</option>*/}
{/*        ))*/}
{/*    }*/}
{/*</select>*/}

{/*<select*/}
{/*    className="form-control"*/}
{/*    id="employeeSelector"*/}
{/*    onClick={(e)=> addTask(e, 'id_staff')}*/}
{/*>*/}
{/*    {*/}
{/*        staff.map((item, index) => (*/}
{/*            <option key={index} value = {item.id}>*/}
{/*                {item.first_name} {item.last_name}*/}
{/*                  ({item.position})*/}
{/*            </option>*/}
{/*        ))*/}
{/*    }*/}
{/*</select>*/}
