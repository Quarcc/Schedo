import React from 'react';
import { useState } from 'react';
import { ClockIcon } from "./Icons.js"
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import Popover from '@mui/material/Popover';
import Button from './Button.js';
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

function MyCalendar({ events }) {

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}


function ScheduledItem({ label, time, duration, immutable }) {
    console.log(immutable)

    let prefix = immutable ? <AiFillLock size="20" /> : <AiFillUnlock size="20" />

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {prefix}
                <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-neutral-600">{time}</div>
                </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
                <ClockIcon className="w-4 h-4" size="20" />
                <span>{duration}</span>
            </div>
        </div>
    )
}

function Schedule({ schedule }) {
    const [anchorEl, setAnchorEl] = useState(<button /> | null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    schedule = [{
        label: "Finish project proposal",
        time: "2:00 PM - 4:00 PM",
        duration: "2h",
        immutable: false
    },
    {
        label: "Finish project proposal",
        time: "2:00 PM - 4:00 PM",
        duration: "2h",
        immutable: true
    }]

    console.log(open)

    let date = Date.now()
    

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <button>{date}</button>
            <div className="grid gap-2">
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }} />
                {/* <Label htmlFor="date">Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="flex items-center justify-between w-full">
                            <span>April 15, 2023</span>
                            <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Calendar />
                    </PopoverContent>
                </Popover> */}
            </div>
            <div className="grid gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Schedule</h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <ClockIcon className="w-4 h-4" />
                        <span>8h 30m</span>
                    </div>
                </div>
                <div className="grid gap-4">
                    {schedule.map((item) => (
                        console.log(item),
                        <ScheduledItem label={item.label} time={item.time} duration={item.duration} immutable={item.immutable} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Schedule