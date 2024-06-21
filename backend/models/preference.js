const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Preference = db.define('preferences', {
    prefID : {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    day : {
        type: Sequelize.STRING
    },
    time : {
        type: Sequelize.STRING
    }
});

module.exports = Preference;