import React, { useState } from "react";
// import "./vmsignup.css";
// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Vmsignup = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    roleName:"VENUE_MANAGER",
    roleId: 2,
  };
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //this line prevents from formdata getting
    //vanished away on console
    console.log("Form Submitted:", formData);
    if (formData.firstName.length === 0) {
      toast.error("Please enter firstName");
    } else if (formData.lastName.length === 0) {
      toast.error("Please enter lastName");
    } else if (formData.email.length === 0) {
      toast.error("Please enter email");
    } else if (formData.contactNumber.length === 0) {
      toast.error("Please enter contactNumber");
    }else if(formData.contactNumber.length !== 10){
      toast.error("Please enter contactNumber with 10 digits only");
    } else if (formData.address.length === 0) {
      toast.error("Please enter address");
    } else if (formData.password.length === 0) {
      toast.error("Please enter password");
    } else if (formData.confirmPassword.length === 0) {
      toast.error("Please enter confirm password");
    } else if (formData.confirmPassword !== formData.password) {
      toast.error("Password does not match");
    }else{
      try {
        //Send user data to the server using Axios
        const response = await axios.post(
          "http://localhost:8080/api/user/signup",
          formData
        );
  
        //Check the response and handle success or error accordingly
        if (response.status === 201) {
          toast.success("Successfully registered your account");
          console.log("Server Response: ", response.data);
          setFormData(initialData);
          navigate("/userLogin");
        } else {
          toast.error("Error signing up user");
          console.error("Error signing up user");
        }
      } catch (error) {
        toast.error(`Error signing up user: ${error.message}`);
        console.error("Error signing up user", error.message);
      }
    }
    

    //Clear the form after submission
    setFormData(initialData);
  };

  return (
    <div>
      <h1>Venue Manager SignUp Page</h1>
      <form className="col-md-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
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
          <div className="col mb-3">
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
          <label htmlFor="confirmPassword">Confirm Password :</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="mt-3">
              Already have an account ? Login <Link to={'/userLogin'}>here</Link>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-warning mt-3">
          SignUp
        </button>
      </form>
      {/* <form className="col-md-3" onSubmit={handleSubmit}>
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
      </form> */}
    </div>
  );
};

export default Vmsignup;
