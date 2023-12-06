import { Reservation } from './definitions';

export const fetchReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reservations`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.reservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

export const addReservation = async (reservation: Reservation): Promise<Reservation> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reservations/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.reservation;
  } catch (error) {
    console.error('Error adding reservation:', error);
    throw error;
  }
};

export const deleteReservation = async (reservationId: string): Promise<void> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reservations/${reservationId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
};