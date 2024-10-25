import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Typography,
} from "@mui/material";

// MovieDialog component takes props: movie, isOpen, onClose.
const MovieDialog = ({ movie, isOpen, onClose }) => {
  // State for user's rating and review.
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");

  // Function to handle rating changes.
  const handleRatingChange = (event, newValue) => {
    setUserRating(newValue);
  };

  // Function to handle review text changes.
  const handleReviewChange = (event) => {
    setUserReview(event.target.value);
  };

  // Function to handle form submission.
  const handleSubmit = () => {
    onClose(); // Close the dialog when submitted.
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{movie.title}</DialogTitle> {/* Display movie title */}
      <DialogContent>
        <Typography gutterBottom variant="h6" component="div">
          Rate the movie:
        </Typography>
        {/* Rating component to select a rating */}
        <Rating
          name="movie-rating"
          value={userRating}
          onChange={handleRatingChange}
        />

        <Typography gutterBottom variant="h6" component="div">
          Post a review:
        </Typography>
        {/* Text field for user to enter a review */}
        <TextField
          fullWidth
          multiline
          rows={4}
          value={userReview}
          onChange={handleReviewChange}
        />
      </DialogContent>
      <DialogActions>
        {/* Close button to cancel the dialog */}
        <Button onClick={onClose}>Close</Button>
        {/* Submit button to submit the rating and review */}
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieDialog;
