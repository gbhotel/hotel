import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import done from "../../../img/done.svg";
import trophy from "../../../img/trophy.png";

export default function EmployeeTasks () {



    const { id } = useParams();
    const [userId, setUserId] = useState([]);
    const [date, setDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [count, setCount] = useState(tasks.length);
    const [sets, setSets] = useState({});
    const [status, setStatus] = useState('');
    const [selectedTask, setSelectedTask] = useState({});
    const [showRoom, setShowRoom] = useState(false);

    useEffect(() => {

            const abortController = new AbortController();

            const timerInterval = setInterval(() => {
            fetch(`/api/employee/${id}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': _token,
                },
                body: JSON.stringify(userId),


                signal: abortController.signal,
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setTasks(data);
                    setCount(data.filter(task => task.status === "сделано").length);
                    setName(data[0].employee_name);
                    // setCount(data.length);
                })
                .catch(error => {
                    console.error(error);
                });
            }, 1000)

        return () => clearInterval(timerInterval);

        }, [status]);

    const handlePrepareForShow = (id) => {
        setShowRoom((prevState)=>(!prevState));
        const selectedTask = tasks.find(task => task.id === id);
        setSelectedTask(selectedTask);
        setSets(JSON.parse(selectedTask["room_sets"]));
    }

    const changeStatus = async (task, event) => {

        event.stopPropagation();
        const abortController = new AbortController();

        let request;

        if (task.status === 'не сделано') {
            request = {
                taskId: task.id,
                status: 'в процессе',
            };
        } else if (task.status === 'в процессе') {
            // setCount((prevState)=>(prevState + 1))
            // setTimeout(()=> {
            //     ;
            // },1000)
            request = {
                taskId: task.id,
                status: 'сделано',
            };
        }

        try {
            const response = await fetch(`/api/employee/changeTaskStatus`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': _token,
                },
                body: JSON.stringify(request),
                signal: abortController.signal,
            });

            const data = await response.json();
            console.log(data.status);
            setStatus(data.status);
            set
            setTasks(prevState => (
                prevState.map(task => (
                    task.id === parseInt(data.taskId) ? { ...task, status: data.status } : task
                ))
            ));
        } catch (error) {
            console.error(error);
        } finally {
            abortController.abort();
        }
    };



    return (
        <div   className="d-flex flex-row gap-3">
            <section style = {{width: "895px"}} className="tasks-section mt-5 py-5 d-flex gap-3 flex-column">
                <ul className="list-group d-flex flex-wrap flex-row gap-3">
                    {
                        // tasks.sort((a, b) => {
                        // // Custom sorting function to prioritize tasks with 'в процессе' status
                        // if (a.status === 'в процессе' && b.status !== 'в процессе') {
                        // return 1;
                        // } else if (a.status !=='в процессе' && b.status === 'в процессе') {
                        //     return -1;
                        // } else {
                        //     return 0;
                        // }
                    // })
                    tasks.map((task, index)=>{
                            return (
                                <li key={index} style={{minWidth: "210px"}} className=" li-task d-flex justify-content-between gap-4 flex-column py-3 px-4"
                                    onClick={() => handlePrepareForShow(task.id)}
                                >
                                    <span className="task-description text-bold uppercase">Номер {task.room_number}</span>
                                    <span className="task-description uppercase">{task.name}</span>
                                    <span className="task-description">"{task.status}"</span>
                                    <div className="d-flex gap-2 mx-auto">

                                        {task.status === 'сделано' ? (
                                            <img src={done} alt="Завершено" className="done-icon m-auto" />
                                        ) : (
                                            <button
                                                className="btn uppercase btn-task blue-button start-task"
                                                onClick={(event) => changeStatus(task, event)}
                                            >
                                                {task.status === 'не сделано' ? 'Начать' : ''}
                                                {task.status === 'в процессе' ? 'Завершить' : ''}
                                                {task.status === 'сделано' ? 'Завершено' : ''}
                                            </button>
                                        )}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    count === tasks.length && (
                        <div  className={`${count === 0 ? "invisible": ""} trophy-block d-flex p-3 flex-column justify-content-start align-content-start`}>
                            <div  className="d-flex text-bold">Отлично поработали сегодня!</div>
                            <div className="d-flex text-bold-purple" >{name}</div>
                            <div className="d-flex text-gray" > Выполнено {tasks.length} задачи</div>
                            <img alt="trophy" src={trophy} className="trophy"/>
                        </div>
                    )
                }

            </section>

            {showRoom && (
            <div className="room-info-container mt-5 py-5">
                <div className="room-info">
                    <h3 className="text-purple">Категория номера</h3>
                        <p className="uppercase text-bold" >"{selectedTask.room_category}"</p>
                    <h3 className="text-purple">Принадлежности</h3>
                    <ul className="d-flex flex-column justify-content-start">
                        {
                            Object.keys(sets).map(key => (
                                <li className="li-task d-flex m-0" key={key}>
                                    {key}: {sets[key]} шт.
                                </li>
                            ))
                        }
                    </ul>
                    <h3 className="text-purple">Пожелания гостей</h3>
                    <p className="text-gray">{
                        selectedTask.comment?
                            (
                                selectedTask.comment
                            ):(
                                "здесь пока ничего не оставили..."
                            )
                    }

                    </p>
                </div>
            </div>
        )}


        </div>)

}
