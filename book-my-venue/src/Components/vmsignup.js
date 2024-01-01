import React, { useState } from "react";
// import "./vmsignup.css";
// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Vmsignup = () => {
  const initialFormData = {
    managerName: "",
    managerMobileNumber: "",
    managerAddress: "",
    // managerCapacity: "",
    // managerImage: "",
    // managerVideo: "",
    // managerDescription: "",
    managerUsername: "",
    managerPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  // const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); //this line prevents from formdata getting
    //vanished away on console
    console.log("Form Submitted:", formData);

    // navigate("/venueDetails", { state: { parentData } });

    //Clear the form after submission
    setFormData(initialFormData);
  };

  return (
    <div >
      <h1>Venue Manager SignUp Page</h1>

      <form className="col-md-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputEmail14">Name: </label>
          <input
            type="text"
            id="managerName"
            className="form-control"
            name="managerName"
            value={formData.managerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="managerMobileNumber">Mobile Number: </label>
          <input
            type="text"
            id="managerMobileNumber"
            className="form-control form-control-lg"
            name="managerMobileNumber"
            value={formData.managerMobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="managerAddress">Address : </label>
          <input
            type="text"
            id="managerAddress"
            className="form-control form-control-lg"
            name="managerAddress"
            value={formData.managerAddress}
            onChange={handleInputChange}
          />
        </div>
        {/* <div>
          <label htmlFor="managerCapacity">Capacity: </label>
          <input
            type="number"
            name="managerCapacity"
            id="managerCapacity"
            value={formData.managerCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="managerImage">Image : </label>
          <input
            type="text"
            name="managerImage"
            id="managerImage"
            value={formData.managerImage}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="managerVideo">Video : </label>
          <input
            type="text"
            name="managerVideo"
            id="managerVideo"
            value={formData.managerVideo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="managerDescription">Description: </label>
          <input
            type="text"
            name="managerDescription"
            id="managerDescription"
            value={formData.managerDescription}
            onChange={handleInputChange}
          />
        </div> */}

        <div>
          <label htmlFor="managerUsername">Username : </label>
          <input
            type="text"
            name="managerUsername"
            id="managerUsername"
            className="form-control form-control-lg"
            value={formData.managerUsername}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="managerPassword">Password : </label>
          <input
            type="password"
            id="managerPassword"
            className="form-control form-control-lg"
            name="managerPassword"
            value={formData.managerPassword}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-check">
          
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Male
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Female
          </label>
        </div>
        <button type="submit" className="btn btn-warning">
          Signup as Venue Manager
        </button>
      </form>
    </div>
  );
};

export default Vmsignup;
