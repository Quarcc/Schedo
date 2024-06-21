import React from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState } from 'react'

const localizer = momentLocalizer(moment)

function MyCalendar({ events }) {

    const [selected, setSelected] = useState(null);
    const [resources, setResources] = useState('');
    const [timing, setTiming] = useState('');

    function handleSelected(event) {
        setSelected(event)
        let resourcesString = ''
        event.resources.forEach(resource => {
            resourcesString += `- ${resource}\n`
        })
        console.log(resourcesString)
        setResources(resourcesString)

        let timing = ''
        let startDate = event.startDate;
        let endDate = event.endDate;

        

    }


    console.log(events)

    return (<div>
        <div>
            <Calendar
                selected={selected}
                onSelectEvent={handleSelected}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
        <div>
            <div className="bg-white rounded-lg shadow-md p-6 mx-3">
                <div className="text-md font-semibold">Event Details</div>
                <div className="flex">
                    <div className="bg-white rounded-lg shadow-md p-6 mx-3 w-[20%] text-center">
                        {selected ? selected.title : "No Event Selected"}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mx-3 w-[60%] text-left">
                        {resources ? resources : "No Event Selected"}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mx-3 w-[20%] text-left">
                        {timing ? timing : ""}
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default MyCalendar