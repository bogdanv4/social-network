import axios from "axios";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";

function Post({ loggedInUser, post, onPostDeleted }) {
  const [commentText, setCommentText] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(post.likedBy.includes(loggedInUser._id));
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes || 0);

  useEffect(() => {
    axios
      .get(`/api/comment/getAll/${post._id}`)
      .then((result) => {
        setComments(result.data.comments);
        console.log(result.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [post._id]);

  const handleCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddCommentButton = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    if (commentText === "") {
      alert("Please add comment text");
    } else {
      try {
        const response = await axios.post("/api/comment/addComment", {
          commentText,
          date: formattedDate,
          user: loggedInUser,
          post: post._id,
        });
        alert("Comment added");

        // Update comments immediately, adding `loggedInUser` as the author
        const newComment = {
          ...response.data.comment,
          user: loggedInUser, // Attach the logged-in user as the comment author
        };

        setComments((prevComments) => [newComment, ...prevComments]);
        setCommentText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCommentDisplay = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete post")) {
      axios
        .delete(`/api/post/deletePost/${post._id}`)
        .then(() => {
          alert("Post deleted");
          onPostDeleted(post._id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      // Determine the action based on the current liked state
      const action = liked ? "unlike" : "like";

      const response = await axios.put(`/api/post/updatePost/${post._id}`, {
        userId: loggedInUser._id, // Send the user ID
        action,
      });
      setNumberOfLikes(response.data.post.likes);
      setLiked(!liked);
      console.log(action);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    ); // Remove the deleted comment from the list
  };

  return (
    <div className="single-post">
      <p className="single-post-text">{post.postText}</p>
      <hr />
      <div className="post-details">
        <p>
          {`Author: `}
          <span>
            <strong>{post.user.username}</strong>
          </span>
        </p>
        <div className="comment-buttons">
          <div className="comment-buttons-child likes">
            <button className="icon-btn" onClick={handleLike}>
              <img src={liked ? "liked.png" : "like.png"} alt="like" />
            </button>
            <p>{`${numberOfLikes} ${
              numberOfLikes === 1 ? "like" : "likes"
            }`}</p>
          </div>
          <div className="comment-buttons-child comments">
            <button className="icon-btn" onClick={handleCommentDisplay}>
              <img src="comment.png" alt="comments" />
              <span>Comment</span>
            </button>
          </div>
          {loggedInUser.username === post.user.username ? (
            <button
              className="regular-button delete-button"
              onClick={handleDeletePost}
            >
              Delete post
            </button>
          ) : null}
        </div>
      </div>
      {isCommentOpen && (
        <div className="post-comment">
          <form>
            <textarea
              value={commentText}
              onChange={handleCommentText}
              placeholder="Your comment..."
            ></textarea>
            <button className="regular-button" onClick={handleAddCommentButton}>
              Comment
            </button>
          </form>
        </div>
      )}
      <CommentList
        loggedInUser={loggedInUser}
        comments={comments}
        onCommentDelete={handleCommentDeleted}
      />
    </div>
  );
}

export default Post;
