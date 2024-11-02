import axios from "axios";
import { useState } from "react";

function IndividualComment({ loggedInUser, comment, onCommentDelete }) {
  const [liked, setLiked] = useState(
    comment.likedBy.includes(loggedInUser._id)
  );
  const [numberOfLikes, setNumberOfLikes] = useState(comment.likes || 0);

  const handleDeleteComment = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete this comment")) {
      axios
        .delete(`/api/comment/deleteComment/${comment._id}`)
        .then(() => {
          alert("Comment deleted");
          onCommentDelete(comment._id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLikeComment = async (e) => {
    e.preventDefault();

    try {
      // Determine the action based on the current liked state
      const action = liked ? "unlike" : "like";

      const response = await axios.put(
        `/api/comment/updateComment/${comment._id}`,
        {
          userId: loggedInUser._id, // Send the user ID
          action,
        }
      );
      setNumberOfLikes(response.data.comment.likes);
      setLiked(!liked);
      console.log(action);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="individual-comment">
      <p>
        <span>
          <strong>{`${comment.user.username}: `}</strong>
        </span>
        {comment.commentText}
      </p>
      <div className="individual-comment-inner">
        {loggedInUser.username === comment.user.username ? (
          <button className="icon-btn" onClick={handleDeleteComment}>
            <img src="bin.png" alt="like" />
          </button>
        ) : (
          <span></span>
        )}
        <button className="icon-btn" onClick={handleLikeComment}>
          <img src={liked ? "liked.png" : "like.png"} alt="like" />
        </button>
        <p>{`${numberOfLikes} ${numberOfLikes === 1 ? "like" : "likes"}`}</p>
      </div>
    </div>
  );
}

export default IndividualComment;
