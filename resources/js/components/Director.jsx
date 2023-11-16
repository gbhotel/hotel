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
import StaffDirector from "@/routes/Director/Staff.jsx";
import EmployeeDirector from "@/routes/Director/Employee.jsx";
import CreateEmployeeDirector from "@/routes/Director/CreateEmployee.jsx";
import EditEmployeeDirector from "@/routes/Director/EditEmployee.jsx";

export default function Director (){

    return( <>
        <Navibar />
        <Routes>
            <Route path="/director/staff" element={<StaffDirector />} />
            <Route path="/director/employee/:id" element={<EmployeeDirector />} />
            <Route path="/director/createEmployee" element={<CreateEmployeeDirector />} />
            <Route path="/director/editEmployee/:id" element={<EditEmployeeDirector />} />
        </Routes>
    </>)
}
