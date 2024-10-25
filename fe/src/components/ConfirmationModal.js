import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// ConfirmationModal component takes several props: open, onClose, onConfirm, title, description.
const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  // State to store the index of the edited review, initialized to null.
  const [editedReviewIndex, setEditedReviewIndex] = React.useState(null);

  // Function to handle confirming an edit.
  const handleConfirmEdit = () => {
    // Call the onConfirm callback with the editedReviewIndex.
    onConfirm(editedReviewIndex);
    // Close the modal.
    onClose();
  };

  return (
    // Modal component from MUI with open, onClose, and accessibility attributes.
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box
        sx={{
          // Styling for the modal box.
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
        }}
      >
        {/* Title of the confirmation modal. */}
        <h2 id="confirmation-modal-title">{title}</h2>

        {/* Description of the confirmation modal. */}
        <p id="confirmation-modal-description">{description}</p>

        {/* Confirm button triggers the onConfirm callback. */}
        <Button onClick={onConfirm}>Confirm</Button>

        {/* Cancel button triggers the onClose callback to close the modal. */}
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
