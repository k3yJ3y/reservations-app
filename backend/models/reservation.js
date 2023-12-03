const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/db');

const Reservation = sequelize.define('Reservation', {
  reservationId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Reservation;
