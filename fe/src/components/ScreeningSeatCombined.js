import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card, Typography, Rating, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import "./Ticketmodal.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import "./ScreeningSeatCombined.css"; // Import the CSS file
import {
  getBooking,
  getUser,
  createTicket,
  updateBooking,
} from "../data/repos";

const ScreeningSeatCombined = ({ movie }) => {
  const navigate = useNavigate();
  const [sessionTimesArray, setSessionTimesArray] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState(0);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [finalSeats, setFinalSeats] = useState("");
  const [msid, setmsid] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = getUser();
  const [isZeroSeatsModalOpen, setIsZeroSeatsModalOpen] = useState(false);

  const handleCloseZeroSeatsModal = () => {
    setIsZeroSeatsModalOpen(false);
  };
  console.log(movie);
  async function fetchMovieData() {
    try {
      // Extract sessionTimes and split into an array
      console.log(movie);
      const { sessionTimes } = movie;
      const c = sessionTimes.split(" ");
      setSessionTimesArray(c);
    } catch (error) {
      console.error("Error loading movie:", error);
    }
  }
  const fetchReservedSeats = async (selectedSession) => {
    // Fetch reserved seats for the selected session and update reservedSeats state
    console.log(sessionTimesArray[selectedSession]);
    try {
      const reservedSeatsData = await getBooking(
        movie.movieTitle,
        sessionTimesArray[selectedSession]
      ); // Replace with the actual function to fetch reserved seats
      setReservedSeats(reservedSeatsData.numtickets);
      setmsid(reservedSeatsData.moviesessionid);
      setSelectedSession(sessionTimesArray[selectedSession]);
      if (reservedSeatsData.numtickets === 0) {
        setIsZeroSeatsModalOpen(true);
      }
    } catch (error) {
      console.error("Error loading reserved seats:", error);
    }
  };

  const handleSessionSelection = (selectedSession) => {
    // Access the selected session time and do something with it

    setSelectedSession(selectedSession);
    fetchReservedSeats(selectedSession);
  };

  const handleSessionButtonClick = (index) => {
    console.log(sessionTimesArray[index]);
    setSelectedSession(sessionTimesArray[index]);
  };

  const handleSeatSelection = () => {
    // Pass the selected seats to the parent component or perform seat selection logic
    // You can access the selected seats using the selectedSeats state
    setIsModalOpen(true);
  };

  const handleSeatInputChange = (e) => {
    // Validate and update the selectedSeats state based on user input
    const inputSeats = parseInt(e.target.value, 10);
    if (!isNaN(inputSeats) && inputSeats >= 0 && inputSeats <= reservedSeats) {
      setSelectedSeats(inputSeats);
    } else {
      // Handle invalid input (e.g., show an error message)
      setSelectedSeats(0); // Reset selected seats to 0
    }
  };

  useEffect(() => {
    fetchMovieData();
    // You can also fetch available seats and setAvailableSeats based on your logic
    // Make sure to update availableSeats accordingly
  }, [movie]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // Handle confirm action (e.g., navigate to the homepage)
    // Replace this with the actual navigation logic

    const newTicket = {
      movieTitle: movie.movieTitle,
      username: isLoggedIn.username,
      moviesessionid: msid,
      userticket: selectedSeats,
      movietime: selectedSession,
    };
    console.log(movie.movieTitle);
    updateBooking(newTicket);
    // updateBooking(movie.movieTitle, selectedSession, selectedSeats);
    createTicket(newTicket);
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="Container-screen">
      <h4>SELECT SUITABLE SCREENING</h4>
      <div className="session-buttons">
        {sessionTimesArray.map((sessionTime, index) => (
          <button
            key={index}
            variant="contained"
            color="primary"
            className={`session-button ${
              selectedSession === sessionTime ? "selected" : ""
            }`}
            onClick={() => fetchReservedSeats(index)}
          >
            {sessionTime}
          </button>
        ))}
      </div>

      <div>
        <div></div>
        <div className="text-lable">
          AVAILABLE NUMBER OF SEATS: {reservedSeats}
        </div>
        <div>
          <label className="seats-label">
            CHOOSE UR SEATS:
            <div className="seat-slider-container">
              <input
                className="seats-input"
                type="number"
                value={selectedSeats}
                onChange={handleSeatInputChange}
                min="0"
                max={reservedSeats}
              />
            </div>
          </label>
        </div>
        <div></div>
        <div>
          <button className="select-button" onClick={handleSeatSelection}>
            Select Seats
          </button>
        </div>

        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Paper className="modal-paper">
            <Typography variant="h6">Confirm Your Selection</Typography>
            <Box>
              <Typography variant="body1">
                Session Time: {selectedSession}
              </Typography>
              <Typography variant="body1">
                Number of Tickets: {selectedSeats}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              {selectedSession && selectedSeats !== 0 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              ) : (
                <Button variant="contained" color="primary" disabled>
                  Confirm
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </Box>
            {selectedSession === null && (
              <Typography variant="body1" className="error-message">
                Please select a session time.
              </Typography>
            )}
            {selectedSeats === 0 && (
              <Typography variant="body1" className="error-message">
                Please select the number of tickets.
              </Typography>
            )}
          </Paper>
        </Modal>
        {selectedSession && (
          <div className="selected-session">
            <h4>Selected Session Time:</h4>
            <p>{selectedSession}</p>
          </div>
        )}
        {finalSeats && (
          <div className="selected-seats">
            <h4>Selected Seats:</h4>
            <p>{finalSeats}</p>
          </div>
        )}
      </div>

      {reservedSeats === 0 && (
        <Modal open={isZeroSeatsModalOpen} onClose={handleCloseZeroSeatsModal}>
          <Paper className="modal-paper">
            <Typography variant="h6">No Available Seats</Typography>
            <Box>
              <Typography variant="body1">
                There are no seats available for this session.
              </Typography>
              <Typography variant="body1">
                Please choose another session time.
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseZeroSeatsModal}
              >
                OK
              </Button>
            </Box>
          </Paper>
        </Modal>
      )}
    </div>
  );
};
export default ScreeningSeatCombined;
