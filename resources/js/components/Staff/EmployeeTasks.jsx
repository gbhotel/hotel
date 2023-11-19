import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function EmployeeTasks () {

    const { id } = useParams();
    const [userId, setUserId] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

            const abortController = new AbortController();

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
                })
                .catch(error => {
                    console.error(error);
                });

            return () => {
                abortController.abort();
            }
        }, []);


    return (
        <>
            <section className="tasks p-5">
                <h2>Мои задачи</h2>
                <ul className="list-group d-flex flex-row gap-5 justify-content-between">
                    {
                        tasks.map((item)=>{
                            return (
                                <li className="list-group-item d-flex justify-content-between gap-4 flex-column pt-4 pb-4">
                                    <span className="task-description">{item.room_number}</span>
                                    <span className="task-description">{item.name}</span>
                                    <div className="d-flex gap-2">
                                        <button className="btn blue-button start-task">Начать задачу</button>
                                        <button className="btn green-button complete-task">Завершить задачу</button>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
                {/*<button className="btn btn-info mt-3 new-task">Новая задача</button>*/}
            </section>
        </>
    )
}
