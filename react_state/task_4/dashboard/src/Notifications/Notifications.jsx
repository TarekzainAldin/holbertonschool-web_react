import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import { StyleSheet, css } from 'aphrodite';

class Notifications extends PureComponent {
  render() {
    const {
      displayDrawer,
      notifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
    } = this.props;

    return (
      <>
        <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
          Your notifications
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              style={{ float: 'right', background: 'none', border: 'none' }}
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              ×
            </button>
            <p>Here is the list of notifications</p>
            <ul>
              {notifications.length === 0 ? (
                <li>No new notification for now</li>
              ) : (
                notifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    id={notif.id}
                    type={notif.type}
                    value={notif.value}
                    html={notif.html}
                    markAsRead={markNotificationAsRead}
                  />
                ))
              )}
            </ul>
          </div>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
    cursor: 'pointer',
  },
  notifications: {
    border: '1px dashed red',
    padding: '10px',
    width: '300px',
    position: 'absolute',
    right: 0,
    top: '20px',
    backgroundColor: 'white',
  },
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(PropTypes.object),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

export default Notifications;
