const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const Reservation = require('../models/reservation');

const getReservations = async (req, res, next) => {
  let reservations;
  try {
    reservations = await Reservation.findAll({ order: [['start_at', 'ASC']] });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }
  res.status(200).json({ status: 'success', reservations });
};

const addReservation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: errors.array()[0].msg });
  }

  const { title, start_at, end_at } = req.body;

  let existingReservation;
  try {
    existingReservation = await Reservation.findOne({
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
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }

  if (existingReservation) {
    return res.status(400).json({
      status: 'error',
      message: 'Reservation time is already booked.',
    });
  }

  let reservation;
  try {
    reservation = await Reservation.create({
      title,
      start_at,
      end_at,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }

  res.status(201).json({ status: 'success', reservation });
};

const deleteReservation = async (req, res, next) => {
  const id = req.params.reservationId;

  let reservation;
  try {
    reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Reservation not found.' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }

  try {
    await reservation.destroy();
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }

  res
    .status(200)
    .json({ status: 'success', message: 'Event deleted successfully' });
};

module.exports = {
  getReservations,
  addReservation,
  deleteReservation,
};
