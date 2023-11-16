import React from "react";
import Navibar from "../components/Navibar.jsx";
import {Route, Routes} from "react-router-dom";
import Root from "../routes/Root.jsx";
import Booking from "../routes/Booking.jsx";
import AddBooking from "../routes/AddBooking.jsx";
import Rooms from "../routes/Rooms.jsx";
import Room from "../routes/Room.jsx";
import Staff from "../routes/Staff.jsx";
import Employee from "../routes/Employee.jsx";
import Tasks from "../routes/Tasks.jsx";

export default function Admin (){

    return( <>
        <Navibar />
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/addBooking" element={<AddBooking />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/employee/:id" element={<Employee />} />
            <Route path="/tasks" element={<Tasks />} />
        </Routes>
    </>)
}
