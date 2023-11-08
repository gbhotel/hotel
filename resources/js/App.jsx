import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from './routes/Root';
import Rooms from './routes/Rooms';
import Navibar from "./components/Navibar";
import Staff from "@/routes/Staff.jsx";
import Employee from "@/routes/Employee.jsx";
import Booking from "./routes/Booking.jsx";
import Room from "./routes/Room.jsx";


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navibar />

                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/room/:id" element={<Room />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/employee/:id" element={<Employee />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
