import IndividualNotification from "./IndividualNotification";
function NotificationList({ read }) {
  return (
    <>
      <IndividualNotification read={read} />
      <IndividualNotification read={read} />
      <IndividualNotification read={read} />
      <IndividualNotification read={read} />
      <IndividualNotification read={read} />
    </>
  );
}
export default NotificationList;
