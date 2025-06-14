import { memo } from "react";
import { useDispatch } from "react-redux";
import { markNotificationAsRead } from "../../features/notifications/notificationsSlice";

const NotificationItem = memo(function NotificationItem({ id, type, value }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(markNotificationAsRead(id));
  };

  return (
    <li
      style={{ color: type === "urgent" ? "red" : "blue" }}
      data-notification-type={type}
      onClick={handleClick}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
