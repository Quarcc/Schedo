import React from 'react';
//import Task from './Task.js';
import { ClockIcon, CheckIcon } from './Icons.js';
import Checkbox from './Checkbox.js';

function Task({ label, time, checked }) {

    // Function to get task by id


    return (
        <div className="grid gap-4">

            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox className="h-5 w-5 align-middle" checked={checked} />
                        <div>
                            <div className="font-medium text-lg">{label}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <ClockIcon className="w-4 h-4" />
                        <span className="text-lg">{time}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

function Tasks({ tasks }) {

    tasks = [{ label: "Testing longer task names", time: "1h 30m", checked: false },]

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-md font-bold">Tasks</h2>
            </div>
            {tasks.map((task) => (
                <Task label={task.label} time={task.time} checked={task.checked} />
            ))}
        </div>
    )
}

export default Tasks