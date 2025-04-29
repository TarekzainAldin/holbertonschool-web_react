import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders login inputs and message', () => {
  render(<Login />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
});
