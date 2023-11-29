import React from "react";
import GuestNavbar from "../components/Guest/GuestNavbar.jsx";
import {Route, Routes} from "react-router-dom";

import GuestRoom from "../routes/Guest/GuestRoom.jsx";
import GuestFeedback from "../routes/Guest/GuestFeedback.jsx";

export default function Guest (){

    return( <>
        <div className="d-flex gap-5">
            <GuestNavbar />
            <Routes>
                <Route path="/guest/room:id" element={<GuestRoom />} />
                <Route path="/guest/feedback" element={<GuestFeedback />} />
            </Routes>
        </div>

    </>)
}
