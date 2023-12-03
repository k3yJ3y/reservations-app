import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders App component', async () => {
    render(<App />);

    expect(screen.getByText('Reservations App')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Create Reservation')).toBeInTheDocument();
    });
  });
});
