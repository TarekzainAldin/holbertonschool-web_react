import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login'; // Adjust the import path as needed

describe('Login Component', () => {
  it('should contain 2 labels, 2 inputs, and 1 button', () => {
    render(<Login />);
    
    const labels = screen.getAllByLabelText(/username|password/i);  // Assuming the labels have text like "username" and "password"
    expect(labels).toHaveLength(2);
    
    const inputs = screen.getAllByRole('textbox');  // For text inputs (username and password)
    expect(inputs).toHaveLength(2);
    
    const button = screen.getByRole('button', { name: /submit/i });  // Assuming the button has text like "submit"
    expect(button).toBeInTheDocument();
  });

  it('should focus input when related label is clicked', () => {
    render(<Login />);
    
    const label = screen.getByLabelText(/username/i); // Assuming the label text is "username"
    const input = screen.getByLabelText(/username/i); // Same for input
    
    fireEvent.click(label);  // Simulate clicking the label
    
    expect(input).toHaveFocus(); // Check if input gets focused
  });
});
