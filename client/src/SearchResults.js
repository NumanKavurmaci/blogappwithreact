// SearchResults.js
import React, { useState, useEffect } from "react";
import Post from "./post";

import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from your server
    fetch(`/search?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [query]); // Include query as a dependency
  console.log(posts);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-6 mb-4" key={post.id}>
                <Post
                  id={post.id}
                  title={post.title}
                  content={post.content
                    .split(" ")
                    .slice(0, 100)
                    .join(" ")
                    .concat("...")}
                  image={post.image}
                  author={post.author}
                  date={post.date}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Name: Numan Kavurmacı</p>
            <p>Email: numan.kavurmaci.samsun@gmail.com</p>
            <a href="https://www.numankavurmaci.github.io/">Personal website</a>
            <a href="https://www.linkedin.com/in/numan-kavurmac%C4%B1-227a35247/">
              Linkedin
            </a>
            <a href="https://github.com/NumanKavurmaci">Github</a>
            <p>Address: Turkey</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
