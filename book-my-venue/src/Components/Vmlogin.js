import React, { useState } from "react";
// import './Vmlogin.css';

function Vmlogin() {
  const initialFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleSubmit = (e) => {
    e.preventDefault(); //this line prevents from formdata getting
    //vanished away on console

    console.log("FormData Submitted: ", formData);
    setFormData(initialFormData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div >
        <h2>Signup Successful! Please Login...</h2>
      <form className="col-md-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username : </label>
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
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-warning">Login as Venue Manager</button>
      </form>
    </div>
  );
}

export default Vmlogin;
