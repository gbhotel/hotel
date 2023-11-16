import React from "react";
import {Route, Routes} from "react-router-dom";
import StaffPersonalAccount from "../routes/Staff/StaffPersonalAccount.jsx";


export default function EmployeeAccount (){

    return( <>
        <Routes>
            <Route path="/employeeAccount/:id" element={<StaffPersonalAccount/>} />
        </Routes>
    </>)
}
