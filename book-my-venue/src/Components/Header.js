import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../features/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const initialFormData = {
    city: "",
    date: "",
    numberOfGuests: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");

    //update the global store
    dispatch(logoutAction());
    toast.success("User logged out succesfully");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      //Make a POST request to your server endpoint
      const response = await axios.post(
        "http://localhost:8080/api/venue",
        formData
      );
      console.log("Server Response: ", response.data);
    } catch (error) {
      console.error("Error sending data to the server: ", error);
    }

    setFormData(initialFormData);
  };
  //State to manage dropdown visibility
  const [dropdownVisible, setDropDownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropDownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropDownVisible(false);
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
              <input
                type="date"
                name="date"
                value={formData.date}
                placeholder="Enter Date"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
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
              <NavLink
                to="/userLogin"
                className="mr-4"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Login
              </NavLink>
              <NavLink
                onClick={onLogout}
                className="mr-4"
                style={{
                  color: "white",
                  textDecoration: "none",
                  pointerEvents: "auto",
                }}
              >
                Logout
              </NavLink>
         
          <Dropdown
            show={dropdownVisible}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="mr-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <MdOutlineMenu />
            </Dropdown.Toggle>

            <Dropdown.Menu
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Dropdown.Item as={NavLink} to="/userLogin">
                Login
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} onClick={onLogout}>
                Logout
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/userSignUp">
                Sign up
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={NavLink} to="/addYourVenue">
                Add Your Venue
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/vmSignUp">
                Venue Manager SignUp
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/contact">
                Contact Us
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <MdOutlineMenu />
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div className="col-md-2">
                <NavLink to="/userLogin" className="dropdown-item">
                  Login
                </NavLink>
                <NavLink to="/userSignUp" className="dropdown-item">
                  Sign up
                </NavLink>
                <hr className="dropdown-divider" />
                <NavLink to="/bmvYourVenue" className="dropdown-item">
                  Add Your Venue
                </NavLink>
                <NavLink to="/contact" className="dropdown-item">
                  Contact Us
                </NavLink>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
