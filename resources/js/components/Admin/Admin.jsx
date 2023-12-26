import React from "react";
import {Route, Routes } from "react-router-dom";
import Booking from "../../routes/Admin/Booking/Booking.jsx";
import AddBooking from "../../routes/Admin/Booking/AddBooking.jsx";
import Rooms from "../../routes/Admin/Rooms/Rooms.jsx";
import Room from "../../routes/Admin/Rooms/Room.jsx";
import Staff from "../../routes/Admin/Staff/Staff.jsx";
import Employee from "../../routes/Admin/Staff/Employee.jsx";
import EditBooking from "../../routes/Admin/Booking/EditBooking.jsx";
import Tasks from "../../routes/Admin/Tasks/Tasks.jsx";
import CheckInGuest from "../../routes/Admin/CheckIn/CheckInGuest.jsx";
import CreateTasks from "../../routes/Admin/Tasks/CreateTasks.jsx";
import EditTask from "../../routes/Admin/Tasks/EditTask.jsx";
import NavBar from "../../components/Admin/NavBar.jsx";


export default function Admin() {

    return (<>
        <div className="d-flex gap-5">
            <NavBar/>
            <Routes>
                <Route path="/booking" element={<Booking />} />
                <Route path="/addBooking" element={<AddBooking />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/room/:id" element={<Room />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/employee/:id" element={<Employee />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/createTasks" element={<CreateTasks />} />
                <Route path="/editTask/:id" element={<EditTask/>} />
                <Route path="/editBooking/:id" element={<EditBooking />} />
                <Route path="/checkInGuest" element={<CheckInGuest />} />
            </Routes>
        </div>

    </>)
}
