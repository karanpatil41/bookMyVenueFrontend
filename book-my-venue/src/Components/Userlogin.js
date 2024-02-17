import React, { useState } from "react";
import "./Userlogin.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction } from "../features/authSlice";

function UserLogin() {
  const token = sessionStorage["token"];
  const initialData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialData);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get the current state from redux
  // const status=useSelector((state) => state.auth);
  // console.log(`login: status => `, status)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.length === 0) {
      toast.error("Please enter email");
    } else if (formData.password.length == 0) {
      toast.error("Please enter password");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          formData
        );

        if (response.status === 200) {
          const data = response["data"];
          //Store the JWT token and username in the state or use a global state management solution
          sessionStorage["token"] = data["jwtToken"];
          sessionStorage["username"] = data["username"];

          //  cache the token
          console.log("Response Data", response.data);

          //set the status in redux store
          dispatch(loginAction());

          toast.success("Successfully Logged in.", response.data.username);
          navigate("/");
        }
      } catch (error) {
        console.error("Error during login: ", error);
        toast.error("Server Response: " + error);
      }
    }
    try {
      const username = sessionStorage["username"];
      const response = await axios.get(
        `http://localhost:8080/api/user/userProfile?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response["data"];
      sessionStorage["id"] = data["id"];
      console.log("Response Data: ", response.data);
    } catch (error) {
      console.log("Error", error);
    }
    setFormData(initialData);
  };

  return (
    <div>
      <h2>Sign in: </h2>
      <form className="col-md-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Enter Email Id/phone Number: </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
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
        <div className="mt-3">
          <div className="mt-3">
            Don't have an account ? Register <Link to="/userSignUp">here.</Link>
          </div>
        </div>
        <button type="submit" className="btn btn-warning mt-3">
          Login User
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
