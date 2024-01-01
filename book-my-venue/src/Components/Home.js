import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Venue from "./Venue";

const Home = () => {
  return (
    <div>
      Welcome to HomePage <br />
      
      <Venue />
      <NavLink to="/vmSignUp">SignUp as VenueManager</NavLink>
      <br />
      <NavLink to="/venueManagerLogin">Login as Venue Manager</NavLink>
    </div>
  );
};

export default Home;
