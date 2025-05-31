import PropTypes from 'prop-types';
import { memo } from 'react';
import { StyleSheet, css } from 'aphrodite';

function NotificationItem({ type, value, html, id, markAsRead }) {
  const styleClass = css(
    type === 'urgent' ? styles.urgent : styles.default,
    styles.responsive
  );

  return html && type === 'urgent' ? (
    <li
      data-notification-type={type}
      className={styleClass}
      dangerouslySetInnerHTML={html}
      onClick={() => markAsRead(id)}
    />
  ) : (
    <li
      data-notification-type={type}
      className={styleClass}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
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
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
  responsive: {
    '@media (max-width: 900px)': {
      width: '100%',
      borderBottom: '1px solid black',
      fontSize: '20px',
      padding: '10px 8px',
    },
  },
});

export default memo(NotificationItem);
