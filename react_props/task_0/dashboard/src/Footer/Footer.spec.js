import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer with copyright', () => {
  render(<Footer />);
  expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
});
