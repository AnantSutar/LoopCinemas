import React, { useState } from "react";
import { verifyUser, getUser, setUser } from "../data/repos"; // Importing functions from data repository
import { useNavigate } from "react-router-dom"; // Importing navigation hook
import "./Login.css"; // Importing styles
const LoginForm = (props) => {
  // Component to handle the login form

  // State to manage user input (username and password)
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // Initializing navigation hook

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  // Function to handle changes in input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(userDetails); // Validation of user input

    if (Object.keys(validationErrors).length === 0) {
      const { username, password } = userDetails;

      // Use the verifyUser function to check the user's credentials
      const isVerified = await verifyUser(username, password); // Verifying user's credentials

      if (isVerified) {
        const loggedInUser = getUser(); // Fetching user data after successful login
        console.log("Logged in as:", loggedInUser);
        setUser(loggedInUser);
        localStorage.setItem("userLoggedIn", username);

        props.loginUser(isVerified); // Calling the loginUser function from props
        setUserDetails({
          username: "",
          password: "",
        });
        setErrors({}); // Clearing any previous errors
        navigate("/"); // Navigating to the home page
        alert("Login Successful!"); // Displaying a success alert
      } else {
        setErrors({ username: "username or password is incorrect" }); // Setting error message for incorrect credentials
      }
    } else {
      setErrors(validationErrors); // Setting validation errors
    }
  };

  // Function to validate user input
  const validate = (values) => {
    let errors = {};
    if (!values.username.trim()) {
      errors.username = "username is required";
      // } else if (!/\S+@\S+\.\S+/.test(values.username)) {
      //   errors.username = "username address is invalid";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <form
      style={{ backgroundColor: "white" }}
      className="form"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="label" htmlFor="username">
          username
        </label>
        <input
          className="input"
          type="username"
          id="username"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button className="button" type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
