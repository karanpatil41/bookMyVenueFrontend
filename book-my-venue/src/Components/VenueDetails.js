import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const VenueDetails = ({ onDataChanged }) => {
  const [venueDetails, setVenueDetails] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetch data using axios
        const response = await axios.get(
          `http://localhost:8080/api/venue/venueDetails?id=${id}`
        );
        setVenueDetails(response.data);
        console.log("Server response: ", response.data);
      } catch (error) {
        console.error("Error fetching venue details: ", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const newData = e.target.value;
    setInputValue(newData);
    onDataChanged(newData);
  };
  if (!venueDetails) {
    return <div>Loading...</div>;
  }

  const {
    username,
    venueName,
    address,
    capacity,
    amount,
    description,
    contactNumber,
    image,
  } = venueDetails;

  return (
    <div>
      <h2>Venue Details</h2>
      <img
        src={`data:image/jpeg;base64,${image}`}
        className="rounded img-thumbnail venue-img"
        alt={id}
        style={{ maxWidth: "100%", maxHeight: "200px" }}
      />
      <p>Username: {username}</p>
      <p>Venue Name: {venueName}</p>
      <p>Address: {address}</p>
      <p>Capacity: {capacity}</p>
      <p>Amount: {amount}</p>
      <p>Description: {description}</p>
      <p>Contact Number: {contactNumber}</p>
      <button type="button" className="btn btn-warning">
        Book Now
      </button>
    </div>
  );
};

export default VenueDetails;
