import React from "react";
import "./Cndmoviedets.css"; // Import the CSS file
import { useParams } from "react-router-dom";
import { getSingleMovies, getUser } from "../data/repos";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const CondensedMovieDetails = (props) => {
  // Get the movieTitle from the route parameters
  const { movieTitle } = useParams();

  // Initialize state variables for movie data and session times
  const [movie, setMovie] = useState({});
  const [sessionTimesArray, setSessionTimesArray] = useState([]);

  // Function to fetch movie data asynchronously
  async function fetchMovieData(title) {
    try {
      // Fetch movie data using the getSingleMovies function
      const movieData = await getSingleMovies(title);

      // Set the movie state with the fetched data
      setMovie(movieData);

      // Extract sessionTimes and split into an array
      const { sessionTimes } = movieData;
      const sessionTimesArray = sessionTimes.split(" ");

      // Set the sessionTimesArray state with the extracted data
      setSessionTimesArray(sessionTimesArray);
    } catch (error) {
      console.error("Error loading movie:", error);
    }
  }

  // Use useEffect to fetch movie data when the movieTitle changes
  useEffect(() => {
    fetchMovieData(movieTitle);
  }, [movieTitle]);

  return (
    <div className="Container-cndmvd">
      {" "}
      {/* Use className instead of styled-components */}
      {/* <img src="/images/cinema.png" alt="cinema icon" /> */}
      <div className="Details">
        {" "}
        {/* Use className instead of styled-components */}
        <h1>{movieTitle}</h1> {/* Display the movie title */}
        <Typography>{movie.desc}</Typography>{" "}
        {/* Display the movie description */}
        <div className="SubTitle">
          {" "}
          {/* Use className instead of styled-components */}
          {movie.genre} {/* Display the movie genre */}
        </div>
      </div>
    </div>
  );
};

export default CondensedMovieDetails;
