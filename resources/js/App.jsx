import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from './routes/Root';
import Rooms from './routes/Rooms';
import Navibar from "./components/Navibar";
import Staff from "./routes/Staff.jsx";
import Employee from "./routes/Employee.jsx";
import AddBooking from "./routes/AddBooking.jsx";
import Room from "./routes/Room.jsx";
import Booking from "./routes/Booking.jsx";

import StaffDirector from "./routes/Director/Staff.jsx";
import EmployeeDirector from "./routes/Director/Employee.jsx";
import CreateEmployeeDirector from "./routes/Director/CreateEmployee.jsx";


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navibar />

                <Routes>
                    {/*Администратор*/}
                    <Route path="/" element={<Root />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/addBooking" element={<AddBooking />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/room/:id" element={<Room />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/employee/:id" element={<Employee />} />
                    {/*Директор*/}
                    <Route path="/director/staff" element={<StaffDirector />} />
                    <Route path="/director/employee/:id" element={<EmployeeDirector />} />
                    <Route path="/director/create-employee" element={<CreateEmployeeDirector />} />
                    {/*Горничная (ни чего не сделано)*/}
                    {/*<Route path="/maid/:id" element={<StaffDirector />} />*/}
                    {/*гость  (ни чего не сделано)*/}
                    {/*<Route path="/fuest/:id" element={<StaffDirector />} />*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}
