import closebtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const opacityKeyframes = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 }
};

const bounceKeyframes = {
  '0%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-5px)' },
  '100%': { transform: 'translateY(5px)' }
};

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { notifications, displayDrawer, handleDisplayDrawer, handleHideDrawer} = this.props;

    return (
      <>
        {!displayDrawer && (
          <div className={css(styles.notiftitle)} onClick={handleDisplayDrawer}>
            Your notifications
          </div>
        )}
        {displayDrawer && (
          <div className={css(styles.notifications, styles.notificationsVisible)}>
            {notifications.length > 0 ? (
              <>
                <p className={css(styles.notifparagraph)}>Here is the list of notifications</p>
                <button
                  className={css(styles.notifbutton)}
                  onClick={handleHideDrawer}
                  aria-label="Close"
                >
                  <img className={css(styles.notifimg)} src={closebtn} alt="Close" />
                </button>
                <ul className={css(styles.notificationsList)}>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={() => this.props.markNotificationAsRead(notification.id)}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <p>No new notification for now</p>
            )}
          </div>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  notiftitle: {
    display: 'flex',
    justifyContent: 'end',
    backgroundColor: '#fff8f8',
    cursor: 'pointer',
    position: 'fixed',
    right: '1rem',
    top: '1rem',
    zIndex: 10,
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    '@media (max-width: 900px)': {
      display: 'flex',
      justifyContent: 'end',
      cursor: 'pointer',
    },
    ':hover': {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: ['1s', '0.5s'],
      animationIterationCount: [3, 3],
      animationTimingFunction: 'ease-in-out',
    }
  },
  notifications: {
    display: 'none',
    flexDirection: 'column',
    borderStyle: 'dotted',
    borderColor: '#e1003c',
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  notificationsVisible: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'dotted',
    borderColor: '#e1003c',
    position: 'fixed',
    top: '3rem',
    right: '1rem',
    backgroundColor: 'white',
    padding: '1rem',
    zIndex: 5,
    minWidth: '250px',
    '@media (max-width: 900px)': {
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1000,
      backgroundColor: 'white',
      padding: 0,
      margin: 0,
    },
  },
  notificationsList: {
    padding: '0',
    margin: '0.5rem 0 0 0',
    listStyle: 'none',
    '@media (max-width: 900px)': {
      width: '100%',
      padding: '10px 8px',
      fontSize: '20px',
      borderBottom: '1px solid black',
      listStyle: 'none',
    },
  },
  notifbutton: {
    position: 'absolute',
    display: 'flex',
    background: 'none',
    borderStyle: 'none',
    right: '1rem',
    top: '1rem',
    width: '0.5rem',
    height: '0.5rem',
    '@media (max-width: 900px)': {
      top: '0.5rem',
      right: '1rem',
    },
  },
  notifimg: {
    width: '0.5rem',
    height: '0.5rem',
  },
  notifparagraph: {
    margin: '0',
    fontWeight: 'bold',
    '@media (max-width: 900px)': {
      margin: '10px',
      fontSize: '20px',
    },
  },
});

Notifications.propTypes = {
	displayDrawer: PropTypes.bool,
	handleDisplayDrawer: PropTypes.func,
	handleHideDrawer: PropTypes.func
};

Notifications.defaultProps = {
	displayDrawer: false,
	handleDisplayDrawer: () => {},
	handleHideDrawer: () => {}
};

export default Notifications;
