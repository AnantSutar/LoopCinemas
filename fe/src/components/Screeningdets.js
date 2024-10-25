import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card, Typography, Rating, TextField, Button } from "@mui/material";
import "./Screeningdets.css"; // Import the CSS file

function Screening_details({ movie, onSessionSelect }) {
  console.log(movie);

  const [sessionTimesArray, setSessionTimesArray] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  async function fetchMovieData() {
    try {
      // Extract sessionTimes and split into an array
      const { sessionTimes } = movie;
      const c = sessionTimes.split(" ");
      setSessionTimesArray(c);
    } catch (error) {
      console.error("Error loading movie:", error);
    }
  }
  useEffect(() => {
    fetchMovieData();
  }, [movie]);
  console.log(sessionTimesArray);
  const handleSessionButtonClick = (index) => {
    console.log(sessionTimesArray[index]);
    setSelectedSession(sessionTimesArray[index]);
    onSessionSelect(sessionTimesArray[index]);
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
            onClick={() => handleSessionButtonClick(index)}
          >
            {sessionTime}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Screening_details;
