import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person"; // Replace with your preferred icon for My Profile
import LogoutIcon from "@mui/icons-material/Logout"; // Replace with your preferred icon for Logout

// The Header component renders the header section of the web application.
// It displays different content based on whether a user is logged in or not.

function Header(props) {
  const [isUserDeleted, setIsUserDeleted] = useState(false);

  useEffect(() => {
    // Check if the user is deleted and update isUserDeleted state
    if (props.user === null && isUserDeleted) {
      setIsUserDeleted(true);
    } else {
      setIsUserDeleted(false);
    }
  }, [props.user, isUserDeleted]);

  return (
    <div>
      <div className="Header-Main">
        <div className="nameLogo">
          <Link to="/" className="logo">
            LOOP CINEMAS
          </Link>
        </div>
        <div className="navbar">
          {props.user !== null && !isUserDeleted ? (
            <div className="nav-item">
              <span className="nav-link text-light">
                Welcome, {props.user.username}
              </span>
            </div>
          ) : (
            <div className="nav-item regSign">
              <Link to="/signup">
                <button className="join">
                  {" "}
                  <PersonAddIcon /> Join{" "}
                </button>
              </Link>
              <Link to="/login">
                <button className="sign">
                  {" "}
                  <LoginIcon /> Login{" "}
                </button>
              </Link>
            </div>
          )}
          {props.user !== null && !isUserDeleted && (
            <div className="nav-item">
              <Link className="nav-link" to="/profile">
                <button variant="contained" color="primary">
                  <PersonIcon />
                  My Profile
                </button>
              </Link>
            </div>
          )}
          {props.user !== null && !isUserDeleted && (
            <div className="nav-item">
              <Link className="nav-link" to="/" onClick={props.logoutUser}>
                <button variant="contained" color="secondary">
                  <LogoutIcon />
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
