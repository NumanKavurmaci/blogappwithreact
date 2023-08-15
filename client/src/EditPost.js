import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditPost.css"; // Update this with your actual CSS file path
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    // Fetch post details using the id parameter and set the state
    fetch(`/SinglePost/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.post.title);
        setContent(data.post.content);
        setAuthor(data.post.author);
        setImage(data.post.image);
        setTags(data.post.tags);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  }, [id]);

  const handleEditPost = async (e) => {
    e.preventDefault();

    // Send edited post data to the server
    try {
      const response = await fetch(`/EditPost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, image, author, tags }),
      });

      if (response.ok) {
        // Handle success
        console.log("Post edited successfully");
        // Redirect to post
        window.location.href = `/SinglePost/${id}`;
      } else {
        // Handle error
        console.error("Error editing post");
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="display-4 text-light">Edit Post</h2>
      <form onSubmit={handleEditPost}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            rows="6" // Increase the number of rows for a larger textarea
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
