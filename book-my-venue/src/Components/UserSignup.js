import axios from "axios";
import React, { useState } from "react";
// import './UserSignup.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserSignup = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    roleName:"USER",
    roleId: 1,
  };
  const [formData, setFormData] = useState(initialData);
  const [contactNumberError, setContactNumberError]=useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate contactNumber
    if (name === "contactNumber") {
     const isValidContactNumber = /^\d{10}$/.test(value);
     if (!isValidContactNumber) {
       // Display error message
       setContactNumberError("Contact number should be of 10 digits");
     } else {
       // Clear error message if contact number is valid
       setContactNumberError("");
     }
   }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

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
    }else if (formData.confirmPassword.length === 0) {
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
          console.log("Server Response: ",response.data);
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
    
  };
  return (
    <div>
      <h1>User SignUp Page</h1>
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
         {/* Display error message if there is one */}
         {contactNumberError && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {contactNumberError}
            </div>
          )}
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
    </div>
  );
};

export default UserSignup;
