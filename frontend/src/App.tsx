import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import CreateForm from './components/CreateForm';
import ReservationTable from './components/ReservationTable';
import ErrorAlert from './components/ErrorAlert';

import './App.css';

import { Reservation } from './lib/definitions';

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]); // Specify the type
  const [error, setError] = useState<string | null>(null);


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
      } catch (error: any) {
        console.error('Error fetching reservations:', error);
        setError(error.message);
      }
    };
    fetchReservations();
  }, []);

  // adding reservation
  const addReservation = async (reservation: Reservation) => {
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
          (a, b) =>
            new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
        )
      );
    } catch (error: any) {
      console.error('Error adding reservation:', error);
      setError(error.message);
    }
  };

  // deleteing reservation
  const deleteReservation = async (reservationId: string) => {
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
    } catch (error: any) {
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
