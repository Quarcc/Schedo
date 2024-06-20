import React, { useState } from 'react';
import Schedule from '../Schedule.js';
import Tasks from '../Tasks.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

function TasksScreen() {
    const [openAssignment, setOpenAssignment] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleOpenAssignment = () => setOpenAssignment(true);
    const handleCloseAssignment = () => setOpenAssignment(false);

    const handleOpenEvent = () => setOpenEvent(true);
    const handleCloseEvent = () => setOpenEvent(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white', 
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // TODO
    const handleSubmitAssignment = () => {
        console.log('Task Name:', taskName);
        console.log('Due Date:', dueDate);
        console.log('Task Description:', taskDescription);
        handleCloseAssignment();
    };


    const handleSubmitTask = () => {
        console.log('Task Name:', taskName);
        console.log('Start Date:', startDate);
        console.log('Start Date:', endDate );
        handleCloseAssignment();
    };

    return (
        <main className="flex-1 grid grid-cols-[400px_1fr] gap-8 p-8">
            <div className="bg-white rounded-lg shadow-md p-6 mx-3">
                <Button onClick={handleOpenAssignment}>Add Assignment</Button>
                <Button onClick={handleOpenEvent}>Add Event</Button>

                <Modal
                    open={openAssignment}
                    onClose={handleCloseAssignment}
                    aria-labelledby="modal-assignment-title"
                    aria-describedby="modal-assignment-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-assignment-title" variant="h6" component="h2">
                            Add Assignment
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="taskName"
                            label="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="dueDate"
                            label="Due Date"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="taskDescription"
                            label="Task Description"
                            multiline
                            rows={4}
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <Button onClick={handleSubmitAssignment} variant="contained" color="primary" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </Box>
                </Modal>

                <Modal
                    open={openEvent}
                    onClose={handleCloseEvent}
                    aria-labelledby="modal-event-title"
                    aria-describedby="modal-event-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-event-title" variant="h6" component="h2">
                            Add Event
                        </Typography>
                        <Typography id="modal-event-description" sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="taskName"
                            label="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="startDate"
                            label="Start"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="endDate"
                            label="End"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <Button onClick={handleSubmitTask} variant="contained" color="primary" sx={{ mt: 2 }}>
                            Submit
                            </Button>
                        </Typography>
                    </Box>
                </Modal>
                
                <hr className="h-0.5 mx-auto bg-neutral-300 border-0 rounded md:my-10 dark:bg-gray-700" />
                <Tasks />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <Schedule />
            </div>
        </main>
    );
}

export default TasksScreen;
