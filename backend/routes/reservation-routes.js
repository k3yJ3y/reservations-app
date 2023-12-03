const express = require('express');
const { check } = require('express-validator');

const {
  getReservations,
  addReservation,
  deleteReservation,
} = require('../controllers/reservation-controller');

const router = express.Router();

router.get('/', getReservations);

router.post(
  '/add',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('start_at')
      .notEmpty()
      .withMessage('Start date and time are required')
      .isISO8601()
      .withMessage('Invalid date and time format for start date and time')
      .custom((value, { req }) => {
        const startAt = new Date(value);
        const now = new Date();
        return startAt > now;
      })
      .withMessage('Start date and time must be set in the future'),
    check('end_at')
      .notEmpty()
      .withMessage('End date and time are required')
      .isISO8601()
      .withMessage('Invalid date and time format for end date and time')
      .custom((value, { req }) => {
        const endAt = new Date(value);
        const startAt = new Date(req.body.start_at);
        return endAt > startAt;
      })
      .withMessage('End date and time must be set after start date and time'),
  ],
  addReservation
);

router.delete('/:reservationId', deleteReservation);

module.exports = router;
