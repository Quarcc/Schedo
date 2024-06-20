import React from 'react';

function Calendar({ month }) {
    let days = month % 2 == 0 ? 31 : 30;
    if (month == 2) {
        days = 28;
    }

    return (
        <div>

        </div>
    )
}

export default Calendar