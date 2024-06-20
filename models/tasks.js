const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Tasks = db.define('tasks', {
    tempId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    assignmentName: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    timeTaken: { // This is the number of hours
        type: Sequelize.INTEGER
    },
    dueDate: { // Same as the assignment, note assignment is parent here
        type: Sequelize.DATE
    },
    scheduledStart: {
        type: Sequelize.DATE
    },
    scheduledEnd: {
        type: Sequelize.DATE
    },
    taskType: {
        type: Sequelize.STRING
    },
    resources: {
        type: Sequelize.JSON
    }
});

module.exports = Tasks;