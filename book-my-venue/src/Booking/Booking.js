import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Booking.css";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";

const Booking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const venueid = queryParams.get("venueId");
  const userid = sessionStorage["id"];
  const token = sessionStorage["token"];
  const username = sessionStorage["username"];

  const [bookingData, setBookingData] = useState({
    checkinDate: null,
    checkoutDate: null,
    noOfGuests: 0,
    user: userid,
    venue: venueid,
    status: "Payment pending",
    createdBy: username,
    amount: null,
  });
  const [venueUserData, setVenueUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/venue/findVenueAndUserData/${bookingData.venue}`
        );
        console.log("Response", response.data);
        setVenueUserData(response.data);
        setBookingData({ ...bookingData, amount: response.data[3] });
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);
  const handleChangeDate = (date, name) => {
    setBookingData({ ...bookingData, [name]: date });
  };

  const handleIncrementGuests = () => {
    setBookingData({ ...bookingData, noOfGuests: bookingData.noOfGuests + 50 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Booking Data:", bookingData);
    // Format checkinDate and checkoutDate to dd/MM/yyyy format
    const formattedBookingData = {
      ...bookingData,
      checkinDate: bookingData.checkinDate
        ? format(bookingData.checkinDate, "yyyy-MM-dd'T'HH:mm:ss.SSS")
        : null,
      checkoutDate: bookingData.checkoutDate
        ? format(bookingData.checkoutDate, "yyyy-MM-dd'T'HH:mm:ss.SSS")
        : null,
    };

    try {
      console.log("FBooking Data:", formattedBookingData);
      // Send formattedBookingData to the server
      const response = await axios.post(
        `http://localhost:8080/booking/book`,
        formattedBookingData
      );
      console.log("Response Data: ", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="custom-container">
      <h2>Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="checkinDate" className="form-label">
            Check-in Date :
          </label>
          <DatePicker
            selected={bookingData.checkinDate}
            onChange={(date) => handleChangeDate(date, "checkinDate")}
            minDate={new Date()}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="checkoutDate" className="form-label">
            Checkout Date :
          </label>
          <DatePicker
            selected={bookingData.checkoutDate}
            onChange={(date) => handleChangeDate(date, "checkoutDate")}
            minDate={bookingData.checkinDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="noOfGuests" className="form-label">
            Number of Guests
          </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              id="noOfGuests"
              name="noOfGuests"
              value={bookingData.noOfGuests}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  noOfGuests: parseInt(e.target.value),
                })
              }
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleIncrementGuests}
            >
              +50
            </button>
          </div>
        </div>
        {venueUserData && venueUserData.length > 0 && (
          <div className="booking-details">
            <p>
              <strong>Venue Name:</strong> {venueUserData[1]}
            </p>
            <p>
              <strong>Address:</strong> {venueUserData[2]}
            </p>
            <p>
              <strong>Amount in ₹ :</strong>{" "}
              <span className="amount">{venueUserData[3]}</span>
            </p>
            <p className="manager-details">
              <strong>Venue Manager Name :</strong> {venueUserData[5]}{" "}
              {venueUserData[6]}
            </p>
            <p className="manager-details">
              <strong>Venue Manager No :</strong> {venueUserData[7]}
            </p>
            <p className="manager-id">
              <strong>Venue Manager id :</strong> {venueUserData[4]}
            </p>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Book
        </button>
      </form>
    </div>
  );
};

export default Booking;
