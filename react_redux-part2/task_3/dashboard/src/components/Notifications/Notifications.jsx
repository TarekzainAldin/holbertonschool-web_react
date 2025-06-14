import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications, markNotificationAsRead } from "../../features/notifications/notificationsSlice";
import { getFilteredNotifications } from "../../features/selectors/notificationsSelector";
import NotificationItem from "../NotificationItem/NotificationItem";

export default function Notifications() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.notifications);
  const [currentFilter, setCurrentFilter] = useState("all");
  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter)
  );

  React.useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleSetFilterUrgent = () => setCurrentFilter("urgent");
  const handleSetFilterDefault = () => setCurrentFilter("default");
  const handleSetFilterAll = () => setCurrentFilter("all");

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  if (loading) return <p>Loading...</p>;

  if (filteredNotifications.length === 0)
    return <p>No notifications to display</p>;

  return (
    <div>
      <div>
        <button onClick={handleSetFilterAll}>All</button>
        <button onClick={handleSetFilterUrgent}>‼️ Urgent</button>
        <button onClick={handleSetFilterDefault}>🔵 Default</button>
      </div>
      <ul>
        {filteredNotifications.map(({ id, type, value }) => (
          <NotificationItem
            key={id}
            id={id}
            type={type}
            value={value}
            markAsRead={handleMarkAsRead}
          />
        ))}
      </ul>
    </div>
  );
}
