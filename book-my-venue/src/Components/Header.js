import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../features/authSlice";
import { toast } from "react-toastify";
import { sortedVenues } from "../features/venueSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Header = () => {
  const initialFormData = {
    city: "",
    date: "",
    capacity: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentDate = useRef(new Date().toISOString().split("T")[0]); // Get current date in ISO format

  //get the current state from redux
  const loginStatus = useSelector((state) => state.auth.status);
  console.log(`login: status => `, loginStatus);
  const username = sessionStorage["username"];
  // console.log(`Username is ${username}`);
  const onLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");

    //update the global store
    dispatch(logoutAction());
    toast.success("User logged out succesfully");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target || {}; // Use default empty object if e.target is undefined
    if (name) {
      setFormData({ ...formData, [name]: value });
    } else {
      console.error("Input name is undefined");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(`formData= `, formData);
    try {
      //Make a POST request to your server endpoint
      const response = await axios.get(
        `http://localhost:8080/api/venue/search?city=${formData.city}&capacity=${formData.capacity}`,
        formData
      );
      //Navigate to the Venue component and pass the response data as state
      navigate("/api/venue/search");
      console.log("Server Response in Header: ", response.data);
      dispatch(sortedVenues(response.data));
    } catch (error) {
      console.error("Error sending data to the server: ", error);
    }

    // setFormData(initialFormData);
  };

  useEffect(() => {
    // Add event listener to update the scroll position
    const handleScroll = () => {
      const header = document.getElementById("header");

      if (window.scrollY > header.offsetTop) {
        header.classList.add("fixed-header");
      } else {
        header.classList.remove("fixed-header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleChangeDate = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };
  return (
    <div className="container-fluid py-3 dark-background" id="header">
      <div className="row justify-content-between">
        {/* Container 1: Logo */}
        <div className="col-md-3">
          <NavLink to="/">
            <img
              src="/images/logo11.jpeg"
              alt="logo"
              // style={{ maxWidth: "80%", maxHeight: "90%" }}
              style={{ maxWidth: "200px", maxHeight: "100px" }}
            />
          </NavLink>
        </div>
        {/* Container 2:  Search Inputs and Button */}
        <div className="col-md-6 text-center mt-4">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <input
                type="text"
                name="city"
                value={formData.city}
                placeholder="Enter City"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-3">
              {/* <label htmlFor="checkoutDate" className="form-label">
                Enter Date
              </label> */}
              <DatePicker
                selected={formData.date}
                placeholderText="Enter Date"
                name="date"
                // value={formData.date}
                minDate={currentDate.current}
                className="form-control"
                onChange={(date) => handleChangeDate(date, "date")}
              />
            </div>
            {/* <div className="col-md-3">
              <input
                type="date"
                name="date"
                value={formData.date}
                placeholder="Enter Date"
                className="form-control"
                min={currentDate.current} // Set the min attribute to the current date
                onChange={handleInputChange}
              />
            </div> */}
            <div className="col-md-4">
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                placeholder="Number of Guests"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2">
              <FaSearch
                size={20}
                color="orange"
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
                className="cursor-pointer transition-scale"
                onClick={handleSearch}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </div>
          </div>
        </div>
        {/* Container 3: Toggle button */}
        <div className="col-md-2 mt-4 d-flex justify-content-end">
          {loginStatus && (
            <NavLink
              to="/userProfile"
              className="mr-4"
              style={{
                color: "white",
                textDecoration: "none",
                pointerEvents: loginStatus ? "auto" : "none",
                opacity: loginStatus ? 1 : 0.5,
              }}
            >
              {username}
            </NavLink>
          )}
          {!loginStatus && (
            <NavLink
              to="/userLogin"
              className="mr-4"
              style={{
                color: "white",
                textDecoration: "none",
                pointerEvents: loginStatus ? "none" : "auto",
                opacity: loginStatus ? 0.5 : 1,
              }}
            >
              Login
            </NavLink>
          )}
          {loginStatus && (
            <NavLink
              onClick={onLogout}
              to="/"
              className="mr-4"
              style={{
                color: "white",
                textDecoration: "none",
                pointerEvents: loginStatus ? "auto" : "none",
                opacity: loginStatus ? 1 : 0.5,
              }}
            >
              Logout
            </NavLink>
          )}
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="mr-2"
            >
              <MdOutlineMenu />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {loginStatus && (
                <Dropdown.Item as={NavLink} to="/userProfile">
                  User Profile
                </Dropdown.Item>
              )}

              {loginStatus && (
                <Dropdown.Item as={NavLink} to="/userProfile">
                  {username}
                </Dropdown.Item>
              )}
              {!loginStatus && (
                <Dropdown.Item as={NavLink} to="/userLogin">
                  Login
                </Dropdown.Item>
              )}
              {loginStatus && (
                <Dropdown.Item as={NavLink} onClick={onLogout}>
                  Logout
                </Dropdown.Item>
              )}
              {!loginStatus && (
                <Dropdown.Item as={NavLink} to="/userSignUp">
                  Sign up
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Item as={NavLink} to="/addYourVenue">
                Add Your Venue
              </Dropdown.Item>
              {loginStatus && (
                <Dropdown.Item as={NavLink} to="/api/venue/userVenue">
                  Your Venue Details
                </Dropdown.Item>
              )}
              {loginStatus && (
                <Dropdown.Item as={NavLink} to="/editVenue">
                  Edit your Venue
                </Dropdown.Item>
              )}
              {!loginStatus && (
                <Dropdown.Item as={NavLink} to="/vmSignUp">
                  Venue Manager SignUp
                </Dropdown.Item>
              )}
              <Dropdown.Item as={NavLink} to="/contact">
                Contact Us
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
