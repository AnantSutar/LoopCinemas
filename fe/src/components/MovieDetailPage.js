import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Typography, Rating, TextField, Button } from "@mui/material";
import { getSingleMovies, getPosts, createPost, getUser } from "../data/repos";
import "./MovieDetailPage.css";
import MovieRR from "./MovieRR";

const MovieDetailPage = (props) => {
  // Get the movieTitle from the route parameters
  const { movieTitle } = useParams();

  // Initialize state variables
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Check if the user is logged in
  const isLoggedIn = getUser();

  // State to store session times
  const [sessionTimesArray, setSessionTimesArray] = useState([]);

  // Function to fetch movie data asynchronously
  async function fetchMovieData(title) {
    try {
      const movieData = await getSingleMovies(title);
      setMovie(movieData);

      // Extract sessionTimes and split into an array
      const { sessionTimes } = movieData;
      const sessionTimesArray = sessionTimes.split(" ");
      setSessionTimesArray(sessionTimesArray);
    } catch (error) {
      console.error("Error loading movie:", error);
    }
  }

  // Fetch movie data when the component mounts or when movieTitle changes
  useEffect(() => {
    fetchMovieData(movieTitle);
  }, [movieTitle]);

  const navigate = useNavigate();

  // Function to handle booking
  const handleBooking = () => {
    navigate(`/book/${movie.movieTitle}`, { state: { movie } });
  };

  // Function to handle rating changes
  const handleRatingChange = (event, newValue) => {
    setUserRating(newValue);
  };

  // Function to handle review text changes
  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  // Function to handle review submission
  const handleReviewSubmit = () => {
    // Save the review to your data store or server
    const newReview = {
      rating: userRating,
      text: reviewText,
    };
    setReviews([...reviews, newReview]);
    // Clear the review form
    setUserRating(0);
    setReviewText("");
  };

  return (
    <div className="movie-detail-card">
      <div className="banner-container">
        <div className="movie-image">
          <img src={movie.movieImage} alt={movie.img} className="movie-image" />
        </div>
        <div className="movie-details">
          <Typography variant="h4">{movie.movieTitle}</Typography>
          <Typography variant="body1" className="genre">
            {movie.genre}
          </Typography>
          <Typography>{movie.desc}</Typography>
        </div>
      </div>
      {isLoggedIn ? (
        <Button className="book-tickets" onClick={handleBooking}>
          BOOK
        </Button>
      ) : (
        <p>Login to book tickets</p>
      )}
      <MovieRR movie={movie} />
    </div>
  );
};

export default MovieDetailPage;
