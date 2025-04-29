import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  it('should contain 2 labels, 2 inputs, and 1 button', () => {
    render(<Login />);

    // Match labels for email and password
    const labels = screen.getAllByText(/email|password/i);
    expect(labels).toHaveLength(2);

    // Get inputs (email is "textbox", password via label)
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const inputs = [emailInput, passwordInput];
    expect(inputs).toHaveLength(2);

    // Check the OK button
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });

  it('should focus input when related label is clicked', async () => {
    render(<Login />);
    const user = userEvent.setup();

    const label = screen.getByText(/email/i);
    const input = screen.getByLabelText(/email/i);

    await user.click(label);

    expect(input).toHaveFocus();
  });
});
