import { useNotificationStore } from '../../stores/notifications';
import './index.css';

export const ToastHost = () => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="toast-host">
      {notifications.map((notification) => (
        <div key={notification.id} className={`toast ${notification.type}`}>
          <span className="toast-message">{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="toast-close-btn"
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}