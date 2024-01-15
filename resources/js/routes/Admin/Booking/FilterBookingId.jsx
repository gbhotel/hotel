import React from "react";

export default function FilterBookingId ({ filterByBookingId }) {
    return (
        <input
            className="gray-input"
            placeholder="Номер брони"
            onChange={(e) => filterByBookingId(e)}
        />
    )
}
