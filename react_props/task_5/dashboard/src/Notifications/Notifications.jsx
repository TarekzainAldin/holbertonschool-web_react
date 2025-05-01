import React from "react";
import "./Notifications.css";
import NotificationItem from "./NotificationItem";
import closeIcon from "../assets/close-icon.png";
import PropTypes from "prop-types";

function Notifications({ notifications = [], displayDrawer = false }) {
  return (
    <>
      <div className="notifications-title">Your notifications</div>

      {displayDrawer && (
        <div className="notifications">
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

          <p>
            {notifications.length === 0
              ? "No new notification for now"
              : "Here is the list of notifications"}
          </p>

          {notifications.length > 0 && (
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
          )}
        </div>
      )}
    </>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
  displayDrawer: PropTypes.bool,
};

export default Notifications;
