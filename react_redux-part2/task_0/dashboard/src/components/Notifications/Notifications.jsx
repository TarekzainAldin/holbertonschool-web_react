import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications } from '../../features/notifications/notificationsSlice';

export default function Notifications() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map(({ id, type, value, html }) => (
            <li key={id} className={type}>
              {html ? (
                <span dangerouslySetInnerHTML={html} />
              ) : (
                value
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
