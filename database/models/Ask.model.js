const Sequelize = require('sequelize');
const connection = require('../modules/database');

const Ask = connection.define('ask', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Ask.sync({force: false}).then(() => {});

module.exports = Ask;