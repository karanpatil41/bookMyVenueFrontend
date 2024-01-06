import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Menu from "./menuApi";

const VenueDetails = ({onDataChanged}) => {

  const [inputValue, setInputValue]=useState('');

  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receivedParam = queryParams.get("param");


  // Assuming you have a function to fetch venue details by ID
  // Replace it with your actual data fetching logic
  const getVenueDetailsById = (venueId) => {
    // Example: Get venue details from the Menu array
    
    return Menu.find((venue) => venue.id === parseInt(venueId));
  };
  const venueDetails = getVenueDetailsById(id);

  if (!venueDetails) {
    return <div>Venue not found</div>;
  }

  const handleInputChange = (e) => {
    const newData = e.target.value;
    setInputValue(newData);
    onDataChanged(newData);
  }
  const { name, image, description } = venueDetails;

  return (
    <div>
      <input  type="text" value={inputValue} onChange={handleInputChange}/>
      <h2>Component B</h2>
      {receivedParam && <p>Received Parameter: {receivedParam}</p>}
    </div>
    // <div>
    //   <h2>Venue Details</h2>
    //   <div>
    //     <h5>{name}</h5>
    //     <img
    //       src={image}
    //       className="rounded img-thumbnail venue-img"
    //       alt={name}
    //       style={{ maxWidth: "100%", maxHeight: "200px" }}
    //     />
    //     <div>
    //       <h5>{id}</h5>

    //       <p>{description}</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default VenueDetails;
