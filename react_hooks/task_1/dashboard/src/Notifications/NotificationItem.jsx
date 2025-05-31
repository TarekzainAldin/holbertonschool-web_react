import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends React.PureComponent {
  render() {
    const { type, value, html, id, markAsRead } = this.props;

    // Combine common styles.item with conditional style
    const styleClass = css(
      styles.item,
      type === 'urgent' ? styles.urgent : styles.default
    );

    return (
      <li
        className={styleClass}
        data-notification-type={type}
        dangerouslySetInnerHTML={
          type === 'urgent' && html !== undefined ? html : undefined
        }
        onClick={() => markAsRead(id)}
      >
        {type === 'urgent' && html !== undefined ? null : value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  markAsRead: () => {},
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    fontSize: '15px',
    padding: '5px 10px',
    boxSizing: 'border-box',
    '@media (max-width: 900px)': {
      borderBottom: '1px solid black',
    },
  },
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
});

export default NotificationItem;
