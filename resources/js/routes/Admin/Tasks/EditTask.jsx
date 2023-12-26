import React, { useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export default function EditTask() {

    const {id} = useParams();
    const navigate = useNavigate();

    const tasks = useSelector(state => state.setTasksAction.Tasks);
    const tasksName = useSelector(state => state.setTasksNameAction.TasksName);
    const [task, setTask] = useState(tasks.filter(item => item.id === parseInt(id))[0]);
    const [response, setResponse] = useState([]);


    const staff = useSelector(state => state.setStaffAction.Staff);
    const [employee, setEmployee] = useState(staff.filter(item => item.id === parseInt(task.id_staff))[0]);
    const rooms = useSelector(state => state.setRoomsAction.Rooms);

    const  editTask = (event, field) => {
        setTask(prevState => ({...prevState, [field]: event.target.value}));

        if(field === 'id_staff') {
            const employeeName = staff.filter(item => item.id === parseInt(event.target.value))[0]
            setTask(prevState => ({...prevState, 'employee_name': employeeName.full_name}));
        }
    }

    const updateTask = async () => {
        try {
            const response = await fetch('/api/admin/updateTask', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': _token,
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const data = await response.json();
                setResponse(data);
                setTimeout(()=> {
                    navigate(-1)
                }, 2000)
            } else {
                console.error('Ошибка при выполнении fetch-запроса');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    return (
        <div className="col-3">
            <div className="requests-form">
                <div className="requests-form-group">
                    <label className="request-label">Задача:</label>
                    <select
                        id="task"
                        name="task"
                        value={task.name}
                        onChange={(e) => editTask(e, 'name')}
                    >
                        {
                            tasksName.map((item, index) =>
                                <option key={index} value={item}>{item}</option>
                            )
                        }
                    </select>
                </div>
                <div className="requests-form-group">
                    <label className="request-label">Исполнитель:</label>
                    <select
                        id="employee"
                        name="employee"
                        value={task.id_staff}
                        onChange={(e) => {
                            {
                                editTask(e, 'id_staff')
                            }

                        }
                    }
                    >
                        {
                            staff.map((item, index) =>
                                <option
                                    key={index}
                                    value={item.id}
                                >
                                    {item.full_name}
                                </option>
                            )
                        }
                    </select>
                </div>
                <div className="requests-form-group">
                    <label className="request-label">Номер комнаты:</label>
                    <select
                        id="rooms"
                        name="rooms"
                        value={task.id_room}
                        onChange={(e) => editTask(e, 'id_room')}
                    >
                        {
                            rooms.map((item, index) =>
                                <option
                                    key={index}
                                    value={item.id}
                                >
                                    {item.number}
                                </option>
                            )
                        }
                    </select>
                </div>
                <div className="requests-form-group">
                    <label className="request-label" htmlFor="feedback">Комментарий:</label>
                    <textarea
                        className="request-textarea"
                        id="feedback"
                        name="feedback"
                        rows="4"
                        placeholder="Оставьте комментарий..."
                        onChange={(e)=>editTask(e, 'comment')}
                    ></textarea>
                </div>
                <button className="w-100 btn btn-task" onClick={updateTask}>Сохранить</button>
            </div>
            {
                response && (
                    <h3 className={`btn-border-purple text-black border-with-shadow ${response.length === 0 ? 'invisible' : ''}`}>{response.message}</h3>
                )
            }
        </div>

        // <div className="d-flex gap-3 small-container mt-5">
        //     <div className="text-center">
        //
        //         <ul className=" dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
        //             <label className=" justify-self-center text-bold-purple uppercase mb-1">Задачи</label>
        //             {
        //                 tasks.map((item, index) => (
        //                     <li
        //                         className=" d-flex justify-content-between dropdown-item rounded-2 gap-4 "
        //                         key={index}
        //                         value={index}
        //                         // onClick={(e)=> setCreatedTask(prevState => ({...prevState, ['task_name']:tasksName[e.target.value] }))}
        //                     >
        //                         {item.name}
        //                     </li>
        //                 ))
        //             }
        //         </ul>
        //     </div>
        //     {/*<div className="text-center mt-4">*/}
        //     {/*    <label className="uppercase">Исполнители</label>*/}
        //     {/*    <ul className="add-scroll dropdown-menu position-static d-grid gap-1 p-2 mx-0 shadow">*/}
        //     {/*        {*/}
        //     {/*            staff.map((item, index) => (*/}
        //     {/*                <li*/}
        //     {/*                    className=" d-flex justify-content-between dropdown-item rounded-2 gap-4 "*/}
        //     {/*                    key={index}*/}
        //     {/*                    value ={item.id}*/}
        //     {/*                    onClick={(e)=>  setCreatedTask(prevState => ({...prevState, ['id_staff']: e.target.value}))}*/}
        //     {/*                >*/}
        //     {/*                    {item.first_name} {item.last_name} ({item.position})*/}
        //     {/*                </li>*/}
        //     {/*            ))*/}
        //     {/*        }*/}
        //     {/*    </ul>*/}
        //     {/*</div>*/}
        // </div>

)
}
