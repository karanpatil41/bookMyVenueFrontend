import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateVenue = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const token = sessionStorage["token"];
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/venue/venueDetails?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Data: ", response.formData);
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]); //Empty dependency array to ensure the effect runs only once
  //If empty dependency array removed, then the effect keep on running.
  //if [id] id passed in dependency array then,

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
          `http://localhost:8080/api/venue/updateVenue?id=${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Data: ", response.data);
        toast.success("Venue Updated Successfully...");
        setFormData(response.data);
        setUserData(response.data);
        navigate("/api/venue/userVenue");
      } catch (error) {
        console.log("Update Failed", error);
        toast.error("Venue Update Failed");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Update Venue</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {userData && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Venue Name: {userData.venueName}</h5>
                <p className="card-text">Email :{userData.username}</p>
                <div className="form-group">
                  <label htmlFor="venueName">Venue Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="venueName"
                    name="venueName"
                    value={formData.venueName || ""}
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
                  <label htmlFor="capacity">Capacity:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount in ₹:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Images :</label>
                  <img
                    src={`data:image/jpeg;base64,${formData.image}`}
                    className="rounded img-thumbnail venue-img"
                    alt={id}
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    value={formData.description || ""}
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
                  Update Venue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UpdateVenue;
