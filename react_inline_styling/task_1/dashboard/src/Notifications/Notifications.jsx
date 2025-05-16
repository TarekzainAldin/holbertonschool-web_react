import closebtn from '../assets/close-button.png'
import NotificationItem from './NotificationItem';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.notifications.length !== this.props.notifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }

  render() {
    const { notifications, displayDrawer=true } = this.props;

    return (
      <>
        <div className={css(styles.notiftitle)}>
          <p>Your notifications</p>
        </div>
          {displayDrawer ? (
            <div className={css(styles.notifications)}>
              {notifications.length > 0 ? (
                <>
                <p className={css(styles.notifparagraph)}>Here is the list of notifications</p>
                <button
                className={css(styles.notifbutton)}
                onClick={() => console.log('Close button has been clicked')} aria-label="Close">
                <img className={css(styles.notifimg)} src={closebtn} alt='CLose' />
                </button>
                <ul>
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        type={notification.type}
                        value={notification.value}
                        html={notification.html}
                        markAsRead={() => this.markAsRead(notification.id)} />
                    ))}
                  </ul>
                </>
              ) : (
                <p>No new notification for now</p>
                )}
            </div>
          ) : (
            <></>
          )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  notiftitle: {
    display: 'flex',
    justifyContent: 'end',
  },
  notifications: {
    display: 'block',
    flexDirection: 'column',
    borderStyle: 'dotted',
    borderColor: '#e1003c',
  },
  notifbutton: {
    position: 'absolute',
    display: 'flex',
    background: 'none',
    borderStyle: 'none',
    right: '1.5rem',
    top: '3.5rem',
    width: '0.5rem',
    height: '0.5rem',
  },
  notifimg: {
    width: '0.5rem',
    height: '0.5rem',
  },
  notifparagraph: {
    margin: 'auto',
  },
})

export default Notifications;
