import React, { useState } from "react";

function VenueDetails(props) {
  const dataFromParent = props.parentData;

  const initialData = {
    venueName: "",
    venueCapacity: "",
    venueLocation: "",
  };
  const [formData, setFormData] = useState(initialData);

  //   const parentData = location.state && location.state.formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    console.log("Data received from parent: " + dataFromParent);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      {/* <h1>hello: {name}</h1> */}
      <h1>Enter Venue Details</h1>
      <p>Data received from parent: {dataFromParent}</p>
      <form className="signupForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="venueName">VenueName: </label>
          <input
            type="text"
            id="venueName"
            name="venueName"
            value={formData.venueName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="venueCapacity">Venue Capacity: </label>
          <input
            type="text"
            id="venueCapacity"
            name="venueCapacity"
            value={formData.venueCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="venueLocation">Venue Location: </label>
          <input
            type="text"
            id="venueLocation"
            name="venueLocation"
            value={formData.venueLocation}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit Venue Details</button>
      </form>
    </div>
  );
}

export default VenueDetails;
