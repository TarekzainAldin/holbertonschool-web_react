
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import AppContext from '../App/AppContext';

// دالة مزيفة لإعادة إنشاء الـ Context مع القيمة المرغوبة
const renderWithContext = (ui, { providerProps }) => {
  return render(
    <AppContext.Provider value={providerProps}>
      {ui}
    </AppContext.Provider>
  );
};

describe('Footer component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
  });

  test('does not display "Contact us" when user is logged out', () => {
    const providerProps = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: jest.fn(),
    };

    renderWithContext(<Footer />, { providerProps });

    const contactLink = screen.queryByText(/Contact us/i);
    expect(contactLink).not.toBeInTheDocument();
  });

  test('displays "Contact us" when user is logged in', () => {
    const providerProps = {
      user: {
        email: 'user@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };

    renderWithContext(<Footer />, { providerProps });

    const contactLink = screen.getByText(/Contact us/i);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.tagName).toBe('A');
  });
});
