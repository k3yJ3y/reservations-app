import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateForm from '../CreateForm';

describe('CreateForm', () => {
  it('should render the form and handle submission', () => {
    const mockAddReservation = jest.fn();

    render(<CreateForm addReservation={mockAddReservation} />);

    const titleInput = screen.getByTestId('title-input');
    const startAtInput = screen.getByTestId('start_at-input');
    const endAtInput = screen.getByTestId('end_at-input');
    const addButton = screen.getByText('Add Reservation');

    fireEvent.change(titleInput, { target: { value: 'Test Reservation' } });
    fireEvent.change(startAtInput, { target: { value: '2075-12-01T12:00' } });
    fireEvent.change(endAtInput, { target: { value: '2075-12-01T14:00' } });

    fireEvent.click(addButton);

    expect(mockAddReservation).toHaveBeenCalledWith({
      title: 'Test Reservation',
      start_at: '2075-12-01T12:00',
      end_at: '2075-12-01T14:00',
    });

    expect(titleInput).toHaveValue('');
    expect(startAtInput).toHaveValue('');
    expect(endAtInput).toHaveValue('');
  });
});
