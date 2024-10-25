import "./App.css";
import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/SignUp";
import MovieList from "./components/NewMovieCard";
import NewMovieCard from "./components/NewMovieCard";
import MyProfile from "./pages/Myprofile";
import MovieDetailPage from "./components/MovieDetailPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getUser, removeUser } from "./data/repos";
import Booking from "./pages/booking";
import "@mui/material/styles";

function App() {
  const [user, setUser] = useState(getUser());

  const [username, setUsername] = useState(getUser());

  console.log(user);
  const loginUser = (user) => {
    setUser(user);
  };

  console.log(username);

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };
  return (
    <Router>
      <Header user={user} logoutUser={logoutUser} />
      <div className="App" style={{ backgroundColor: "black" }}>
        <Routes>
          <Route path="/" element={<NewMovieCard username={user} />} />
          <Route path="/login" element={<LoginForm loginUser={loginUser} />} />
          <Route
            path="/signup"
            element={<SignUpForm loginUser={loginUser} />}
          />
          <Route path="/book/:movieTitle" element={<Booking />} />
          <Route
            path="/profile"
            element={<MyProfile user={user} logoutUser={logoutUser} />}
          />
          <Route path="/a" element={<MovieList />} />
          <Route
            path="/moviedetailpage/:movieTitle"
            element={<MovieDetailPage />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
