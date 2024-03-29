import React from "react";
import GuestNavbar from "./GuestNavbar.jsx";
import {Route, Routes} from "react-router-dom";

import GuestRoom from "../../routes/Guest/GuestRoom.jsx";
import GuestFeedback from "../../routes/Guest/GuestFeedback.jsx";
import GuestRequests from "../../routes/Guest/GuestRequests.jsx";

export default function Guest (){

    return( <>
        <div className="d-flex gap-5">
            <GuestNavbar />
            <Routes>
                <Route path="/guest/room" element={<GuestRoom />} />
                <Route path="/guest/feedback" element={<GuestFeedback />} />
                <Route path="/guest/requests" element={<GuestRequests />} />
            </Routes>
        </div>

    </>)
}
