import React from "react";
import DatePicker from "react-datepicker";

export default function FilterBookingDate ({ selectedDate, currentDate, filterByBookingDate }) {
    return (
        <DatePicker
            name="birthday"
            dateFormat ='dd-MM-yyyy'
            selected={selectedDate}
            onChange={(date) => filterByBookingDate(date)}
            placeholderText="Дата заезда"
            className="col-9 gray-input"
            calendarClassName="purple-datepicker"
        />
    )
}
