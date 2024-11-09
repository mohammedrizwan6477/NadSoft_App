const sequelize = require('../config/db');
const Student = require('./student');

const initModels = () => {
  try {
    sequelize.sync({ alter: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error synchronizing the models:', error);
  }
};

module.exports = { Student, initModels };
