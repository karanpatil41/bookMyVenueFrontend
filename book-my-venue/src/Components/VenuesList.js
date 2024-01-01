import React, { useEffect, useState } from "react";

const VenuesList = ({ searchParams }) => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`/api/venues?${searchParams}`);
        const data = await response.json();
        // console.log(data);
        //Update the state with fetched venues
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues", error);
      }
    };
    //Call the fetchVenues function
    fetchVenues();
  }, [searchParams]);

  return (
    <div>
      <h2>Venues List</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>{venue.name}</li>
          // You can display more details about the venue here
        ))}
      </ul>
    </div>
  );
};

export default VenuesList;
