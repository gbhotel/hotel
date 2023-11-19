import React from "react";
import Navbar from "../components/Director/Navbar.jsx";
import {Route, Routes} from "react-router-dom";

import StaffDirector from "@/routes/Director/Staff.jsx";
import EmployeeDirector from "@/routes/Director/Employee.jsx";
import CreateEmployeeDirector from "@/routes/Director/CreateEmployee.jsx";
import EditEmployeeDirector from "@/routes/Director/EditEmployee.jsx";

import AnalysisDirector from "@/routes/Director/Analysis/Analysis.jsx"

export default function Director (){

    return( <>
        <Navbar />
        <Routes>
            <Route path="/director/staff" element={<StaffDirector />} />
            <Route path="/director/employee/:id" element={<EmployeeDirector />} />
            <Route path="/director/createEmployee" element={<CreateEmployeeDirector />} />
            <Route path="/director/editEmployee/:id" element={<EditEmployeeDirector />} />

            <Route path="/director/analysis" element={<AnalysisDirector />} />
        </Routes>
    </>)
}
