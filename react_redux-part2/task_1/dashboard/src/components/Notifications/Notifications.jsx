import React from "react";
import { useSelector } from "react-redux";

export default function Notifications() {
  const { notifications, loading } = useSelector((state) => state.notifications);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (notifications.length === 0) {
    return <div>No notifications</div>;
  }

  return (
    <ul>
      {notifications.map(({ id, type, value, html }) => (
        <li key={id} data-notification-type={type}>
          {value ? value : <span dangerouslySetInnerHTML={html} />}
        </li>
      ))}
    </ul>
  );
}
