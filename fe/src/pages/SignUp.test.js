// Importing necessary modules
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SignUpForm from "./SignUp";
import { findUser, createUser } from "../data/repos";

// Mocking the navigate function from 'react-router-dom' for testing
const mockNavigate = jest.fn();

// Overriding methods from the actual 'react-router-dom' library
// Specifically, we're overriding the 'useNavigate' method to use our mock function
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Keeping the original functionalities of 'react-router-dom'
  useNavigate: () => mockNavigate, // But replacing 'useNavigate' with our mock function
}));

// Mocking data retrieval and modification methods from our 'repos' data layer
jest.mock("../data/repos", () => ({
  findUser: jest.fn(), // Mocking 'findUser' method for testing
  createUser: jest.fn(), // Mocking 'createUser' method for testing
  setUser: jest.fn(), // Adding mocked 'setUser' function (if used in SignUpForm)
}));

// Test case for checking the user sign-up functionality
test("SignUpForm allows the user to sign up successfully", async () => {
  // Setting up mock responses for this particular test
  findUser.mockResolvedValueOnce(false); // Simulating that the user is not already registered
  createUser.mockResolvedValueOnce(true); // Simulating successful user creation

  const mockLoginUser = jest.fn();

  // Rendering the SignUpForm component with mocked props for testing
  render(<SignUpForm loginUser={mockLoginUser} />);

  // Simulating user input for each of the form fields
  fireEvent.change(screen.getByLabelText("First Name"), {
    target: { value: "AA" },
  });
  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: "BB" },
  });
  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "AABB@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "AABBCCDD123$" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "AABBCCDD123$" },
  });

  // Simulating a click on the sign-up button
  fireEvent.click(screen.getByText(/sign up/i));

  // After the sign-up button is clicked, we wait for all asynchronous actions and ensure
  // that the mock methods were called with the correct arguments
  await waitFor(() => {
    expect(findUser).toHaveBeenCalledWith("AABB@example.com");
    expect(createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "AA",
        lastName: "BB",
        username: "AABB@example.com",
        password: "AABBCCDD123$",
      })
    );
    expect(mockLoginUser).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

// Test case for checking the behavior when a user tries to sign up with an existing username
test("SignUpForm shows error message when username already exists", async () => {
  // Simulating that the user is already registered
  findUser.mockResolvedValueOnce(true);

  // Rendering the SignUpForm component for testing
  render(<SignUpForm />);

  // Simulating user input for each of the form fields
  fireEvent.change(screen.getByLabelText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "john@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "securePassw0rd" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "securePassw0rd" },
  });

  // Simulating a click on the sign-up button
  fireEvent.click(screen.getByText(/sign up/i));

  // Ensuring that the appropriate error message is displayed when a user tries to sign up with an existing username
  await waitFor(() => {
    expect(
      screen.getByText(/email address already exists/i)
    ).toBeInTheDocument();
  });
});
