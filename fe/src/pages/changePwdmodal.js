import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { verifyUser } from "../data/repos";
import "./changePwdmodal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  username,
  open,
  onClose,
  onPasswordChange,
}) {
  const [currentPassword, setCurrentPassword] = useState(""); // Store the current password
  const [newPassword, setNewPassword] = useState(""); // Store the new password
  const [passwordMatch, setPasswordMatch] = useState(true); // Store whether passwords match

  const handleChangePassword = async () => {
    console.log(currentPassword);
    console.log(username);
    // Simulate checking if the current password matches a stored password
    const isUser = await verifyUser(username, currentPassword);
    console.log(isUser);
    if (isUser) {
      // Passwords match, you can update the password logic here
      alert("Password changed successfully.");
      // Close the modal
      onClose();
      const np = newPassword;
      onPasswordChange(np);
    } else {
      // Passwords don't match, set passwordMatch to false
      setPasswordMatch(false);
    }
  };
  const handleClose = () => {
    if (onClose) {
      onClose(); // Call the onClose callback when the modal is closed
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}> */}
        <div className="modal-container">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
          <div>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              className="input"
              type="text"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              className="input"
              type="text"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {!passwordMatch && (
            <p className="error-message">Current password does not match.</p>
          )}
          <button className="button" onClick={handleChangePassword}>
            Submit
          </button>
        </div>
        {/* </Box> */}
      </Modal>
    </div>
  );
}
