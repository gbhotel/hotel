import React from "react";
import GuestNavbar from "../components/Guest/GuestNavbar.jsx";
import {Route, Routes} from "react-router-dom";

import GuestRoom from "../routes/Guest/GuestRoom.jsx";
import EmployeeDirector from "../routes/Director/Employee.jsx";
import CreateEmployeeDirector from "../routes/Director/CreateEmployee.jsx";
import EditEmployeeDirector from "../routes/Director/EditEmployee.jsx";

import AnalysisDirector from "@/routes/Director/Analysis/Analysis.jsx"

export default function Guest (){

    return( <>
        <div className="d-flex gap-5">
            <GuestNavbar />
            <Routes>
                <Route path="/guest/room" element={<GuestRoom />} />
                {/*<Route path="/director/staff" element={<StaffDirector />} />*/}
                {/*<Route path="/director/employee/:id" element={<EmployeeDirector />} />*/}
                {/*<Route path="/director/createEmployee" element={<CreateEmployeeDirector />} />*/}
                {/*<Route path="/director/editEmployee/:id" element={<EditEmployeeDirector />} />*/}
                {/*<Route path="/director/analysis" element={<AnalysisDirector />} />*/}
            </Routes>
        </div>

    </>)
}
