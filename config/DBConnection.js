const mySQLDB = require('./DBConfig');
const assign = require('../models/assign');
const blockoff = require('../models/blockoff');
const events = require('../models/events');
const tasks = require('../models/tasks');

const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('db running');
        })
        .then(() => {
            assign.hasMany(tasks);
            mySQLDB.sync({
                force: drop
            }).then(() => {
                console.log('yes')
            }).catch(err => console.log(err))
        })
        .catch(err => console.log('Error: ' + err));
};

module.exports = {setUpDB}