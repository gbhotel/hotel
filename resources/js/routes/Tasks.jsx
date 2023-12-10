import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import done from "../../img/done.svg";
import {useDispatch, useSelector} from "react-redux";
import {setTasksAction} from "../store/actions/admin_actions";
import {setStaffAction} from "../store/actions/staff_actions.jsx";
import {setTasksNameAction} from "../store/actions/tasksName_action.jsx";
import {setRoomsAction} from "../store/actions/rooms_actions.jsx";
import CreateTasks from "../routes/CreateTasks.jsx";
import WorkProgress from "@/components/WorkProgress.jsx";

export default function Tasks() {

    const dispatch = useDispatch();

    const [tasks, setTasks] = useState([]);
    const [staff, setStaff] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [showTasksComponent, setShowTasksCreate] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    const tasksName = [
        'уборка номера',
        'услуги прачечной',
        'смена белья',
        'доставка еды',
        'ремонт'
    ];


    const updateTasks = () => {

        const abortController = new AbortController();

        fetch('/api/admin/tasks', {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setTasks(data.tasks);
                dispatch(setTasksAction(data.tasks));
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }


    //tasks
    useEffect(() => {

        dispatch(setTasksNameAction(tasksName));
        const abortController = new AbortController();

        fetch('/api/admin/tasks', {
            signal: abortController.signal,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setTasks(data.tasks);
                dispatch(setTasksAction(data.tasks));
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    //staff
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
                setStaff(data);
                dispatch(setStaffAction(data));

            })
            .catch(error => {
                console.error(error);
            });
        return () => {
            abortController.abort();
        }
    }, []);

    //rooms
    useEffect( () => {

        fetch('/api/admin/rooms')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при выполнении fetch-запроса');
                }
                return response.json();
            })
            .then(data => {
                setRooms(data);
                dispatch(setRoomsAction(data));
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
    }, []);

    //удаление задачи
    const deleteTask = (id) => {
        if (confirm('Вы уверены, что хотите удалить задачу №' + id + '?'))
            fetch(`/api/admin/deleteTask/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': _token,
                },
                body: JSON.stringify(id),
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    if (data['status'] === 'success') {
                        console.log(data['message']);

                        let filteredTasks = tasks.filter(item => item.id !== id)
                        setTasks(filteredTasks);
                        dispatch(setTasksAction(filteredTasks));
                    }
                    else
                        console.log(data['message']);
                })
                .catch((error) => {
                    console.error(error);
                });
    }

    return (
        <div style={{flexGrow: 1}} className=" mt-5">
            <div className="d-flex justify-content-start align-items-center m-3 gap-2 text-center">
                <button
                    type="button"
                    className="btn p-2 btn-add btn-sm uppercase  btn-sm"
                    onClick={() => {
                        setShowTasksCreate(false)
                        setShowProgress(false)
                    }}
                >
                    Список заадч
                </button>
                <button
                    type="button"
                    className="btn p-2 btn-add btn-sm uppercase  btn-sm"
                    onClick={() => {
                        setShowProgress(true)
                        setShowTasksCreate(false)
                    }}
                >
                    Прогресс выполнения
                </button>
                <button
                    type="button"
                    className="btn p-2 btn-add btn-sm uppercase btn-sm"
                    onClick={() => {
                        setShowTasksCreate(true)
                        setShowProgress(false)
                    }}
                >
                    Сформировать задачу
                </button>
            </div>
            {
                showTasksComponent ?
                    (
                       <CreateTasks updateTasks = {updateTasks}/>
                    ): showProgress ?
                        (
                            <WorkProgress/>
                        ): (
                                <div style = {{width: "1000px"}}>
                                   <div className="row g-0 p-4 my-5 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

                                            <Row className=" uppercase align-items-center">
                                                <Col className="my-3" lg={2} xs={1}>
                                                    <b>задача</b>
                                                </Col>
                                                <Col className="my-3" lg={1} xs={1}>
                                                    <b>номер</b>
                                                </Col>
                                                <Col className="my-3" lg={2} xs={1}>
                                                    <b>сотрудник</b>
                                                </Col>
                                                <Col className="my-3" lg={2} xs={1}>
                                                    <b>составлена</b>
                                                </Col>
                                                <Col className="my-3" lg={2} xs={1}>
                                                    <b>статус</b>
                                                </Col>

                                                <Col className="my-3 flex-grow-1" lg={2} xs={1}>
                                                    <b></b>
                                                </Col>
                                            </Row>
                                            {
                                                tasks.map((item, index) => (
                                                    <Row key={index} className="align-items-center border-top">
                                                        <Col className="my-3" lg={2} xs={1}>
                                                            {item.name}
                                                        </Col>
                                                        <Col className="my-3" lg={1} xs={1}>
                                                            {item.id_room}
                                                        </Col>
                                                        <Col className="my-3" lg={2} xs={2}>
                                                            {item.employee_name}
                                                        </Col>
                                                        <Col className="my-3" lg={2} xs={2}>
                                                            {item.created_date}
                                                        </Col>
                                                        <Col className="my-3" lg={2} xs={1}>

                                                            {item.status === 'сделано'? (<img alt="done" className="done-icon m-auto" src={done}/>):
                                                                (item.status) }
                                                        </Col>
                                                        <Col className="my-3 flex-grow-1 d-flex justify-content-center" lg={2}
                                                             xs={2}>
                                                            <button type="button"
                                                                    className="btn  btn-sm uppercase btn-border-purple-angle"
                                                            >
                                                                <Link to={`/editTask/${item.id}`} className="  link text-decoration-none text-black">Редактировать</Link>
                                                            </button>
                                                            <button type="button"
                                                                    className="btn btn-sm uppercase btn-purple-angle"
                                                                    onClick={() => deleteTask(item.id)}
                                                            >Удалить
                                                            </button>
                                                        </Col>
                                                    </Row>
                                                ))
                                            }
                                        </div>
                                </div>
                            )
            }
        </div>
    )
}
