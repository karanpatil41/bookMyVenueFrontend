import axios from "axios";
import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const username = sessionStorage["username"];

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await axios.get(
          `http://localhost:8080/api/user/userProfile?username=${username}`
        );
        console.log("Response Data", response.data);
        setUserData(response.data);
        console.log("Response =", response.status);
      } catch (error) {
        console.log("Server Response: ", error);
      }
    };
    fetchData(); //Unless you don't call the function, no call to server
  }, []); //Empty dependency array to ensure the effect runs only once
  //If empty dependency array removed, then the effect keep on running.
  //if [id] id passed in dependency array then,
  return (
    <div className="container">
      <h1 className="my-4">User Profile</h1>
      {userData && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Username : {userData.username}</h5>
            <p className="card-text">Email : {userData.email}</p>
            <p className="card-text">First Name : {userData.firstName}</p>
            <p className="card-text">Last Name : {userData.lastName}</p>
            <p className="card-text">Address : {userData.address}</p>
            <p className="card-text">
              Contact Number : {userData.contactNumber}
            </p>
            <NavLink
              to={{
                pathname: "/api/user/updateProfile",
                search: `username=${username}`,
              }}
            >
              <button type="button" className="btn btn-primary">
                Edit profile
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
