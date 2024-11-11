import IndividualNotification from "./IndividualNotification";
function NotificationList({ notifications }) {
  return (
    <>
      {notifications.map((individualNotification) => (
        <IndividualNotification
          key={individualNotification._id}
          individualNotification={individualNotification}
        />
      ))}
    </>
  );
}
export default NotificationList;
