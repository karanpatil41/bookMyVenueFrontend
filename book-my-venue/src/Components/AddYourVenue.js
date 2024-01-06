import React, { useState } from "react";
import axios from "axios";

const AddYourVenue = () => {
  const initialData = {
    username: "",
    venueName: "",
    contactNumber: "",
    address: "",
    capacity: "",
    amount: "",
    // image: "", // This should be a File object, not a string
    description: "",
  };
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, type, files } = e.target;

    if (type === "file") {
      const file = e.target.files[0]; // Get the first file
      setFormData({ ...formData, [name]: file });
    } else {
      const value = e.target.value;
      setFormData({ ...formData, [name]: value });
    }
    // // Check if the input type is "file"
    // const inputValue = type === "file" ? files[0] : value;

    // setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Venue Form Data: ", formData);

    try {
      const formDataObject = new FormData();

      // Append each form field to the FormData object
      Object.keys(formData).forEach((key) => {
        // if (key === "image") {
        //   formDataObject.append(key, formData[key][0]); // Append the first file from the array
        // } else {
          formDataObject.append(key, formData[key]);
        // }
      });

      const response = await axios.post(
        "http://localhost:8080/api/venue",
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Server Response: ", response.data);
      // Handle success, show a success message or redirect if needed
    } catch (error) {
      console.error("Error sending data to the server: ", error);
      // Handle error, show an error message or log it
    }

    // try {
    //   const response = axios.post("http://localhost:8080/api/venue", formData);
    //   console.log("Server Response: ", response.data);
    // } catch (error) {
    //   console.error("Error sending data to the server: ", error);
    // }
    setFormData(initialData);
  };

  return (
    <div>
      <h2>Venue Form</h2>
      <form className="col-md-3" encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Enter Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            className="form-control"
            id="username"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="venueName" className="form-label">
            Enter Venue Name
          </label>
          <input
            type="text"
            name="venueName"
            value={formData.venueName}
            className="form-control"
            id="venueName"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="contactNumber" className="form-label">
            Enter Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            className="form-control"
            id="contactNumber"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="address" className="form-label">
            Enter Address
          </label>
          <input
            type="address"
            name="address"
            value={formData.address}
            className="form-control"
            id="address"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="capacity" className="form-label">
            Enter Capacity
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            className="form-control"
            id="capacity"
            placeholder="Enter Capacity of guests"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="amount" className="form-label">
            Enter Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            className="form-control"
            id="amount"
            placeholder="Enter price to be paid for your venue per day"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="images" className="form-label">
            Upload Images
          </label>
          <input
            type="file"
            name="image"
            // value={formData.image}
            accept="image/*"
            onChange={handleInputChange}
            className="form-control"
            id="images"
          />
        </div>
        <div className="mb-3">
          <label for="description" className="form-label">
            Enter Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            className="form-control"
            id="description"
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddYourVenue;
