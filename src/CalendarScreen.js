import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

function MyCalendar(props) {
    return (
        <div>
            <Calendar
                localizer={localizer}
                /* events={myEventsList} */
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}

export default MyCalendar