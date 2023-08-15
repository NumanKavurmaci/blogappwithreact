import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePost.css";
const { v4: uuidv4 } = require("uuid");

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState(""); // Add tags state
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [characterCount, setCharacterCount] = useState(0);

  const postId = uuidv4();

  useEffect(() => {
    // Update character count when content changes
    setCharacterCount(content.length);

    // Count most used words and set suggested tags
    const words = content.split(" ");
    const unwantedWords = [
      "a",
      "an",
      "and",
      "are",
      "as",
      "at",
      "be",
      "but",
      "by",
      "for",
      "from",
      "our",
      "if",
      "in",
      "into",
      "is",
      "it",
      "no",
      "not",
      "of",
      "on",
      "or",
      "such",
      "that",
      "the",
      "their",
      "then",
      "there",
      "these",
      "they",
      "this",
      "to",
      "was",
      "will",
      "with",
      "we",
      "you",
      "your",
      "i",
      "me",
      "has",
      "have",
      "way",
      "its",
      "enable",
      "enabled",
      "enables",
      "enabling",
      "use",
    ];
    // Filter out unwanted words from words array
    const filteredWords = words.filter(
      (word) => !unwantedWords.includes(word.toLowerCase())
    );

    // Count word frequency and create a wordCountMap
    const wordCountMap = new Map();
    filteredWords.forEach((word) => {
      const lowercaseWord = word.toLowerCase();
      if (wordCountMap.has(lowercaseWord)) {
        wordCountMap.set(lowercaseWord, wordCountMap.get(lowercaseWord) + 1);
      } else {
        wordCountMap.set(lowercaseWord, 1);
      }
    });

    // Sort words by frequency to get suggested tags
    const sortedWords = Array.from(wordCountMap).sort((a, b) => b[1] - a[1]);

    // Get the top 5 suggested tags after filtering and sorting
    const topSuggestedTags = sortedWords.slice(0, 5).map((item) => item[0]);

    // Update suggestedTags state with the calculated topSuggestedTags
    setSuggestedTags(topSuggestedTags);
  }, [content]);
  const handleSuggestedTagClick = (tag) => {
    // Add the clicked tag to the "Tags" input field
    setTags((prevTags) => (prevTags ? `${prevTags}, ${tag}` : tag));

    // Refresh suggested tags by excluding the clicked tag
    const updatedSuggestedTags = suggestedTags.filter((t) => t !== tag);
    setSuggestedTags(updatedSuggestedTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tagsArray = tags.split(",").map((tag) => tag.trim()); // Split and trim tags

      const response = await fetch("/CreatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          title,
          content,
          image,
          author,
          date,
          tags: tagsArray,
        }),
      });

      if (response.status === 201) {
        console.log("Post created:", response.data);
        //redirect user to that singel post page
        window.location.href = "/SinglePost/" + postId;
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="display-4 text-light">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-white">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-white">
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
          <label htmlFor="content" className="form-label text-white">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            rows="8" // Increased the number of rows for a larger textarea
          />
          <small className="form-text text-muted">
            Characters: {characterCount}
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label text-white">
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
          <label htmlFor="date" className="form-label text-white">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label text-white">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="form-control"
          />
          {suggestedTags.length > 0 && (
            <div className="suggested-tags">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  className="btn btn-outline-secondary mr-2 mb-2"
                  onClick={() => handleSuggestedTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
