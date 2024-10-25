import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Rating, TextField, Button } from "@mui/material";
import {
  getSingleMovies,
  getPosts,
  createPost,
  getUser,
  updatePost,
  deletePost,
} from "../data/repos";
import "./MovieRR.css";
import ConfirmationModal from "./ConfirmationModal";
import PersonIcon from "@mui/icons-material/Person";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DoneIcon from "@mui/icons-material/Done";
import EditNote from "@mui/icons-material/EditNote";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const styles = {
  inputText: {
    color: "white", // Set the text color to white
  },
};

const MovieRR = (props) => {
  const { movieTitle } = useParams();
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [reviewtext, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [isreviewSub, setisreviewSub] = useState(true);
  const [rag, setrag] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEmptyReviewModalOpen, setIsEmptyReviewModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsEmptyReviewModalOpen(false);
  };

  const handleCancelClick = (index) => {
    // Reset the editing state for the item
    setEditingIndex(null);
  };

  const handleConfirmEdit = () => {
    // Save the edited review
    // Close the confirmation modal
    if (editingIndex !== -1) {
      // Save the edited review
      const updatedReviews = [...reviews];
      updatedReviews[editingIndex] = {
        ratingvalue: userRating,
        reviewtext: reviewtext,
        username: username,
        movieTitle: movieTitle,
      };
      setReviews(updatedReviews);
      setConfirmationModalOpen(false);
    }
  };

  console.log(movieTitle);

  const handleEditClick = (index) => {
    // Toggle the editing mode
    setEditingIndex(index);
    setIsEditing(!isEditing);
  };

  const handleSaveClick = (index, post_id) => {
    if (reviewtext === "" || userRating === 0 || reviewtext.length > 600) {
      // Show a modal or message to inform the user
      setIsEmptyReviewModalOpen(true);
    } else {
      const updatedReviews = [...reviews];
      const updatepost = [...posts];
      console.log(updatepost);
      console.log(updatepost[index]);
      updatepost[index] = {
        post_id: post_id,
        ratingvalue: userRating,
        reviewtext: reviewtext,
        username: username,
        movieTitle: movieTitle,
      };
      console.log(updatepost[index]);
      updatePost(updatepost[index]);
      setPosts(updatepost);
      console.log(posts);
      // Clear the editing mode

      setIsEditing(false);
      setEditingIndex(-1);
      window.location.reload();
    }
  };
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const user = getUser();
    const currentPosts = await getPosts(movieTitle);

    console.log(currentPosts[0]);

    if (user) {
      for (let index = 0; index < currentPosts.length; index++) {
        if (user.username === currentPosts[index].username) {
          setrag(true);
        }
      }
      console.log(user.username);
      setUsername(user.username);
    } else {
    }

    setPosts(currentPosts);
    setIsLoading(false);
  }

  console.log(username);

  const handleRatingChange = (event, newValue) => {
    setUserRating(newValue);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewTextChangeWithIndex = (index) => (e) => {
    setReviewText(e.target.value);
    // const updatedReviews = [...reviews];
    // updatedReviews[index].reviewtext = e.target.value;
    // setReviews(updatedReviews);
  };

  const handleReviewSubmit = () => {
    // Save the review to your data store or server
    if (reviewtext === "" || userRating === 0 || reviewtext.length > 600) {
      // Show a modal or message to inform the user
      setIsEmptyReviewModalOpen(true);
    } else {
      // Save the review to your data store or server
      const newReview = {
        ratingvalue: userRating,
        reviewtext: reviewtext,
        username: username,
        movieTitle: movieTitle,
      };
      createPost(newReview);
      setPosts([...posts, newReview]);
      // Clear the review form
      setisreviewSub(false);
      setUserRating(0);
      setReviewText("");
      window.location.reload();
    }
  };

  const handleDeleteClick = (post_id) => {
    console.log(post_id);
    deletePost(post_id);
    window.location.reload();
  };
  console.log(posts);

  return (
    // Review Section
    <div className="review-section">
      {!rag && isreviewSub && username && (
        <div className="review-form">
          {/* User Rating */}
          <Typography variant="h6">Your Rating:</Typography>
          <Rating
            name="user-rating"
            value={userRating}
            onChange={handleRatingChange}
          />

          {/* Review Form */}
          <Typography variant="h6">Write a Review:</Typography>
          <div className="textfield-color">
            <TextField
              className="input-text"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={reviewtext}
              onChange={handleReviewTextChange}
              InputProps={{
                classes: {
                  input: styles.inputText, // Apply the custom text color
                },
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </Button>
        </div>
      )}

      <div className="user-reviews">
        <Typography variant="h6">User Reviews:</Typography>
        {reviews.concat(posts).map((item, index) => (
          <div key={index} className="user-review">
            <Typography variant="subtitle2" className="username">
              <PersonIcon />
              {item.username}
            </Typography>

            <Typography variant="body2" className="review-text">
              {editingIndex === index ? (
                <div>
                  <Rating
                    name="user-rating"
                    value={userRating}
                    onChange={handleRatingChange}
                  />
                  <TextField
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    value={reviewtext}
                    onChange={handleReviewTextChangeWithIndex(index)}
                  />
                </div>
              ) : (
                <div>
                  <Rating
                    className="ratingsreviews"
                    name={`review-rating-${index}`}
                    value={item.ratingvalue} // Assuming both reviews and posts have a "rating" property
                    readOnly
                  />
                  {item.reviewtext}
                </div>
              )}
            </Typography>
            {item.username === username ? (
              editingIndex === index ? (
                <>
                  <Button onClick={(e) => handleSaveClick(index, item.post_id)}>
                    Save
                  </Button>
                  <Button onClick={() => handleCancelClick(index)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleEditClick(index)}>Edit</Button>
                  <Button onClick={() => handleDeleteClick(item.post_id)}>
                    Delete
                  </Button>
                </>
              )
            ) : (
              <Button disabled>Edit</Button>
            )}
          </div>
        ))}
      </div>
      <Modal open={isEmptyReviewModalOpen} onClose={handleModalClose}>
        <Box className="modal-paper">
          <Typography variant="h6">Review or Rating is Empty</Typography>
          <Typography variant="body1">
            Please enter a review and a rating before submitting.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalClose}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default MovieRR;
