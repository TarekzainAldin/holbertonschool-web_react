// NotificationItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

const NotificationItem = ({ type, html, value }) => {
  const style = {
    color: type === 'urgent' ? 'red' : 'blue'
  };

  if (value) {
    return <li data-notification-type={type} style={style}>{value}</li>;
  }

  return <li data-notification-type={type} style={style} dangerouslySetInnerHTML={html}></li>;
};

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string
};

NotificationItem.defaultProps = {
  type: 'default',
  html: null,
  value: ''
};

export default NotificationItem;
