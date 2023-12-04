import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from './routes/Root';
import Rooms from './routes/Rooms';
import Navibar from "./components/Navibar";
import Staff from "./routes/Staff.jsx";
import Employee from "./routes/Employee.jsx";
import AddBooking from "./routes/AddBooking.jsx";
import Room from "./routes/Room.jsx";
import Booking from "./routes/Booking.jsx";
import AddTasks from "./routes/AddTasks.jsx";

import StaffDirector from "./routes/Director/Staff.jsx";
import EmployeeDirector from "./routes/Director/Employee.jsx";
import CreateEmployeeDirector from "./routes/Director/CreateEmployee.jsx";
import EditEmployeeDirector from "./routes/Director/EditEmployee.jsx";
import Admin from "./components/Admin.jsx";
import Director from "./components/Director.jsx";
import EmployeeAccount from "./components/Staff/EmployeeAccount";
import Guest from "./components/Guest.jsx";
import {useEffect, useState} from "react";




export default function App() {

    const [role, setRole] = useState('');

    console.log(_token);

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`/api/userRole`, {
            signal: abortController.signal,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setRole(data);
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
            <BrowserRouter>
                {/*<Admin />*/}
                {role.role === 'администратор'&& <Admin />}
                {role.role === 'директор' && <Director />}
                {role.role === 'горничная'&& <EmployeeAccount />}
                {role.role === 'гость'&& <Guest />}
            </BrowserRouter>
        </>
    )
}
