import IndividualComment from "./IndividualComment";
function CommentList({ loggedInUser, comments, onCommentDelete }) {
  return (
    <div>
      {comments.map((comment) => (
        <IndividualComment
          key={comment._id}
          comment={comment}
          loggedInUser={loggedInUser}
          onCommentDelete={onCommentDelete}
        />
      ))}
    </div>
  );
}
export default CommentList;
