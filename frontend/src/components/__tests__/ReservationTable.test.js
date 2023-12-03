import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReservationTable from '../ReservationTable';
import { formatDate } from '../../util/formatDate';

const sampleReservations = [
  {
    reservationId: 1,
    title: 'Sample Reservation 1',
    start_at: '2075-01-01T12:00:00',
    end_at: '2075-01-01T14:00:00',
  },
  {
    reservationId: 2,
    title: 'Sample Reservation 2',
    start_at: '2075-01-02T12:00:00',
    end_at: '2075-01-02T14:00:00',
  },
];

describe('ReservationTable', () => {
  it('renders the placeholder when there are no reservations', () => {
    render(<ReservationTable reservations={[]} />);
    const placeholderText = screen.getByText(
      'There are no active reservations at the moment ...'
    );
    expect(placeholderText).toBeInTheDocument();
  });

  it('renders reservations correctly', () => {
    render(<ReservationTable reservations={sampleReservations} />);
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Start At')).toBeInTheDocument();
    expect(screen.getByText('End At')).toBeInTheDocument();

    for (const reservation of sampleReservations) {
      const titleCell = screen.getByText(reservation.title);
      const startAtCell = screen.getByText(
        new RegExp(formatDate(reservation.start_at))
      );
      const endAtCell = screen.getByText(
        new RegExp(formatDate(reservation.end_at))
      );
      const deleteButton = screen.getByTestId(`delete-button-${reservation.reservationId}`);

      expect(titleCell).toBeInTheDocument();
      expect(startAtCell).toBeInTheDocument();
      expect(endAtCell).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    }
  });


});