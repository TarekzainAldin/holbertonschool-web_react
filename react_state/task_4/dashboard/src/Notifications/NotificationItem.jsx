import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ id, type, value, html, markAsRead }) {
  return (
    <li
      data-notification-type={type}
      onClick={() => markAsRead(id)}
      dangerouslySetInnerHTML={html ? html : undefined}
    >
      {!html && value}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  value: '',
  html: null,
  markAsRead: () => {},
};

export default NotificationItem;
