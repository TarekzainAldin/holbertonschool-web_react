
import { useSelector } from "react-redux";

export default function Footer() {
  // Get isLoggedIn from Redux store explicitly
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <p>© {new Date().getFullYear()} - My Company</p>
      {isLoggedIn === true && (
        <a href="#" data-testid="contact-link">
          Contact us
        </a>
      )}
    </div>
  );
}
