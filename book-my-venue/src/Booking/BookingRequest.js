import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./BookingRequest.module.css"; // Import CSS module // Import CSS file directly here
import { toast } from "react-toastify";

const BookingRequest = () => {
  const userId = sessionStorage["id"];
  const token = sessionStorage["token"];

  // State variables for storing the lists
  const [venueList, setVenueList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [selectedVenueName, setSelectedVenueName] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [userListDisabled, setUserListDisabled] = useState(false);
  const [previousSelectedVenueId, setPreviousSelectedVenueId] = useState(null);
  // Define userDetails state variable
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("userid=", userId);
      try {
        const response = await axios.get(
          `http://localhost:8080/booking/request?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Data:", response.data);

        setVenueList(response.data.venueList);
        setBookingList(response.data.bookingList);
        setUserList(response.data.userList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Function to handle venue selection
  const handleVenueSelect = (venueId, venueName) => {
    setSelectedVenueId(venueId);
    setSelectedVenueName(venueName);
    // Disable user list if the selected venue is different from the previous one
    if (previousSelectedVenueId !== venueId) {
      setUserListDisabled(true);
    }
    setPreviousSelectedVenueId(venueId);
  };

  // Function to handle booking selection
  const handleBookingSelect = (bookingId) => {
    setSelectedBookingId(bookingId);
    // Find user details for the selected booking ID
    const userDetails = userList.find((user) => user.bookingId === bookingId);
    setUserDetails(userDetails);
  };

  // Function to handle accepting a booking
  const handleAcceptBooking = async (bookingId) => {
    try {
      // Make an API call to accept the booking with the given bookingId
      await axios.post(
        `http://localhost:8080/booking/accept/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // You may want to update the state or perform other actions after accepting the booking
      console.log("Booking accepted successfully");
      toast.warn("You Accepted Booking!!");
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  // Function to handle rejecting a booking
  const handleRejectBooking = async (bookingId) => {
    try {
      // Make an API call to reject the booking with the given bookingId
      await axios.post(
        `http://localhost:8080/booking/reject/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // You may want to update the state or perform other actions after rejecting the booking
      console.log("Booking rejected successfully");
      toast.error("You Rejected Booking!!");
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  return (
    <div className="container">
      <div className="venue-list">
        <h2>Venue List</h2>
        <ul className="list-group">
          <div className={styles["venue-list"]}>
            {venueList.map((venue) => (
              <div
                key={venue.id}
                className={`${styles["list-group-item"]} ${
                  venue.id === selectedVenueId && styles["selected-venue"]
                }`}
                onClick={() => handleVenueSelect(venue.id, venue.venueName)}
              >
                <div>Venue ID: {venue.id}</div>
                <div>Address: {venue.address}</div>
                <div>Amount: {venue.amount}</div>
                <div>Venue Name: {venue.venueName}</div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleVenueSelect(venue.id, venue.venueName)}
                >
                  View Bookings for {venue.venueName}
                </button>
              </div>
            ))}
          </div>
        </ul>
      </div>

      {selectedVenueId && (
        <div className="booking-list">
          <h2>
            Booking List for Venue ID: {selectedVenueId} ({selectedVenueName})
          </h2>
          <ul className="list-group">
            {bookingList
              .filter((booking) => booking.venueId === selectedVenueId)
              .map((booking) => (
                <li key={booking.bookingId} className="list-group-item">
                  <div>Booking ID: {booking.bookingId}</div>
                  <div>
                    Booking Date:{" "}
                    {new Date(...booking.bookingDate).toLocaleString()}
                  </div>
                  <div>
                    Check-in Date:{" "}
                    {new Date(...booking.checkinDate).toLocaleString()}
                  </div>
                  <div>
                    Check-out Date:{" "}
                    {new Date(...booking.checkoutDate).toLocaleString()}
                  </div>
                  <div>No. of Guests: {booking.noOfGuests}</div>
                  <div>Payment Status: {booking.paymentStatus}</div>
                  <div>Venue ID: {booking.venueId}</div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBookingSelect(booking.bookingId)}
                  >
                    View User Details
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAcceptBooking(booking.bookingId)}
                  >
                    Accept Booking
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRejectBooking(booking.bookingId)}
                  >
                    Reject Booking
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {selectedBookingId && userDetails && (
        <div className="user-details">
          <h2>
            User Details for Booking ID: {selectedBookingId} -{" "}
            {userDetails.firstName} {userDetails.lastName}
          </h2>
          <ul className="list-group">
            <li className="list-group-item">
              <div>First Name: {userDetails.firstName}</div>
              <div>Last Name: {userDetails.lastName}</div>
              <div>Email: {userDetails.email}</div>
              <div>Contact Number: {userDetails.contactNumber}</div>
              <div>Address: {userDetails.address}</div>
              <div>Booking ID: {userDetails.bookingId}</div>
            </li>
          </ul>
        </div>
      )}

      {/* <div className="user-list">
        <h2>User List</h2>
        <ul className="list-group" disabled={userListDisabled}>
          {userList.map((user) => (
            <li key={user.userId} className="list-group-item">
              <div>First Name: {user.firstName}</div>
              <div>Last Name: {user.lastName}</div>
              <div>Email: {user.email}</div>
              <div>Contact Number: {user.contactNumber}</div>
              <div>Address: {user.address}</div>
              <div>Booking ID: {user.bookingId}</div>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default BookingRequest;
