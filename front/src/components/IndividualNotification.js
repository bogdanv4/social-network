function IndividualNotification({ individualNotification }) {
  return (
    <div
      className={`single-post single-notification ${
        !individualNotification.read && "read-no"
      }`}
    >
      <p className="single-post-text">
        {individualNotification.notificationText}
      </p>
      <hr />
      <div className="post-details notification-details">
        <p>
          {`Author: `}
          <span>
            <strong>{individualNotification.post.user.username}</strong>
          </span>
        </p>
        <p>{`Read: ${individualNotification.read}`}</p>
      </div>
    </div>
  );
}

export default IndividualNotification;
