const { validationResult } = require('express-validator');
const reservationService = require('../services/reservation-service');

const getReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getReservations();
    res.status(200).json({ status: 'success', reservations });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

const addReservation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 'error', message: errors.array()[0].msg });
  }

  const { title, start_at, end_at } = req.body;

  const existingReservation =
    await reservationService.checkReservationAvailability(start_at, end_at);

  if (existingReservation) {
    return res.status(400).json({
      status: 'error',
      message: 'Reservation time is already booked.',
    });
  }

  try {
    const reservation = await reservationService.addReservation(
      title,
      start_at,
      end_at
    );
    res.status(201).json({ status: 'success', reservation });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

const deleteReservation = async (req, res, next) => {
  const id = req.params.reservationId;

  try {
    const deleted = await reservationService.deleteReservationById(id);
    if (deleted) {
      res
        .status(200)
        .json({
          status: 'success',
          message: 'Reservation deleted successfully',
        });
    } else {
      res
        .status(404)
        .json({ status: 'error', message: 'Reservation not found.' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

module.exports = {
  getReservations,
  addReservation,
  deleteReservation,
};
