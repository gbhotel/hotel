import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import TimerComponent from "../components/Timer.jsx";
import formatElapsedTime from "../services/formatElapsedTime.js";
import {setTasksAction} from "@/store/actions/admin_actions.jsx";

export default function WorkProgress() {

    const currentDate = new Date();
    const dispatch = useDispatch();

    const dateOnly = currentDate.toISOString().split('T')[0];
    const [invisible, setInvisible] = useState(false);
    const [expandedEmployee, setExpandedEmployee] = useState(null);
    const staff = useSelector((state)=> state.setStaffAction.Staff);
    const tasks = useSelector((state)=> state.setTasksAction.Tasks);
    // const [countTasksForEmployee, setCountTasksForEmployee ] = useState(0);

    const [countTasksForEmployee, setCountTasksForEmployee ] = useState(() => {
        return staff.map(employee => ({ id: employee.id, tasks:
            tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly).length
        }));
    });

    // const[arrayLength, setArrayLength] = useState(() => { return tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly).length});


    // const tasks = useSelector((state)=> state.setTasksAction.Tasks);


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
                    // setTasks(data.tasks);
                    dispatch(setTasksAction(data.tasks));

                })
                .catch(error => {
                    console.error(error);
                });
        }, 3000)

        return () => clearInterval(timerInterval);

    }, []);

    const handleInvisible = (status) =>{
        if (status === 'сделано') {

            // setTimeout(() => {
            // },5000)

            return true;
        }
    }

    const toggleAccordion = (employeeId) => {
        setExpandedEmployee((prevEmployee) =>
            prevEmployee === employeeId ? null : employeeId
        );
    };


    return (
       <div style = {{width: "1100px"}}>
           <div className="d-flex flex-column mt-5">
               {
                   staff.filter(item => item.position === 'горничная').map((employee, index) => (
                       <div className="d-flex flex-column">
                           <div
                               key={index}
                               className=" border-purple d-flex p-3"
                               onClick={() => toggleAccordion(employee.id)}
                           >
                               <div
                                   style={{minWidth: "120px"}}
                                   className="progress-box d-flex flex-column justify-content-center align-content-center text-center"
                               >
                                   <div className="text-bold">{employee.first_name}</div>
                                   <div className="text-bold">{employee.last_name}</div>
                                   <div className="text-gray">{employee.position}</div>
                               </div>
                               <div style = {{minWidth: "180px", borderRight:"1px solid #bfbfbf"}} className="d-flex flex-column justify-content-center align-content-center p-3 text-center gap-2">
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
                                       tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly && task.status === 'сделано').length === countTasksForEmployee.filter(tasksCount =>
                                           tasksCount.id === employee.id)[0].tasks && tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly && task.status === 'сделано').length !== 0 ?
                                           (
                                              <div style={{marginTop: "60px", marginLeft:"30px"}} className="font-22">
                                                  Сотрудник завершил работу!
                                              </div>
                                       ):(
                                           tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly).reverse().map((task, index) => (
                                                   <div
                                                       style={{minWidth: "180px"}}
                                                       className={`border p-3

                                                ${handleInvisible(task.status)? "invisible": ""}
                                               `}
                                                       // ${index >= 4? "invisible": ""}
                                                       key={index}
                                                   >
                                                       <div className="text-bold">{task.name}</div>
                                                       <div className="text-bold mb-2"> комната №{task.id_room}</div>
                                                       <div className="text-bold text-gray">{task.status}</div>
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
                                               )
                                         ))
                                   }


                               </div>
                           </div>
                           {expandedEmployee === employee.id && (
                               <div
                                   style={{backgroundColor: 'lightgray'}}
                                   className={`py-3 accordion-content ${expandedEmployee === employee.id ? 'active' : ''}`}
                               >
                                   {
                                       tasks.filter(task => task.id_staff === employee.id && task.created_date === dateOnly &&
                                        task.status === "сделано").reverse().map((task, index) => (
                                               <div
                                                   style={{minWidth: "180px"}}
                                                   className="px-3 d-flex"
                                                   key={index}>
                                                   <div  style = {{marginRight: "10px"}}className="d-flex align-items-center text-bold">{index + 1}.</div>
                                                   <div  style = {{marginRight: "10px"}} className="text-bold"> комната №{task.id_room + " "} </div>
                                                   <div  style = {{marginRight: "10px"}} className="text-bold">{task.name + " "} </div> &nbsp;
                                                   <div  style = {{marginRight: "10px"}} className="text-bold">{task.status + " "} за </div>
                                                   <div  style = {{marginRight: "10px"}} className="text-green text-bold"> {formatElapsedTime(task.execution_time)} </div>
                                               </div>
                                       ))
                                   }
                               </div>
                           )}
                       </div>


                   ))

               }
           </div>
       </div>





    )
}
