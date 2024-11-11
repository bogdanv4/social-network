import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [profile, setProfile] = useState("");
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("/api/getme")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setProfile(result.user);
      })
      .catch((error) => {
        console.log(error);
      });

    //Ispisuje sve postove u console - dodati logiku
    fetch("/api/post/getAll")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setPosts(result.posts);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("api/notification/getAll")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setNotifications(result.notifications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the top of the list
  };

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId)); // Remove the deleted post from the list
  };

  const handleNotificationAdded = (notification) => {
    setNotifications((prevNotifications) => [
      notification,
      ...prevNotifications,
    ]);
  };

  const handleMarkAllAsRead = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/notification/markAllAsRead");
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.log("Error marking notifications as read:", error);
    }
  };

  return (
    <div className="home-page-wrapper">
      <Navbar
        loggedInUser={profile}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
      <div className="container">
        <PostForm
          loggedInUser={profile}
          onPostAdded={handlePostAdded}
          onNotificationAdded={handleNotificationAdded}
        />
        <h2>All posts</h2>
        <PostList
          loggedInUser={profile}
          posts={posts}
          onPostDeleted={handlePostDeleted}
        />
      </div>
    </div>
  );
}
export default HomePage;
