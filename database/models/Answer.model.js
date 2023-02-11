const Sequelize = require("sequelize");
const connection = require("../modules/database");

const Answer = connection.define("answer", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  askId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answer.sync({ force: false }).then(() => {});

module.exports = Answer;
