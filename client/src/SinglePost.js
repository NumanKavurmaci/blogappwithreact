import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./SinglePost.css";
import Comment from "./comment";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { AuthContext } from "./auth";
function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [author, setAuthor] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Loading state
  let [hasLiked, setHasLiked] = useState(false); // tracking like status
  useEffect(() => {
    setLoading(true);
    fetch(`/SinglePost/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post);
        setComments(data.comments);
        const tagsString = data.post.tags;
        const parsedTagsArray = tagsString
          .slice(1, -1) // Remove the leading and trailing curly braces
          .split(",") // Split the string into an array
          .map((tag) => tag.replace(/"/g, "").trim()); // Remove quotes and trim whitespace
        setTagsArray(parsedTagsArray); // Set the parsed tags array

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching single post:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [id]);
  //get user id
  const userId = currentUser ? currentUser.uid : null;
  console.log("parsedTagsArray:", tagsArray);

  const checkUserLikedPost = async (userId) => {
    try {
      const response = await fetch(`/CheckUserLikedPost/${userId}/${id}`);
      const data = await response.json();
      hasLiked = data.result;
      console.log("hasLiked:", data.result);

      setHasLiked(hasLiked);
    } catch (error) {
      console.error("Error checking user's like:", error);
    }
  };

  const handleRemoveLike = async () => {
    hasLiked = checkUserLikedPost(userId);
    console.log("hasLiked:", hasLiked);
    if (hasLiked !== undefined) {
      console.log("hasLiked !== undefined");
      console.log("hasLiked:", hasLiked);
    }

    if (userId === null) {
      alert("Please login to remove your like");
      return;
    } else if (!hasLiked) {
      alert("You have not liked this post");
      return;
    }
    if (hasLiked === false) {
      console.log("hasLiked === false");
      console.log("hasLiked:", hasLiked);
      alert("You have not liked this post");
      return;
    }

    try {
      const response = await fetch(`/RemoveLike`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          postId: id,
        }),
      });

      if (response.ok) {
        // Fetch the updated post data after removing the like
        const updatedPostResponse = await fetch(`/SinglePost/${id}`);
        const updatedPostData = await updatedPostResponse.json();
        setPost(updatedPostData.post);
      } else {
        console.error("Error removing like from post");
        console.log(response);
        alert("Error removing like from post");
      }
    } catch (error) {
      console.error("Error removing like from post:", error);
    }
  };
  const handleTagClick = (tag) => {
    window.location.href = `/searchtag/${tag}`;
  };

  const handleLike = async () => {
    if (!auth.currentUser) {
      console.log("auth.currentUser:", auth.currentUser);
      alert("Please login to like a post");
      return;
    }
    if (userId === null) {
      alert("Please login to like a post");
      return;
    }

    checkUserLikedPost(userId);

    if (hasLiked) {
      console.log("hasLiked:", hasLiked);
      alert("You have already liked this post");
      return;
    }

    try {
      const response = await fetch(`/likePost/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      if (response.ok) {
        // Fetch the updated post data after liking
        const updatedPostResponse = await fetch(`/SinglePost/${id}`);
        const updatedPostData = await updatedPostResponse.json();
        setPost(updatedPostData.post);
      } else {
        console.error("Error liking post");
        console.log(response);
        alert("Error liking post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`/DeletePost/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Redirect to the home page after successful deletion
        window.location.href = "/";
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handleDeletePost = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (isConfirmed) {
      deletePost();
    }
  };
  const handleCreateComment = async () => {
    try {
      const response = await fetch(`/CreateComment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newCommentText,
          author: author,
        }),
      });
      console.log("response:", response);

      if (response.ok) {
        // Successfully added comment to the backend
        const newComment = await response.json();
        console.log("newComment:", newComment);
        //setComments([...comments, newComment]);
        setNewCommentText("");
      } else {
        console.error("Error adding comment to backend");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  let commentsArray = [];
  if (comments !== undefined) {
    comments.comments.forEach((comment) => {
      commentsArray.push(comment);
    });
  }
  return (
    <div className="single-post">
      <img src={post.image} alt="Post" />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="tags">
        {tagsArray.map((tag, index) => (
          <button
            className="tag-button"
            key={index}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="likes">
        {hasLiked ? (
          <>
            <button className="dislike-button" onClick={handleRemoveLike}>
              Remove Like
            </button>
            <span className="likes-count">{post.likes} Likes</span>
          </>
        ) : (
          <>
            <button className="like-button" onClick={handleLike}>
              Like
            </button>
            <span className="likes-count">{post.likes} Likes</span>
          </>
        )}
      </div>

      <div className="comments">
        <h3>Comments</h3>
        {commentsArray !== undefined && commentsArray.length > 0 ? (
          commentsArray.map((comment) => (
            <Comment
              key={comment["id"]}
              id={comment["id"]}
              comment={comment["comment"]}
              author={comment["author"]}
              date={comment["date"]}
            />
          ))
        ) : (
          <p>No comments</p>
        )}
      </div>

      <div className="comment-box">
        <input
          className="newcomment-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
        />
        <textarea
          className="newcomment-content"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="send-comment-button" onClick={handleCreateComment}>
          Send
        </button>
      </div>
      <div>
        <button className="delete_button" onClick={handleDeletePost}>
          Delete Post
        </button>
        <Link to={`/editPost/${id}`}>
          <button className="editpost_button">Edit Post</button>
        </Link>
      </div>
    </div>
  );
}

export default SinglePost;
