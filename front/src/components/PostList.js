import Post from "./Post";

function PostList({ loggedInUser, posts, onPostDeleted }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          loggedInUser={loggedInUser}
          onPostDeleted={onPostDeleted}
        /> // Pass individual post data to Post component
      ))}
    </div>
  );
}

export default PostList;
