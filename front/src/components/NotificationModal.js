// import { useState } from "react";
import NotificationList from "./NotificationList";

function NotificationModal({ onClose, read, onMarkAllAsRead }) {
  return (
    <div className="user-info-overlay notification-modal-overlay">
      <div className="user-info-content notification-modal-content">
        <h2>Notifications:</h2>
        <button className="icon-btn read-all" onClick={onMarkAllAsRead}>
          <img src="read-all.png" alt="read-all-icon" />
          <span>Mark all as read</span>
        </button>
        <NotificationList read={read} />

        <button className="modal-close" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
}

export default NotificationModal;