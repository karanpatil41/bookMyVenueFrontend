import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dropdown from "react-bootstrap/Dropdown";


const Header = () => {
  const initialFormData = {
    city: "",
    date: "",
    numberOfGuests: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData(initialFormData);
  };
  //State to manage dropdown visibility
  const [dropdownVisible, setDropDownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setDropDownVisible(!dropdownVisible);
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* Container 1: Logo */}
        <div className="col-md-3">
          <NavLink to="/">
            <img src="" alt="logo" />
          </NavLink>
        </div>
        {/* Container 2:  Search Inputs and Button */}
        <div className="col-md-6 text-center">
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
        <div className="col-md-2">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <MdOutlineMenu />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/userLogin">
                Login
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/userSignUp">
                Sign up
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={NavLink} to="/bmvYourVenue">
                Add Your Venue
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
