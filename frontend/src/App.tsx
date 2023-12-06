import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import CreateForm from './components/CreateForm';
import ReservationTable from './components/ReservationTable';
import ErrorAlert from './components/ErrorAlert';
import {
  fetchReservations,
  addReservation,
  deleteReservation,
} from './lib/apiService';

import './App.css';

import { Reservation } from './lib/definitions';

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]); // Specify the type
  const [error, setError] = useState<string | null>(null);

  // fetching reservations
  useEffect(() => {
    const fetchReservationsData = async () => {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchReservationsData();
  }, []);

  // adding reservation
  const addReservationHandler = async (reservation: Reservation) => {
    try {
      const data = await addReservation(reservation);
      setReservations((prevReservations) =>
        [...prevReservations, data].sort(/* your sorting logic */)
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  // deleteing reservation
  const deleteReservationHandler = async (reservationId: string) => {
    try {
      await deleteReservation(reservationId);
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.reservationId !== reservationId
        )
      );
    } catch (error: any) {
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
        <CreateForm addReservation={addReservationHandler} />
        <ReservationTable
          reservations={reservations}
          onDelete={deleteReservationHandler}
        />
      </Container>
    </main>
  );
}

export default App;
