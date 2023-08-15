import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import "./forgotPassword.css";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div className="container-transparent p-4 ">
      <div className="container-transparent p-4 ">
        <div className="login__container">
          <h1 className="text-center">Forgot Password</h1>
          {isEmailSent ? (
            <p className="text-center">
              Password reset email sent. Check your inbox.
            </p>
          ) : (
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
                  required
                />
              </div>
              <button
                onClick={handleResetPassword}
                type="submit"
                className="btn btn-primary login_signInButton"
              >
                Reset Password
              </button>
            </form>
          )}
          <Link
            to="/login"
            className="d-block mt-3 text-center text-decoration-none"
          >
            Back to Login
          </Link>
          <Link
            to="/register"
            className="d-block mt-3 text-center text-decoration-none"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
