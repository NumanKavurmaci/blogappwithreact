// comment.js
import React from "react";
import "./comment.css";

function Comment({ id, comment, author, date }) {
  return (
    <div className="Comment_container">
      <div className="Comment_header">
        <span className="Comment_author">{author}</span>
        <span className="Comment_date">{date}</span>
      </div>
      <p className="Comment_text">{comment}</p>
    </div>
  );
}

export default Comment;
