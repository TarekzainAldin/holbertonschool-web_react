import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    // Bind explicite des méthodes
    this.markAsRead = this.markAsRead.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  static propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape),
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
  }

  static defaultProps = {
    displayDrawer: false,
    listNotifications: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  handleClose() {
    console.log('Close button has been clicked');
    this.props.handleHideDrawer();
  }

  shouldComponentUpdate(nextProps) {
    // Only update if the new listNotifications has more items than the current list
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }

  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer } = this.props;
    const { markAsRead, handleClose } = this;

    return (
      <>
        {!displayDrawer && (
          <div id="menu-item" className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
            <p>Your notifications</p>
          </div>
        )}

        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              id="close-btn"
              className={css(styles.closeBtn)}
              aria-label="Close"
              onClick={handleClose}
            >
              x
            </button>
            <p>Here is the list of notifications</p>
            {listNotifications.length === 0 ? (
              <NotificationItem
                type="default"
                value="No new notification for now"
              />
            ) : (
              <ul className={css(styles.ul)}>
                {listNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={() => markAsRead(notification.id)}
                    id={notification.id}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </>
    );
  }
}

const opacityFrames = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 }
};

const bounceFrames = {
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-5px)' },
  '100%': { transform: 'translateY(5px)' }
};

const styles = StyleSheet.create({
  notifications: {
    position: 'absolute',
    border: 'dashed #cf4550 2px',
    padding: '10px',
    width: '30%',
    right: '1rem',
    top: '4rem',
    '@media (max-width: 900px)': {
      inset: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      padding: 0,
      backgroundColor: 'white',
    },
  },
  ul: {
    '@media (max-width: 900px)': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      fontSize: '20px',
    },
  },
  menuItem: {
    position: 'fixed', // Float above other elements
    right: '10px',
    top: '10px',
    backgroundColor: '#fff8f8', // Light red background
    padding: '10px',
    cursor: 'pointer', // Change cursor to pointer on hover
    ':hover': {
      animationName: [opacityFrames, bounceFrames],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3',
      animationTimingFunction: 'ease-in-out',
    },
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    '@media (max-width: 900px)': {
      top: 0,
      right: '.5rem'
    },
  }
});

export default Notifications;
