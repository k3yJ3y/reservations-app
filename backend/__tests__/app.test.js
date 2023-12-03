const {
  getReservations,
  addReservation,
  deleteReservation,
} = require('../controllers/reservation-controller');

const Reservation = require('../models/reservation');
jest.mock('../models/reservation');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Reservation Controller Tests', () => {
  describe('getReservations', () => {
    it('should return a list of reservations with status code 200', async () => {
      const mockRes = mockResponse();
      Reservation.findAll.mockResolvedValueOnce([
        { reservationId: 1, title: 'Test Reservation' },
      ]);

      await getReservations({}, mockRes, {});

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        reservations: [{ reservationId: 1, title: 'Test Reservation' }],
      });
    });

    it('should handle errors and return status 500 with an error message', async () => {
      const mockRes = mockResponse();

      Reservation.findAll.mockRejectedValueOnce(new Error('Database error'));

      await getReservations({}, mockRes, {});

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Internal Server Error',
      });
    });
  });

  describe('addReservation', () => {
    it('should add a reservation with status code 201', async () => {
      const mockRes = mockResponse();
      const mockReq = {
        body: {
          title: 'Test Reservation',
          start_at: '2075-12-01T12:00:00Z',
          end_at: '2075-12-01T14:00:00Z',
        },
      };

      Reservation.findOne.mockResolvedValueOnce(null);
      Reservation.create.mockResolvedValueOnce({
        reservationId: 1,
        title: 'Test Reservation',
        start_at: '2075-12-01T12:00:00Z',
        end_at: '2075-12-01T14:00:00Z',
      });

      await addReservation(mockReq, mockRes, {});

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        reservation: {
            reservationId: 1,
          title: 'Test Reservation',
          start_at: '2075-12-01T12:00:00Z',
          end_at: '2075-12-01T14:00:00Z',
        },
      });
    });

    it('should handle error if reservation time is already booked', async () => {
      const mockRes = mockResponse();
      const mockReq = {
        body: {
          title: 'Test Reservation',
          start_at: '2075-12-01T12:00:00Z',
          end_at: '2075-12-01T14:00:00Z',
        },
      };

      Reservation.findOne.mockResolvedValueOnce({
        reservationId: 2,
        title: 'Booked Reservation',
        start_at: '2075-12-01T11:00:00Z',
        end_at: '2075-12-01T13:00:00Z',
      });

      await addReservation(mockReq, mockRes, {});

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Reservation time is already booked.',
      });
    });

    it('should handle internal server error and return status 500', async () => {
      const mockRes = mockResponse();
      const mockReq = {
        body: {
          title: 'Test Reservation',
          start_at: '2075-12-01T12:00:00Z',
          end_at: '2075-12-01T14:00:00Z',
        },
      };

      Reservation.findOne.mockRejectedValueOnce(new Error('Database error'));

      await addReservation(mockReq, mockRes, {});

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Internal Server Error',
      });
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation with status code 200', async () => {
      const mockRes = mockResponse();;
      const mockReq = {
        params: {
          reservationId: 1,
        },
      };

      Reservation.findByPk.mockResolvedValueOnce({
        reservationId: 1,
        title: 'Test Reservation',
        start_at: '2075-12-01T12:00:00Z',
        end_at: '2075-12-01T14:00:00Z',
        destroy: jest.fn(),
      });

      await deleteReservation(mockReq, mockRes, {});

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Event deleted successfully',
      });
    });

    it('should handle error if reservation not found', async () => {
      const mockRes = mockResponse();;
      const mockReq = {
        params: {
          reservationId: 1,
        },
      };

      Reservation.findByPk.mockResolvedValueOnce(null); // Reservation not found

      await deleteReservation(mockReq, mockRes, {});

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Reservation not found.',
      });
    });

    it('should handle internal server error and return status 500', async () => {
      const mockRes = mockResponse();
      const mockReq = {
        params: {
          reservationId: 1,
        },
      };

      Reservation.findByPk.mockRejectedValueOnce(new Error('Database error'));

      await deleteReservation(mockReq, mockRes, {});

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Internal Server Error',
      });
    });
  });
});
