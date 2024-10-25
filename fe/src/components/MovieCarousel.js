import React from "react";
import { Carousel } from "react-bootstrap";
import "./MovieCarousel.css";

//This is the carousel component used from react-bootstrap to slideshow the cinema locations of our loop cinema.
function MovieCarousel() {
  return (
    <div>
      <Carousel>
        <Carousel.Item style={{ alignContent: "center" }}>
          <img
            class="d-block w-100"
            alt="..."
            src="/images/warrawong.png"
            text="First slide"
          />
          <Carousel.Caption>
            <h3>Chadstone</h3>
            <p>Majestic Place to visit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/images/wetherill.png"
            text="Second slide"
            class="d-block w-100"
            alt="..."
          />
          <Carousel.Caption>
            <h3>Clifton Town</h3>
            <p>One of the world's largest screen.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/images/chatswood.png"
            text="Third slide"
            class="d-block w-100"
            alt="..."
          />
          <Carousel.Caption>
            <h3>Hill Town</h3>
            <p>Screen along the town covered with hills.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default MovieCarousel;
