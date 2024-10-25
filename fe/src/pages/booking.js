import React, { useState, useEffect } from "react";
import {
  findUser,
  getUser,
  updateUser,
  deleteUser,
  getSingleMovies,
  getBooking,
} from "../data/repos.js";
import { useNavigate, useParams } from "react-router-dom";
import "./booking.css";
import ScreeningSeatCombined from "../components/ScreeningSeatCombined.js";
import { Link } from "react-router-dom";
import CondensedMovieDetails from "../components/Cndmoviedets.js";
import Screening_details from "../components/Screeningdets.js";

function Booking() {
  const { movieTitle } = useParams();
  const [movie, setMovie] = useState({});
  const [sessionTimesArray, setSessionTimesArray] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [finalSeats, setFinalSeats] = useState("");
  const isLoggedIn = getUser();

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
  useEffect(() => {
    fetchMovieData(movieTitle);
  }, [movieTitle]);

  const handleSelectedSeats = (selectedSeats) => {
    // Do something with the selected seats, e.g., store them in state
    let str = selectedSeats.join();
    setFinalSeats(str);
  };
  return (
    <div className="booking-main">
      <div className="horizontal-container">
        <div className="cmd">
          <CondensedMovieDetails />
        </div>
        <div className="ssc">
          <ScreeningSeatCombined movie={movie} />
        </div>
      </div>
      <div className="movie-image">
        <img src={movie.movieImage} alt={movie.img} className="movie-image" />
      </div>
      {/* Display selected session time */}
    </div>
  );
}

export default Booking;
