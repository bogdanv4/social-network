import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [profile, setProfile] = useState("");
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Infinite scroll
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

    fetchPosts(1);

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

  // Novi fetch, sa infinite scroll funkcionalnoscu
  const fetchPosts = async (currentPage) => {
    try {
      const response = await axios.get(
        `/api/post/getAll?page=${currentPage}&limit=3`
      );
      const newPosts = response.data.posts;

      // Remove duplicates before updating the state
      setPosts((prevPosts) => {
        const existingIds = new Set(prevPosts.map((post) => post._id)); // Track existing post IDs
        const uniqueNewPosts = newPosts.filter(
          (post) => !existingIds.has(post._id)
        ); // Filter out duplicates
        return [...prevPosts, ...uniqueNewPosts]; // Append only unique posts
      });

      setHasMore(currentPage * 3 < response.data.totalPosts); // Update `hasMore` correctly
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const loadMorePosts = () => {
    const nextPage = page + 1; // Calculate the next page
    setPage(nextPage); // Update the page state
    fetchPosts(nextPage); // Fetch posts for the next page
  };

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
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
        <InfiniteScroll
          dataLength={posts.length} // Current length of posts
          next={loadMorePosts} // Function to fetch more data
          hasMore={hasMore} // Whether there are more posts to load
          loader={<h4 className="scroll-loading">Loading...</h4>} // Loader shown while fetching
          endMessage={
            <p className="scroll-end-message">
              Congratulation! You have seen it all!
            </p>
          } // Message when all posts are loaded
        >
          <PostList
            loggedInUser={profile}
            posts={posts}
            onPostDeleted={handlePostDeleted}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
}
export default HomePage;
