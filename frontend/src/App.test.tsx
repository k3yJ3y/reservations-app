import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App Component', () => {
  test('renders App component', async () => {
    render(<App />);

    const elementOne = screen.getByText(/Reservations App/i);
    expect(elementOne).toBeInTheDocument();
  });
});
