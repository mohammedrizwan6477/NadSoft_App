
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  member_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  member_email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  member_age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: true
});

module.exports = Student;
