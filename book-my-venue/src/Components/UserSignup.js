import React, { useState } from "react";
// import './UserSignup.css';
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    cName: "",
    cEmail: "",
    cNumber: "",
    cAddress: "",
    cUsername: "",
    cPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/userLogin", {
      state: { message: "Sign up successful.Please login" }
    });
  };
  return (
    <div>
      <h1>User SignUp Page</h1>
      <form className="col-md-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cName">Name :</label>
          <input
            type="text"
            id="cName"
            name="cName"
            className="form-control"
            value={formData.cName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cEmail">Email :</label>
          <input
            type="text"
            id="cEmail"
            name="cEmail"
            className="form-control"
            value={formData.cEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cName">Mobile Number :</label>
          <input
            type="text"
            id="cNumber"
            name="cNumber"
            className="form-control"
            value={formData.cNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cAddress">Address :</label>
          <input
            type="text"
            id="cAddress"
            name="cAddress"
            className="form-control"
            value={formData.cAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cUsername">Username :</label>
          <input
            type="text"
            id="cUsername"
            name="cUsername"
            className="form-control"
            value={formData.cUsername}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cPassword">Password :</label>
          <input
            type="password"
            id="cPassword"
            name="cPassword"
            className="form-control"
            value={formData.cPassword}
            onChange={handleChange}
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
          SignUp
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
