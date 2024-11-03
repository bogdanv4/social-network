function IndividualNotification({ read }) {
  return (
    <div className={`single-post single-notification ${!read && "read-no"}`}>
      <p className="single-post-text">{`Naziv obavestenja`}</p>
      <hr />
      <div className="post-details notification-details">
        <p>
          {`Author: `}
          <span>
            <strong>{`Bogdan`}</strong>
          </span>
        </p>
        <p>{`Read: ${read}`}</p>
      </div>
    </div>
  );
}

export default IndividualNotification;
