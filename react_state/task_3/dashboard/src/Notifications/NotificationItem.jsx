import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type, value, html, id, markAsRead }) {
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
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  id: PropTypes.number,
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  id: 0,
  markAsRead: () => {},
};

export default NotificationItem;
