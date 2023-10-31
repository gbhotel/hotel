import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from './routes/Root';
import Rooms from './routes/Rooms';
import Navibar from "./components/Navibar";


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navibar />

                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/rooms" element={<Rooms />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}