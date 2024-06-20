const express = require('express');
const bodyParser = require('body-parser');
const schedodb = require('./config/DBConnection');
const db = require('./config/db');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Assign = require('./models/assign');
const BlockOff = require('./models/blockoff');
const Events = require('./models/events');
const Tasks = require('./models/tasks');

const app = express();

let port = 8000;

schedodb.setUpDB(true);

app.use(bodyParser.urlencoded({extended:true}));

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

app.get('/', (req, res) => {
    res.send('hi')
})

app.post('/addtask', async (req, res) => {
    // Tasks.findOne({ where: {tempId:1}}).then(task=>{
    //     if(task)
    //         {
    //             res.status(200).json({ message: 'exists'});
    //         }
    //     else{
    //         Tasks.create({tempId:1, assignmentName: "help"}).then(task =>{
    //             res.status(200).json({ message: 'Task created successfully'});
    //         }).catch(error=>{
    //             console.error('Error creating task:', error);
    //             res.status(500).json({ error: 'Failed to create task' });
    //         })
    //     }
    // });
    let resources = [{"1":"hi", "2":"hello", "3":"world"}];
    let tempId = 1; // Typically, you don't set IDs manually if using auto-increment
    let assignmentName = "test";
    let name = "task (1/5)";
    let description = "idk la";
    let timeTaken = 2;
    let dueDate = "2022-04-22 10:34:23.55";
    let scheduledStart = "2022-04-22 10:34:23.55";
    let scheduledEnd = "2022-04-22 10:34:23.55";
    let taskType = "short";

    console.log({
        tempId,
        assignmentName,
        name,
        description,
        timeTaken,
        dueDate,
        scheduledStart,
        scheduledEnd,
        taskType,
        resources
    });

    try {
        const newTask = await Tasks.create({
            tempId,
            assignmentName,
            name,
            description,
            timeTaken,
            dueDate,
            scheduledStart,
            scheduledEnd,
            taskType,
            resources
        });

        res.status(200).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

app.get('/alltasks', async (req, res) => {
    const task = await Tasks.findAll();
    console.log(task.every(task => task instanceof Tasks)); // true
    console.log('All tasks:', JSON.stringify(task, null, 2));
    // res.json({
    //     array: []
    // })
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});