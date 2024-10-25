import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUser, createUser, setUser } from "../data/repos";

import "./SignUp.css";

const SignUpForm = (props) => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(userDetails);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Check if the email already exists in the database
        const usernameExists = await findUser(userDetails.username);

        if (usernameExists) {
          setErrors({ username: "Email address already exists." });
        } else {
          await createUser(userDetails);
          props.loginUser(userDetails);
          setUser(userDetails);
          localStorage.setItem("userLoggedIn", userDetails.username);
          navigate("/");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setErrors({ message: "An error occurred. Please try again later." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!values.username.trim()) {
      errors.username = "Email is required";
      // } else if (!/\S+@\S+\.\S+/.test(values.username)) {
      //   errors.username = "Email address is invalid";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {errors.message && <p>{errors.message}</p>}
      <div>
        <label className="label" htmlFor="firstName" color="black">
          First Name
        </label>
        <input
          className="input"
          type="text"
          id="firstName"
          name="firstName"
          value={userDetails.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="label" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="input"
          type="text"
          id="lastName"
          name="lastName"
          value={userDetails.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          className="input"
          type="email"
          id="username"
          name="username"
          placeholder="Username should be email i.e. a@a.com"
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
        <label className="label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={userDetails.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <button className="button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
