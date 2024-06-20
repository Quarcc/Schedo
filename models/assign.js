const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Assignments = db.define('assignments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    dueDate: {
        type: Sequelize.DATE
    }
});

module.exports = Assignments;