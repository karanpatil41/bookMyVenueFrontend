import axios from "axios";
import React, { useState } from "react";
// import './UserSignup.css';
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    cPassword: "",
    roleId:1,
  };
  const [formData, setFormData] = useState(initialData);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);

    try {
      //Send user data to the server using Axios
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        formData
      );

      //Check the response and handle success or error accordingly
      if (response.status === 201) {
        console.log("User signed up successfully");
        setFormData(initialData);
      } else {
        console.error("Error signing up user");
        setSubmitError("Error signing up user");
      }
    } catch (error) {
      console.error("Error signing up user", error.message);
      setSubmitError("Error signing up user");
    }
  };
  return (
    <div>
      <h1>User SignUp Page</h1>
      <form className="col-md-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cName">Mobile Number :</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            className="form-control"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address :</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password :</label>
          <input
            type="password"
            id="cPassword"
            name="cPassword"
            className="form-control"
            value={formData.cPassword}
            onChange={handleChange}
          />
        </div>

        {passwordMatchError && (
          <div className="text-danger mt-2">Passwords do not match.</div>
        )}
        {submitError && <div className="text-danger mt-2">{submitError}</div>}
        <button type="submit" className="btn btn-warning mt-3">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
