import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import CreateForm from './components/CreateForm';
import ReservationTable from './components/ReservationTable';
import ErrorAlert from './components/ErrorAlert';

import './App.css';

function App() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  // fetching reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/reservations`
        );
        const reservationResponseData = await reservationResponse.json();

        if (!reservationResponse.ok) {
          throw new Error(reservationResponseData.message);
        }

        setReservations(reservationResponseData.reservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError(error.message);
      }
    };
    fetchReservations();
  }, []);

  // adding reservation
  const addReservation = async (reservation) => {
    try {
      const reservationResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/reservations/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservation),
        }
      );

      const reservationResponseData = await reservationResponse.json();

      if (!reservationResponse.ok) {
        throw new Error(reservationResponseData.message);
      }

      setReservations((prevReservations) =>
        [...prevReservations, reservationResponseData.reservation].sort(
          (a, b) => new Date(a.start_at) - new Date(b.start_at)
        )
      );
    } catch (error) {
      console.error('Error adding reservation:', error);
      setError(error.message);
    }
  };

  // deleteing reservation
  const deleteReservation = async (reservationId) => {
    try {
      const reservationResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/reservations/${reservationId}`,
        {
          method: 'DELETE',
        }
      );

      const reservationResponseData = await reservationResponse.json();

      if (!reservationResponse.ok) {
        throw new Error(reservationResponseData.message);
      }

      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.reservationId !== reservationId
        )
      );
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError(error.message);
    }
  };

  const handleCloseErrorAlert = () => {
    setError(null);
  };

  return (
    <main>
      <Navbar />
      <Container maxWidth='lg'>
        {error && (
          <ErrorAlert message={error} closeErr={handleCloseErrorAlert} />
        )}
        <CreateForm addReservation={addReservation} />
        <ReservationTable
          reservations={reservations}
          onDelete={deleteReservation}
        />
      </Container>
    </main>
  );
}

export default App;
