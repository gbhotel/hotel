import React, {useEffect, useState} from "react";
import {forEach} from "react-bootstrap/ElementChildren";


export default function Tasks() {

    const [date, setDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [tasksName, setTasksName] = useState([]);
    const [roomForCleaning, setRoomForCleaning] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [staff, setStaff] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [createdTask, setCreatedTask ] = useState({});


    useEffect(() => {
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
                console.log(data);
                setTasksName(data.tasks_name);
                setTasks(data.tasks);
                // console.log(tasks);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

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
                // console.log(tasks);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);


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
                setStaff(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    useEffect( () => {

        const requestData = {
            date
        };

        // {
        //     method: 'POST',
        //         headers: {
        //     'Content-Type': 'application/json',
        // },
        //     body: JSON.stringify(requestData),

                fetch('/api/admin/rooms')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при выполнении fetch-запроса');
                }
                return response.json();
            })
            .then(data => {
                // Обработка успешного ответа от сервера
                console.log(data);
                setRooms(data);
            })
            .catch(error => {
                // Обработка ошибки
                console.error('Произошла ошибка:', error);
            });
    }, []);

    const addTask = (event, field) => {
        setCreatedTask(prevState => ({...prevState, [field]: event.target.value}))
    }
    const generateTask = async () => {
        try {
            const response = await fetch('/api/admin/addTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createdTask),
            });

            if (response.ok) {
                // Обработка успешного ответа от сервера
                const data = await response.json();
                console.log(data);
            } else {
                // Обработка ошибки
                console.error('Ошибка при выполнении fetch-запроса');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };


    // useEffect для обновления даты при монтировании компонента
    useEffect(() => {
        const intervalId = setInterval(() => {

            setCurrentDate(new Date()); // Обновление текущей даты каждую секунду (или по необходимости)
        }, 3600000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="d-flex flex-column container mt-5">
            <div className="label-container mb-3 ">
                    <label>Номер</label>
                    <select
                        className="form-control h-37"
                        id="employeeSelector"
                        onClick={(e)=> addTask(e, 'id_room')}
                        >
                        {
                            rooms.map((item, index) => (
                                <option key={index} value ={item.id}>
                                    Номер комнаты: {item.number} {item.status}

                                    {(item.checkOut === currentDate )? ' clean': ''}

                                    {roomForCleaning.map((room,index) => ((item.id === room.id_room)? ' clean': ''))}

                                </option>
                            ))
                        }
                    </select>
                </div>
            <div className="label-container mb-3">
                    <label>Задача</label>
                    <select
                        className="form-control"
                        id="taskSelector"
                        onClick={(e)=> addTask(e, 'task_name')}
                    >
                        {

                           tasksName.map((item, index)=>(
                               <option key={index} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
            <div className="label-container">
                    <label>Исполнитель</label>
                    <select
                        className="form-control"
                        id="employeeSelector"
                        onClick={(e)=> addTask(e, 'id_staff')}
                    >
                        {
                            staff.map((item, index) => (
                                <option key={index} value = {item.id}>
                                    {item.first_name} {item.last_name}
                                      ({item.position})
                                </option>
                            ))
                        }
                    </select>

            </div>




            <div className="row mt-4">
                <div className="col-md-6">
                    <button className="btn btn-primary" onClick={generateTask}>Сформировать задачу</button>
                </div>
            </div>
        </div>
    )
}
