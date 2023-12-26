import { useEffect, useState } from "react";
import AddBooking from "../Booking/AddBooking.jsx";

export default function CheckInWithoutBooking(props) {
    const { callBackFunc } = props;
    const convertDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
    const checkIn = () => {
        callBackFunc(1);
    }
    return (
        <>
            <AddBooking checkinDate={''} checkoutDate={''} freeRooms={null} onUpdateFreeRooms={() => { }} isEditing={false} callBack={() => { }} isCheckInWithoutBooking={true} callBackFunc={checkIn} inDate={convertDate(new Date())} />
        </>
    );
}
