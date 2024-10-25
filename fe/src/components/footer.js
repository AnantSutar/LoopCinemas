import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Typography from "@mui/material/Typography";
import "./footer.css";

function Footer() {
  const [openAbout, setOpenAbout] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const handleOpenAbout = () => setOpenAbout(true);
  const handleCloseAbout = () => setOpenAbout(false);
  const handleOpenContact = () => setOpenContact(true);
  const handleCloseContact = () => setOpenContact(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <footer
      className="footer"
      style={{
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#191919",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <Button
          variant="contained"
          style={{
            marginRight: "10px",
            backgroundColor: "#2E2E2E",
            color: "#FFF",
          }}
          onClick={handleOpenAbout}
        >
          About
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#2E2E2E", color: "#FFF" }}
          onClick={handleOpenContact}
        >
          Contact Us
        </Button>
      </div>

      <Modal
        open={openAbout}
        onClose={handleCloseAbout}
        aria-labelledby="about-title"
        aria-describedby="about-description"
      >
        <Box sx={modalStyle}>
          <Typography id="about-title" variant="h6" component="h2">
            About Loop Cinemas RMIT
          </Typography>
          <Typography id="about-description" variant="body2">
            Background of Loop Cinemas RMIT Established in 1985, Loop Cinemas
            RMIT is more than just a movie theatre – it's a testament to a
            community's love for films. Nestled in the heart of Cinematic City,
            it was built on the passion of film enthusiasts who wanted to create
            a haven for true lovers of cinema. Over the years, Loop Cinemas has
            gone through numerous transformations, evolving with the latest
            technology, but never losing its heart and soul. Why Choose Loop
            Cinemas RMIT? When you step into Loop Cinemas RMIT, you're not just
            watching a movie; you're experiencing a legacy. Our state-of-the-art
            projection and sound systems ensure you immerse yourself in every
            frame, every note. Our seating is designed for maximum comfort,
            ensuring every view is the best in the house. Beyond the technology,
            it's our commitment to curating a diverse range of films, from
            blockbusters to indie gems, that sets us apart.
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openContact}
        onClose={handleCloseContact}
        aria-labelledby="contact-title"
        aria-describedby="contact-description"
      >
        <Box sx={modalStyle}>
          <Typography id="contact-title" variant="h6" component="h2">
            Contact Loop Cinemas RMIT
          </Typography>
          <Typography id="contact-description" variant="body2">
            Contact Loop Cinemas RMIT Address: Loop Cinemas RMIT 123 Movie Lane
            Cinematic City, CC 12345 <br></br>Phone: (123) 456-7890 <br></br>
            Email: info@loopcinemasrmit.com <br></br>Opening Hours: Monday to
            Friday: 10:00 AM - 11:00 PM Saturday & Sunday: 9:00 AM - 12:00 AM{" "}
            <br></br>
            Customer <br></br>Support: For general inquiries, please email us at
            support@loopcinemasrmit.com or use the contact form on our website.
          </Typography>
        </Box>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Typography
          variant="body1"
          style={{ color: "#FFF", marginBottom: "15px" }}
        >
          Social Media: Follow us on Facebook, Twitter, and Instagram for the
          latest updates, special events, and promotions.
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            color="inherit"
            aria-label="Facebook"
            href="https://www.facebook.com/YourPage"
            size="large"
            style={{ margin: "0 10px", transition: "transform 0.3s" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FacebookIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Twitter"
            href="https://twitter.com/YourProfile"
            size="large"
            style={{ margin: "0 10px", transition: "transform 0.3s" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <TwitterIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Instagram"
            href="https://www.instagram.com/YourProfile"
            size="large"
            style={{ margin: "0 10px", transition: "transform 0.3s" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <InstagramIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>

      <p className="footer-text">
        Ⓒ Copyright 2023 Loop Cinemas RMIT. All Right Reserved.
        <br />
        Loop Cinemas acknowledges Aboriginal and Torres Strait Islander people
        as the Traditional Custodians of the land and pays respect to their
        Elders past, present and emerging.
      </p>
    </footer>
  );
}

export default Footer;
