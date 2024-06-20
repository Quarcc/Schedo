const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Events = db.define('events', {
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
    timeTaken: { // in hours
        type: Sequelize.INTEGER
    },
    scheduledStart: {
        type: Sequelize.DATE
    },
    scheduledEnd: {
        type: Sequelize.DATE
    }
});

module.exports = Events;