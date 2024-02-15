import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const UserVenue = () => {
  const [userData, setUserData] = useState(null);
  const usernameS = sessionStorage["username"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/venue/getVenueByUsername?username=${usernameS}`
        );
        console.log("Response Data", response.data);
        setUserData(response.data);
        console.log("Response = ", response.status);
      } catch (error) {
        console.log("Server Response: ", error);
      }
    };
    fetchData(); //Unless you don't call the function, no call to server
  }, []); //Empty dependency array to ensure the effect runs only once

  return (
    <div className="container">
      <h1 className="my-4">User Profile</h1>
      {userData && (
        <div>
          {userData.map((venue, index) => (
            <div className="card" key={index}>
              <div className="card-body">
                <div className="card-title">Username : {venue.username}</div>
                <p className="card-text">Email : {venue.username}</p>

                <p className="card-text">Venue Name : {venue.venueName}</p>
                <p className="card-text">
                  Contact Number : {venue.contactNumber}
                </p>
                <p className="card-text">Address : {venue.address}</p>
                <p className="card-text">Capacity : {venue.capacity}</p>
                <p className="card-text">Amount : {venue.amount}</p>
                <img
                  src={`data:image/jpeg;base64,${venue.image}`}
                  className="rounded img-thumbnail venue-img"
                  // alt={id}
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
                <p className="card-text">Description : {venue.description}</p>
                <NavLink
                  to={{
                    pathname: "/api/user/userVenue",
                    // search: `id=${id}`,
                  }}
                >
                  <button type="button" className="btn btn-primary">
                    Edit Venue Details
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserVenue;
