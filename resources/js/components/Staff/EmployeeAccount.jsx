import React from "react";
import EmployeeNavbar from "../../components/Staff/EmloyeeNavbar.jsx";
import {Route, Routes} from "react-router-dom";
import EmployeeTasks from "../../components/Staff/EmployeeTasks.jsx";
import MyAccount from "../../routes/Staff/MyAccount.jsx";

export default function EmployeeAccount (){


    return (<>
        <div className="container-fluid d-flex p-0 flex-column ">
            <div className="d-flex gap-5 ">
                <EmployeeNavbar/>
                <Routes>
                    <Route path="/employee/myAccount" element={<MyAccount/>} />
                    <Route path="/employee/:id/tasks" element={<EmployeeTasks />} />
                </Routes>
            </div>

        </div>
     </>)
}
