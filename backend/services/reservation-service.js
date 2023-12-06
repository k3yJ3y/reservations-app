const { Op } = require('sequelize');
const Reservation = require('../models/reservation');

const getReservations = async () => {
  return await Reservation.findAll({ order: [['start_at', 'ASC']] });
};

const addReservation = async (title, start_at, end_at) => {
  return await Reservation.create({
    title,
    start_at,
    end_at,
  });
};

const checkReservationAvailability = async (start_at, end_at) => {
  return await Reservation.findOne({
    where: {
      [Op.or]: [
        {
          start_at: {
            [Op.between]: [start_at, end_at],
          },
        },
        {
          end_at: {
            [Op.between]: [start_at, end_at],
          },
        },
      ],
    },
  });
};

const deleteReservationById = async (id) => {
  const reservation = await Reservation.findByPk(id);
  if (reservation) {
    await reservation.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getReservations,
  addReservation,
  checkReservationAvailability,
  deleteReservationById,
};
