import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import TimerComponent from "../components/Timer.jsx";
import formatElapsedTime from "../services/formatElapsedTime.js";

export default function WorkProgress() {
    const currentDate = new Date();
    const dateOnly = currentDate.toISOString().split('T')[0];

    const [tasks, setTasks] = useState([]);

    // const tasks = useSelector((state)=> state.setTasksAction.Tasks);
    const staff = useSelector((state)=> state.setStaffAction.Staff);

    useEffect(() => {
        const abortController = new AbortController();

        const timerInterval = setInterval(() => {
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
                })
                .catch(error => {
                    console.error(error);
                });
        }, 1000)

        return () => clearInterval(timerInterval);

    }, []);


    return (
       <div>
           <div className="d-flex flex-column gap-4 mt-5">
               {
                   staff.filter(item => item.position === 'горничная').map((employee, index) => (
                       <div key={index} className="border-purple d-flex p-3">
                           <div
                               style={{minWidth: "120px"}}
                               className="progress-box d-flex flex-column justify-content-center align-content-center text-center"
                           >
                               <div className="text-bold">{employee.first_name}</div>
                               <div className="text-bold">{employee.last_name}</div>
                               <div className="text-gray">{employee.position}</div>
                           </div>
                           <div className="d-flex flex-column justify-content-center align-content-center p-3 text-center gap-2">
                               <div>
                                   <div className="text-gray">Общее время:</div>
                                   <div className="text-bold">
                                       {

                                          formatElapsedTime(tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly).reduce((sum, task) => sum + task.execution_time, 0))? (
                                              formatElapsedTime(tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly).reduce((sum, task) => sum + task.execution_time, 0))
                                          ): (0)
                                       }
                                   </div>
                               </div>
                               <div>
                                   <div className="text-gray">Выполнено задач: </div>
                                   <div className="text-bold">
                                       {
                                         tasks.filter(task => task.id_staff === employee.id && task.status === 'сделано' && task.created_date === dateOnly).length
                                       }
                                   </div>
                               </div>
                           </div>
                           <div className="d-flex justify-content-center align-content-center text-center gap-3">
                               {
                                   tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly).map((task, index) => (
                                       <div style={{minWidth: "180px"}} className="border p-3" key={index}>
                                           <div className="text-bold">{task.name}</div>
                                           <div className="text-bold mb-2"> комната №{task.id_room}</div>
                                           <div className="text-gray text-bold">{task.status}</div>
                                           {
                                               task.status === 'в процессе' && (
                                                   <TimerComponent task={task}/>
                                               )
                                           }
                                           {
                                               task.execution_time && (
                                                   <div className="text-green text-bold">{formatElapsedTime(task.execution_time)}</div>
                                               )
                                           }

                                       </div>
                                   ))
                               }
                           </div>
                       </div>
                   ))
               }
           </div>
       </div>





    )
}
