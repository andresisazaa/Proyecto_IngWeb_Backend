const Sequelize = require('sequelize');

const database = 'web-project';
const username = 'admin';
const password = 'SrUYyqEqgpzHWuNVpzAC';
const host = 'web-project.cy3tjswteu5b.us-east-1.rds.amazonaws.com';
const dialect = 'mysql';

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;