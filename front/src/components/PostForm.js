import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function PostForm({ loggedInUser, onPostAdded, onNotificationAdded }) {
  const [postText, setPostText] = useState("");

  const handlePostText = (e) => {
    setPostText(e.target.value);
  };

  const handlePublishPost = async (e) => {
    e.preventDefault();
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const formattedDate = `${day}/${month}/${year}`;

    if (postText === "") alert("Please add post text");
    else {
      try {
        const response = await axios.post("/api/post/addPost", {
          postText,
          date: formattedDate,
          user: loggedInUser,
        });

        onPostAdded(response.data.post);
        alert("Post added");
        try {
          const responseForNotification = await axios.post(
            "/api/notification/addNotification",
            {
              notificationText: response.data.post.postText,
              post: response.data.post,
              user: loggedInUser,
            }
          );
          onNotificationAdded(responseForNotification.data.notification);
          toast.info(
            `${responseForNotification.data.notification.post.user.username}: \n${responseForNotification.data.notification.notificationText}`
          );
        } catch (error) {
          console.log(error);
        }
        setPostText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className="post-form">
      <textarea
        value={postText}
        onChange={handlePostText}
        placeholder="What's happening?"
      ></textarea>
      <button className="regular-button" onClick={handlePublishPost}>
        Publish
      </button>
    </form>
  );
}
export default PostForm;
