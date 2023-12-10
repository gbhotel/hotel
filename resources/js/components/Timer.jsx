import React, { useState, useEffect } from 'react';
import formatElapsedTime from "../services/formatElapsedTime.js";

const TimerComponent = ({ task }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        // Проверка, что статус задачи 'в процессе'
        if (task.status === 'в процессе') {
            // Используем setInterval для обновления времени каждую секунду
            const timerInterval = setInterval(() => {
                // Вычисляем разницу во времени между текущим временем и временем обновления задачи
                const now = new Date();
                const updatedAt = new Date(task.updated_at);
                const differenceInSeconds = Math.floor((now - updatedAt) / 1000);
                setElapsedTime(differenceInSeconds);
            }, 1000);

            return () => clearInterval(timerInterval);
        } else if (task.status === 'сделано') {
            task.execution_date
        }
    }, [task.status, task.updated_at]);


    return (
        <div>
            {task.status === 'в процессе' && (
                <div className="text-red text-bold">
                    {formatElapsedTime(elapsedTime)}
                </div>
            )}
        </div>
    );
};

export default TimerComponent;
