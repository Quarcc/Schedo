const express = require('express');
const bodyParser = require('body-parser');
const schedodb = require('./config/DBConnection');
const db = require('./config/db');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const BlockOff = require('./models/blockoff');
const Events = require('./models/events');
const Tasks = require('./models/tasks');
const {addTask, addEvent} = require('./ai');
const cors = require("cors");

const app = express();

let port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000", //specify domains that can call your API
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

schedodb.setUpDB(true);

const options = {
    host: db.host,
    port:db.port,
    user:db.username,
    password:db.password,
    database:db.database
    }
    const sessionStore = new MySQLStore(options);
    app.use(session({
    key:'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave:false,
    saveUninitialized:false
}));

// AI Generated task and events, storing into DB

taskToAdd = `{
    "id": 4,
    "type": "task",
    "name": "Code the final product using ReactJS and NodeJS",
    "timeTaken": 4
    "dueDate": "2024-06-25-01T14:00:30",
  }`
  
eventToAdd = `{
"id": 2,
"type": "event",
"name": "Visit Mother",
"timeTaken": 1
"scheduledStart": "2024-06-21T14:00:30",
"scheduledEnd": "2024-06-21T15:00:30"
}`

existingEventsTasks = `{
[
{
    "id": 1,"
    type": "task",
    "name": "Learn how to use ReactJS and NodeJS",
    "timeTaken" : 3,
    "dueDate": "2024-06-23T14:00:30"
    "scheduledStart": "2024-06-20T14:00:30",
    "scheduledEnd": "2024-06-20T17:00:30",
    "taskType": "long"
    "resources": "X"
},{
    "id": 2,
    "type": "task",
    "name": "Learn best practices",
    "timeTaken" : 0.5,
    "dueDate": "2024-06-24T08:00:30"
    "scheduledStart": "2024-06-21T14:00:30",
    "scheduledEnd": "2024-06-21T14:30:30",
    "taskType": "long"
    "resources": "X"
},
{
    "id": 3,
    "type": "task",
    "name": "Create Low-Fidelity prototype",
    "timeTaken" : 0.5,
    "dueDate": "2024-06-24T08:00:30"
    "scheduledStart": "2024-06-20T17:30:30",
    "scheduledEnd": "2024-06-20T18:30:30",
    "taskType": "short"
    "resources": "X"
},
{
    "id": 1,
    "type": "event",
    "name": "Visit Father",
    "scheduledStart": "2024-06-30T14:00:30",
    "scheduledEnd": "2024-06-30T17:00:30",
}
]
}`

personalization = `{
    "blockedOff": {
    1: [],
    2: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
            {"scheduledStart": 13:00, "scheduledEnd": 15:00} ]
    3: [],
    4: [{"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
            {"scheduledStart": 13:00, "scheduledEnd": 15:00}],
    5: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
            {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
    6: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
        {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
    7: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
    {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
},
"preferredTimes": "2, 4",
"preferredDays": "1, 3, 4"
}
`
app.post('/addtask', async (req, res) => {
    const existing = await Tasks.findAll();
    Tasks.truncate();
    const requestBody = req.body;
    // const tasks = requestBody.task;
    const tasks = "Do some research on Flask, 2\nCreate a low-fidelity prototype, 1\nDevelop the final product, 4";
    const date = "2024-06-25-01T14:00:30";
    const type = "task";
    const tid = 10;

    const newTasks = tasks.split('\n');
    const formattedTasks = newTasks.map((task, index)=> {
        const[name, timeTaken] = task.split(',');
        return{
            id: tid + index,
            type: type,
            name: name.trim(),
            timeTaken: Math.round(timeTaken),
            dueDate: date
        };
    });
    console.log("FORMATTED TASKS" + JSON.stringify(formattedTasks))
    console.log("EXISTING DATA" + JSON.stringify(existing))
    existingEventsTasks = JSON.stringify(existing);
    
    personalization = `{
        "blockedOff": {
            1: [],
            2: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
                    {"scheduledStart": 13:00, "scheduledEnd": 15:00} ]
        3: [],
        4: [{"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
                    {"scheduledStart": 13:00, "scheduledEnd": 15:00}],
        5: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
                    {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
        6: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
            {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
        7: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
        {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
    },{
        "preferredTimes": "2, 4",
        "preferredDays": "1, 3, 4"
    }
    `
    taskToAdd = JSON.stringify(formattedTasks);
    // Add the task
    addTask(taskToAdd, existingEventsTasks, personalization)
    .then(newSchedule => {
            console.log('Updated Schedule with Task:', newSchedule)
            const allEvents = [];
            const allTasks = [];
            for (const item of newSchedule) {
                if (item.type === "event") {
                    allEvents.push(item);
                } else {
                    allTasks.push(item);
                }
            };

            allTasks.forEach(i =>{
                
                Tasks.create({taskID:i.taskID,
                    name:i.name,
                    timeTaken:Math.round(i.timeTaken),
                    dueDate:i.dueDate,
                    scheduledStart:i.scheduledStart,
                    scheduledEnd:i.scheduledEnd,
                    taskType:i.taskType,
                    resources:i.resources}).then(task =>{
                }).catch(error=>{
                    console.error('Error creating task:', error);
                });
            })
        })   
    .catch(error => console.error('Error adding task:', error));
})

// Add the task
addTask(taskToAdd, existingEventsTasks, personalization)
    .then(newSchedule => {
            console.log('Updated Schedule with Task:', newSchedule)
            const allEvents = [];
            const allTasks = [];
            for (const item of newSchedule) {
                if (item.type === "event") {
                    allEvents.push(item);
                } else {
                    allTasks.push(item);
                }
            };

            allTasks.forEach(i =>{
                const str = i.resources;
    
                // Split the string by '\n' to create an array
                let array = str.split('\n');
                
                // Remove the number and space at the beginning of each line
                array = array.map(item => item.replace(/^\d+\.\s*/, ''));
                
                Tasks.create({taskID:i.id,
                    name:i.name,
                    timeTaken:Math.round(i.timeTaken),
                    dueDate:i.dueDate,
                    scheduledStart:i.scheduledStart,
                    scheduledEnd:i.scheduledEnd,
                    taskType:i.taskType,
                    resources:array}).then(task =>{
                }).catch(error=>{
                    console.error('Error creating task:', error);
                });
            })
        })   
    .catch(error => console.error('Error adding task:', error));

// Add the event
// addEvent(eventToAdd, existingEventsTasks)
//     .then(newSchedule => console.log('Updated Schedule with Event:', newSchedule))
//     .catch(error => console.error('Error adding event:', error));

app.get('/alltasks', async (req, res) => {
    const task = await Tasks.findAll();
    return res.status(200).send(JSON.stringify(task))

})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});