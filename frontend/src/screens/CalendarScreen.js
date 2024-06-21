import React from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

function MyCalendar({ events }) {

    return (<div>
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
        <div>
            <div className="bg-white rounded-lg shadow-md p-6 mx-3">
                <div className="text-md">Resources</div>
            </div>
        </div>
        </div>
    )
}

export default MyCalendar