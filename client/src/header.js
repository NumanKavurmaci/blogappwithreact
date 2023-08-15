import React, { useState, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";
import HomeIcon from "@mui/icons-material/Home";
import AuthDetails from "./AuthDetails";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Create";
import { auth } from "./firebase";
import { AuthContext } from "./auth";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser ? currentUser.uid : null;
  console.log("userId", userId);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      window.location.href = `/search?query=${searchQuery}`;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Numan's Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                <HomeIcon />
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {userId && (
              <li className="nav-item">
                <Link to="/CreatePost" className="nav-link">
                  <EditIcon />
                  Create Post
                </Link>
              </li>
            )}
          </ul>
          <form className="form-inline mx-auto" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search "
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <AuthDetails />
        </div>
      </div>
    </nav>
  );
}

export default Header;
