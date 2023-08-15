import React, { useEffect, useState } from "react";
import "./AuthDetails.css";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AuthDetails = () => {
  const [authuser, setauthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setauthUser(user);
      } else {
        setauthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="collapse navbar-collapse">
      {authuser ? (
        <div className="form-inline mx-autos">
          <h1 className="btn btn-outline-success my-2 my-sm-0s">
            User: {authuser.email}
          </h1>
          <button
            className="btn btn-primary sign-out-button"
            onClick={userSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="form-inline mx-autos">
          <Link to="/login" className="btn btn-outline-primary my-2 my-sm-0s">
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-outline-secondary my-2 my-sm-0s ml-2"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthDetails;
