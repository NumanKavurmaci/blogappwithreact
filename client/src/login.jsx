import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./login.css";

function Login() {
  console.log(auth.currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Redirect to home page
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        // Alert user about error
        alert(error.message);
      });
  };

  return (
    <div className="container-transparent p-4 ">
      <div className="container-transparent p-4 ">
        <div className="login__container">
          <h1 className="text-center">Sign In</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={login}
              type="submit"
              className="btn btn-primary login_signInButton"
            >
              Sign In
            </button>
          </form>
          <Link
            to="/register"
            className="d-block mt-3 text-center text-decoration-none"
          >
            Create an account
          </Link>
        </div>
        <Link
          to="/forgotPassword"
          className="d-block mt-3 text-center text-decoration-none"
        >
          Forgot Password
        </Link>
      </div>
    </div>
  );
}

export default Login;
