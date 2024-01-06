import React, { useState } from "react";
import "./Userlogin.css";
import { useLocation } from "react-router-dom";

function UserLogin() {
  const initialData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialData);
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    //Access the state passed from UserSignup
    const { state } = location;
    if (state && state.message) {
      console.log(state.message);
    }
  };

  return (
    <div>
      <h2>Sign in: </h2>
      <form className="col-md-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Login User
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
