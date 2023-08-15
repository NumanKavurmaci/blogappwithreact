import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function TagSearchResults() {
  const { tag } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log("tag:", tag);
    fetch(`/searchtag/${tag}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tag search results:", error);
        setLoading(false);
      });
  }, [tag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-auto container-fluid mt-4">
      <div className="tag-search-results">
        <h2 className="mb-4 text-white shadow-lg p-3 bg-dark rounded">
          Posts tagged with '{tag}'
        </h2>
        <div className="row">
          {searchResults.length === 0 ? (
            <p>No posts found with this tag.</p>
          ) : (
            searchResults.map((post) => (
              <div className="col-md-4 mb-4" key={post.id}>
                <div className="card">
                  <Link to={`/singlePost/${post.id}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="card-img-top"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">
                      {post.content.slice(0, 300) + "..."}
                    </p>
                    <p className="card-text">Author: {post.author}</p>
                    <p className="card-text">Date: {post.date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TagSearchResults;
