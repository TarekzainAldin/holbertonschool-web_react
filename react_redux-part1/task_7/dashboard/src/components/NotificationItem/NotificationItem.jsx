import { memo } from 'react';

const NotificationItem = memo(function NotificationItem({
    type,
    html,
    value,
    markAsRead,
    id
}) {
    console.log(`Rendering NotificationItem with id: ${id}, type: ${type}, value: ${value}`);

    const handleClick = () => markAsRead(id);

    if (type === 'default') {
        return (
            <li
                style={{ color: "blue" }}
                data-notification-type={type}
                onClick={handleClick}
            >
                {value}
            </li>
        );
    }

    if (type === 'urgent' && html !== undefined) {
        return (
            <li
                style={{ color: "red" }}
                data-notification-type={type}
                dangerouslySetInnerHTML={html}
                onClick={handleClick}
            />
        );
    }

    return (
        <li
            style={{ color: "red" }}
            data-notification-type={type}
            onClick={handleClick}
        >
            {value}
        </li>
    );
});

export default NotificationItem;
