import React from "react";
import DatePicker from "react-datepicker";

export default function FilterBookingDate ({ currentDate, filterByBookingDate }) {
    return (
        <DatePicker
            name="birthday"
            selected={currentDate}
            onChange={filterByBookingDate}
            placeholderText="Дата заезда"
            className="col-9 gray-input"
            calendarClassName="purple-datepicker"
        />
    )
}
