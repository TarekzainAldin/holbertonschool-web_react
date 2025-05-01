import React from "react";
import "./Notifications.css";
import NotificationItem from "./NotificationItem";
import closeIcon from "../assets/close-icon.png";

function Notifications({ notifications = [] }) {
  return (
    <div
      className="notifications"
      style={{
        border: "2px dashed red",
        padding: "10px",
        position: "relative",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close"
        onClick={() => console.log("Close button has been clicked")}
      >
        <img
          src={closeIcon}
          alt="close icon"
          style={{ height: "10px", width: "10px" }}
        />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            value={notification.value}
            html={notification.html}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;