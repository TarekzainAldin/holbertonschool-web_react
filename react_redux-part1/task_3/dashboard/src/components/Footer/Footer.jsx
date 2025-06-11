import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  // Get isLoggedIn from Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <p>© {new Date().getFullYear()} - My Company</p>
      {/* Render Contact us link only if isLoggedIn is true */}
      {Boolean(isLoggedIn) && (
        <a href="#" data-testid="contact-link">
          Contact us
        </a>
      )}
    </div>
  );
}
