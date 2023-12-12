import React from "react";
import {useSelector} from "react-redux";

export default function TasksBlock({setCreatedTask}) {

    const tasksName = useSelector((state)=> state.setTasksNameAction.TasksName);

    return (
        <div className="text-center">
            <label className="uppercase mb-1">Задачи</label>
            <ul className="d-flex border-with-shadow flex-column p-2">
                {
                    tasksName.map((item, index) => (
                        <li
                            className="p-0 d-flex dropdown-item rounded-2 py-2 px-3"
                            key={index}
                            value={index}
                            onClick={(e)=> setCreatedTask(prevState => ({...prevState, ['id_request']:null, ['task_name']:tasksName[e.target.value] }))}
                        >
                            {item}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
