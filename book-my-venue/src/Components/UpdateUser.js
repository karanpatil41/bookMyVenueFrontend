import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const username = sessionStorage["username"];
  const token = sessionStorage["token"];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/userProfile?username=${username}`
        );
        console.log("Response Data", response.data);
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.log("Server Response: ", error);
        toast.error("Server Response: ", error);
      }
    };
    fetchData();
  }, [username]); //Empty dependency array to ensure the effect runs only once when componentDidMount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password.length === 0) {
      toast.error("Please enter password");
    } else if (formData.confirmPassword.length === 0) {
      toast.error("Please enter confirm password");
    } else if (formData.confirmPassword !== formData.password) {
      toast.error("Password does not match");
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:8080/api/user/updateProfile?username=${username}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Data: ", response.data);
        toast.success("Update Successful");
        navigate("/userProfile");
      } catch (error) {
        console.log("Update Failed: ", error);
        toast.error("Update Failed", error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">UpdateUser</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {userData && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Username : {userData.username}</h5>
                <p className="card-text">Email : {userData.email}</p>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber || ""}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
