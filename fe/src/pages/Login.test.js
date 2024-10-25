// Import necessary libraries and components
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import LoginForm from "./Login";
import { verifyUser } from "../data/repos";

// Mock the react-router-dom module to control the behavior of the useNavigate hook.
jest.mock("react-router-dom", () => ({
  // Include all actual exports (spread operation) from "react-router-dom"
  ...jest.requireActual("react-router-dom"),
  // Mock useNavigate hook to just return a mock function
  useNavigate: () => jest.fn(),
}));

// Mock data/repo functions. This ensures that real API calls aren't made during testing.
jest.mock("../data/repos", () => ({
  verifyUser: jest.fn(), // Mock verifyUser function
  getUser: jest.fn(() => ({ name: "testuser" })), // Mock getUser to return a static user object
  setUser: jest.fn(), // Mock setUser function if it exists in the data/repos module
}));

// Group of tests specifically for LoginForm component
describe("LoginForm Component", () => {
  // This block is executed before each test
  beforeEach(() => {
    // Mock the global window.alert function to prevent alert pop-ups during testing
    window.alert = jest.fn();
  });

  // Test to check if LoginForm renders correctly
  test("renders LoginForm component", () => {
    render(<LoginForm loginUser={jest.fn()} />);
    // Expect username and password fields to be in the document
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  // Test to check if user input is correctly captured by the form fields
  test("allows the user to type into the input fields", () => {
    render(<LoginForm loginUser={jest.fn()} />);
    // Simulate user typing into the input fields
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpass" },
    });
    // Expect the input values to reflect the user's input
    expect(screen.getByLabelText(/username/i).value).toBe("testuser");
    expect(screen.getByLabelText(/password/i).value).toBe("testpass");
  });

  // Test to check if validation errors show up for empty inputs
  test("shows validation error messages when inputs are empty and submitted", async () => {
    render(<LoginForm loginUser={jest.fn()} />);
    await act(async () => {
      // Simulate form submission
      fireEvent.submit(screen.getByText(/log in/i));
    });
    // Expect error messages to appear on screen
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });
});

// Test for verifying the login behavior with valid inputs
test("logs the user in when the form is submitted with valid inputs", async () => {
  // Mock a successful verification response
  verifyUser.mockResolvedValueOnce(true);

  render(<LoginForm loginUser={jest.fn()} />);
  await act(async () => {
    // Simulate user input and form submission
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpass" },
    });
    fireEvent.submit(screen.getByText(/log in/i));
  });

  // Expect no error messages since the inputs are valid
  expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
});
