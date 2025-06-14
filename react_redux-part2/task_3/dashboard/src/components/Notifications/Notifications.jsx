import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getFilteredNotifications } from "../../features/selectors/notificationsSelector";
import NotificationItem from "../NotificationItem/NotificationItem";

export default function Notifications() {
  const [currentFilter, setCurrentFilter] = useState("all");

  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter)
  );

  const loading = useSelector((state) => state.notifications.loading);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (filteredNotifications.length === 0) {
    return <div>No notifications</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setCurrentFilter("all")}>All</button>
        <button onClick={() => setCurrentFilter("urgent")}>‼️ Urgent</button>
        <button onClick={() => setCurrentFilter("default")}>🔔 Default</button>
      </div>
      <ul>
        {filteredNotifications.map(({ id, type, value }) => (
          <NotificationItem key={id} id={id} type={type} value={value} />
        ))}
      </ul>
    </div>
  );
}
