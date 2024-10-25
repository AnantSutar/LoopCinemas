import React, { useState, useEffect } from "react";
import { getTicketInfo, getUser } from "../data/repos"; // Replace with your actual data fetching function
import "./Userticketdets.css";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const loggedInUser = getUser();
  useEffect(() => {
    // Fetch user's ticket information when the component mounts
    const fetchTicketInfo = async () => {
      try {
        console.log(loggedInUser.username);
        const ticketData = await getTicketInfo(loggedInUser.username); // Replace with your actual data fetching function
        setTickets(ticketData);
      } catch (error) {
        console.error("Error loading ticket information:", error);
      }
    };

    fetchTicketInfo();
  }, []);

  return (
    <div className="ticket-list">
      <h2>Your Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.ticketId} className="ticket-item">
            <div>
              <strong>Ticket ID:</strong> {ticket.ticketid}
            </div>
            <div>
              <strong>Username:</strong> {loggedInUser.username}
            </div>
            <div>
              <strong>No. of Tickets:</strong> {ticket.userticket}
            </div>
            <div>
              <strong>Movie </strong> {ticket.movieTitle}
            </div>
            <div>
              <strong>Movie Time </strong> {ticket.movietime}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
