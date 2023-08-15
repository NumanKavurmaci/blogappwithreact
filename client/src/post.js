import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS

function Post({ id, title, content, image, author, date }) {
  return (
    <div className="card mb-4">
      <img src={image} alt="Header" className="card-img-top" />
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`/SinglePost/${id}`} className="text-decoration-none">
            {" "}
            {/* Add the text-decoration-none class */}
            {title}
          </Link>
        </h2>
        <div className="d-flex justify-content-between">
          <div>
            <span className="post-author">{author}</span>
          </div>
          <div>
            <span className="post-date">{date}</span>
          </div>
        </div>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
}

export default Post;
