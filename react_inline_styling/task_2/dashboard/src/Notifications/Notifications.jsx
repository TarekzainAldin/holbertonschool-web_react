import React from "react";
import { StyleSheet, css } from "aphrodite";
import closebtn from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { notifications = [], displayDrawer = true } = this.props;

    return (
      <>
        <div className={css(styles.title)}>
          <p>Your notifications</p>
        </div>
        {displayDrawer ? (
          <div className={css(styles.notifications)}>
            {notifications.length > 0 ? (
              <>
                <p>Here is the list of notifications</p>
                <button
                  onClick={() => console.log("Close button has been clicked")}
                  aria-label="Close"
                  className={css(styles.closeButton)}
                >
                  <img src={closebtn} alt="Close" />
                </button>
                <ul>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <p>No new notification for now</p>
            )}
          </div>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  notifications: {
    border: "2px dashed red",
    padding: "10px",
    marginBottom: "20px",
    marginTop: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
});

export default Notifications;
