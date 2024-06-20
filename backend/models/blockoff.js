const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const BlockOff = db.define('blockoff', {
    blockoffID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    day: {
        type: Sequelize.INTEGER
    },
    scheduledStart: {
        type: Sequelize.DATE
    },
    scheduledEnd: {
        type: Sequelize.DATE
    },
});

module.exports = BlockOff;