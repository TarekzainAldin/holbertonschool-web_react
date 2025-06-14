import React from "react";

export default function NotificationItem({ id, type, value, markAsRead }) {
  const style = {
    color: type === "urgent" ? "red" : "blue",
    cursor: "pointer",
  };

  const handleClick = () => {
    if (markAsRead) markAsRead(id);
  };

  return (
    <li
      data-notification-type={type}
      style={style}
      onClick={handleClick}
      role="listitem"
    >
      {value}
    </li>
  );
}
