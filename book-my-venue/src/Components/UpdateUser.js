import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const username = sessionStorage['username'];

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

  const handleSubmit = async ()=> {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/updateProfile?username=${username}`,
        formData,
        {
          headers : {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJydXR1QGdtYWlsLmNvbSIsImlhdCI6MTcwNzcwNTUwNiwiZXhwIjoxNzA3NzIzNTA2fQ.o3bt60WoRMxyDS3gYAwiUsFoOPsTAbfZRAm6evk4clIYmOaTitPj4kFPxYX4Ie7Fqt8MZYu7tVbkDDhiQAbaqw`
          },
        }
      );
      console.log("Response Data: ",response.data);
      toast.success("Update Successful");
    }catch(error){
      console.log("Update Failed: ",error);
      toast.error("Update Failed",error);
    }
  };

  return (
    <div>
      <h1>UpdateUser</h1>

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
            <button className="btn btn-primary" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
