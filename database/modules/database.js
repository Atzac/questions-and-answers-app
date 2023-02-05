const Sequelize  = require('sequelize');

const connection = new Sequelize('q&a-database', 'root', '132002', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;