import React, { useState, useEffect } from "react";
import MovieCarousel from "./MovieCarousel";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Container,
} from "@mui/material";

import { getMovies } from "../data/repos";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  console.log(movie.movieImage);
  const handleCardClick = () => {
    navigate(`/moviedetailpage/${movie.movieTitle}`, { state: { movie } });
  };

  return (
    <div onClick={handleCardClick}>
      <Card>
        <CardMedia
          component="img"
          alt={movie.title}
          height="340"
          // src={toString(movie.movieImage)}
          image={movie.movieImage}
          title={movie.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {movie.movieTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {movie.genre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            Sessions: {movie.sessionTimes}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

// Component for displaying a list of movies
const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const currentMovies = await getMovies();
        setMovies(currentMovies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading movies:", error);
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Display movie carousel */}
      <MovieCarousel style={{ backgroundColor: "black" }} />
      {/* Display movie list */}
      <div
        style={{ backgroundColor: "black", padding: "25px 20px 120px 20px" }}
      >
        <Container style={{ backgroundColor: "black" }}>
          <Typography
            variant="h4"
            align="center"
            style={{ color: "white", marginBottom: "20px" }}
          >
            Upcoming Movies
          </Typography>
          <Grid container spacing={2}>
            {/* Map through movies to display each MovieCard */}
            {movies.map((movie, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} username={props.username} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default MovieList;
