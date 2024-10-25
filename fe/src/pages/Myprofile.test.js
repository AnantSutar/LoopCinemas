import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieRR from "./MovieRR";
import * as repos from "../data/repos"; // Import the repos module

// Mock useParams to provide the movieTitle
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ movieTitle: "Test Movie" }),
}));

describe("MovieRR Component", () => {
  test("renders the component with user reviews", async () => {
    // Mock the getPosts function
    const getPostsMock = jest.spyOn(repos, "getPosts");
    getPostsMock.mockResolvedValue([
      {
        post_id: 1,
        ratingvalue: 4,
        reviewtext: "Great movie!",
        username: "TestUser",
        movieTitle: "Test Movie",
      },
    ]);

    // Mock the getSingleMovies function
    const getSingleMoviesMock = jest.spyOn(repos, "getSingleMovies");
    getSingleMoviesMock.mockResolvedValue({
      title: "Test Movie",
      // Add other movie data properties here
    });

    // Render the component
    render(<MovieRR />);

    // Wait for data to load
    await screen.findByText("Test Movie");

    // Assert that the movie title is displayed
    expect(screen.getByText("Test Movie")).toBeInTheDocument();

    // Simulate user interactions
    fireEvent.change(screen.getByLabelText("Your Rating:"), {
      target: { value: 5 },
    });
    fireEvent.change(screen.getByLabelText("Write a Review:"), {
      target: { value: "Awesome film!" },
    });
    fireEvent.click(screen.getByText("Submit Review"));

    // Assert that the user review is displayed
    expect(screen.getByText("Awesome film!")).toBeInTheDocument();

    // Simulate editing the review
    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("Your Rating:"), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByLabelText("Write a Review:"), {
      target: { value: "Updated review" },
    });
    fireEvent.click(screen.getByText("Save"));

    // Assert that the updated review is displayed
    expect(screen.getByText("Updated review")).toBeInTheDocument();
  });

  test("handles canceling the edit", async () => {
    // Mock the getPosts function
    const getPostsMock = jest.spyOn(repos, "getPosts");
    getPostsMock.mockResolvedValue([
      {
        post_id: 1,
        ratingvalue: 4,
        reviewtext: "Great movie!",
        username: "TestUser",
        movieTitle: "Test Movie",
      },
    ]);

    // Mock the getSingleMovies function
    const getSingleMoviesMock = jest.spyOn(repos, "getSingleMovies");
    getSingleMoviesMock.mockResolvedValue({
      title: "Test Movie",
      // Add other movie data properties here
    });

    // Render the component
    render(<MovieRR />);

    // Wait for data to load
    await screen.findByText("Test Movie");

    // Simulate editing the review
    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("Your Rating:"), {
      target: { value: 3 },
    });
    fireEvent.change(screen.getByLabelText("Write a Review:"), {
      target: { value: "Updated review" },
    });

    // Simulate canceling the edit
    fireEvent.click(screen.getByText("Cancel"));

    // Assert that the original review is displayed
    expect(screen.getByText("Great movie!")).toBeInTheDocument();
  });
});
