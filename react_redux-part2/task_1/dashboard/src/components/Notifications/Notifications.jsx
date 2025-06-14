import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../redux/notificationsSlice';

export default function Notifications() {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) {
    return <div className="notifications-loading">Loading...</div>;
  }

  if (error) {
    return <div className="notifications-error">Error fetching notifications: {error}</div>;
  }

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id}>
              {notif.value || (notif.html ? <span dangerouslySetInnerHTML={notif.html} /> : null)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
