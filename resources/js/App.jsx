import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from './routes/Root';
import Rooms from './routes/Rooms';
import Navibar from "./components/Navibar";
import Staff from "@/routes/Staff.jsx";


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navibar />

                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/staff" element={<Staff />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
