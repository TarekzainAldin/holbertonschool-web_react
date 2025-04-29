import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders the header with title and logo', () => {
  render(<Header />);
  expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /holberton logo/i })).toBeInTheDocument();
});
