import React, { useState, useEffect } from "react";
import {
  findUser,
  getUser,
  updateUser,
  deleteUser,
  removeUser,
} from "../data/repos.js";
import { useNavigate } from "react-router-dom";
import "./Myprofile.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import LockResetIcon from "@mui/icons-material/LockReset";
import BasicModal from "./changePwdmodal.js";
import TicketList from "../components/Userticketdets.js";

function MyProfile(props) {
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);

  const handleMouseOver = () => {
    setShowMessage(true);
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePassword = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    registeredDate: "",
  });

  const currentUser = async (event) => {
    const mydetails = await findUser(props.user.username);
    console.log(props.user.username);
    setUserData({
      ...userData, // Spread the existing state
      username: mydetails.username,
      firstName: mydetails.first_name,
      lastName: mydetails.last_name,
      password: mydetails.password_hash,
      registeredDate: mydetails.registeredDate,
    });
  };

  useEffect(() => {
    // Call the currentUser function when the component mounts or whenever necessary
    currentUser();
  }, []);

  useEffect(() => {
    // Log userData when it changes
    console.log(userData);
  }, [userData]);
  // Update user data field in state
  const handleFieldChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const [newPassword, setNewPassword] = useState("");
  const handlePasswordChange = (newPassword) => {
    console.log(newPassword);
    setNewPassword(newPassword);
    setIsModalOpen(false);
  };
  useEffect(() => {
    handlePasswordChange();
  }, []);
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new user data object
    const newUserdets = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      password: newPassword,
    };

    console.log(newUserdets);
    updateUser(newUserdets);
    navigate("/");
  };

  // Handle user deletion
  const handleDelete = (user) => {
    console.log("username", user.username);

    // Call the deleteUser function to delete the user
    deleteUser(user);
    removeUser();
    navigate("/");
    props.logoutUser();

    localStorage.removeItem("userLoggedIn");
  };

  return (
    <div className="form-myprofile">
      <div className="justform">
        <Box
          sx={{
            width: 350,
            height: 550,
          }}
        >
          <div className="topline">
            <h2 className="label">My Profile</h2>
            <AccountCircleIcon />
          </div>
          <form>
            {/* Input fields for user profile */}
            <div>
              <label className="label">First Name:</label>
              <input
                className="input"
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={(e) => handleFieldChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Last Name:</label>
              <input
                className="input"
                type="text"
                value={userData.lastName}
                onChange={(e) => handleFieldChange("lastName", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Email:</label>
              {/* <input
            className="input"
            type="email"
            value={userData.username}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          /> */}
              <TextField
                value={userData.username}
                className="input"
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </div>
            <div className="password-container">
              <div>
                <label className="label">Password:</label>
                <input
                  className="input password-input" // Apply the password-input class
                  type="text"
                  value={newPassword}
                  disabled
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                />
              </div>
              <Button
                className="password-button"
                variant="outlined"
                startIcon={<LockResetIcon />}
                onClick={handlePassword}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              ></Button>
              {isModalOpen && (
                <BasicModal
                  username={userData.username}
                  open={isModalOpen}
                  onClose={handleCloseModal}
                  onPasswordChange={handlePasswordChange}
                />
              )}
              {/* <DisplayPassword newPassword={newPassword} /> */}
              {showMessage && <p>Change password?</p>}
            </div>

            {/* Display registered date */}

            {/* Buttons for editing and deleting user */}
            <div className="button-left">
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleSubmit}
              >
                EDIT
              </Button>
              {/* //</form> <button className="butprofile">EDIT</button> */}

              {/* <button className="butprofile" onClick={() => handleDelete(userData.email)}>
            DELETE
          </button>{" "} */}

              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(userData)}
              >
                Delete
              </Button>
            </div>
          </form>
        </Box>
      </div>
      <div className="ticket-list">
        <TicketList />
      </div>
    </div>
  );
}

export default MyProfile;
