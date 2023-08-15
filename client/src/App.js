import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import Login from "./login";
import Register from "./register";
import AuthDetails from "./AuthDetails";
import Home from "./home";
import Header from "./header";
import SinglePost from "./SinglePost";
import CreatePost from "./CreatePost";
import { useStateValue } from "./StateProvider";
import EditPost from "./EditPost";
import SearchResults from "./SearchResults";
import ForgotPassword from "./forgotPassword";
import { AuthProvider } from "./auth";
import TagSearchResults from "./TagSearchResults";
function App() {
  const [{ user }] = useStateValue();

  return (
    <AuthProvider>
      <Router>
        <div className="fluid container mt-4 overflow-auto">
          <div className="universe-overlay"> </div>
          <Header user={user} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/AuthDetails" element={<AuthDetails />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />{" "}
            <Route path="/SinglePost/:id" element={<SinglePost />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/editPost/:id" element={<EditPost />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/searchtag/:tag" element={<TagSearchResults />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
