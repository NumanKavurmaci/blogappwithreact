import React, { useState, useEffect, useContext } from "react";
import Post from "./post";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContext } from "./auth";

function Home() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const handleTagClick = (tag) => {
    window.location.href = `/searchtag/${tag}`;
  };

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser ? currentUser.uid : null;
  useEffect(() => {
    // Fetch data from your server
    fetch("/home")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetch("/tags")
      .then((response) => response.json())
      .then((data) => {
        const fetchedData = data[0];
        setTags(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);
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
                  content={post.content.slice(0, 300) + "..."}
                  image={post.image}
                  author={post.author}
                  date={post.date}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="contact-info card">
            <div className="card-body">
              <h2>Contact Information</h2>
              <p>Numan Kavurmacı</p>
              <p>numan.kavurmaci.samsun@gmail.com</p>
              <a href="https://www.numankavurmaci.github.io/">
                Personal website
              </a>
              <a href="https://www.linkedin.com/in/numan-kavurmac%C4%B1-227a35247/">
                Linkedin
              </a>
              <a href="https://github.com/NumanKavurmaci">Github</a>
              <p>Address: Turkey</p>
            </div>
          </div>
          <div className="tag-list card mt-4">
            <div className="card-body">
              <h2>Tags</h2>
              {tags.map((tag, index) => (
                <button
                  className="btn btn-primary btn-sm mr-2 mb-2"
                  key={index}
                  onClick={() => handleTagClick(tag.name)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

/*
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
                  content={post.content.slice(0, 300) + "..."}
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
            <p>Numan Kavurmacı</p>
            <p>numan.kavurmaci.samsun@gmail.com</p>
            <a href="https://www.numankavurmaci.github.io/">Personal website</a>
            <a href="https://www.linkedin.com/in/numan-kavurmac%C4%B1-227a35247/">
              Linkedin
            </a>
            <a href="https://github.com/NumanKavurmaci">Github</a>
            <p>Address: Turkey</p>
          </div>
          <div className="tag-list">
            <h2>Tags</h2>
            {tags.map((tag, index) => (
              <button
                className="btn btn-primary btn-sm mr-2 mb-2"
                key={index}
                onClick={() => handleTagClick(tag.name)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
*/
