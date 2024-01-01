import React from "react";

const BMVYourVenue = () => {
  return (
    <div>
      <h2>Venue Form</h2>
      <form className="col-md-3">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Enter Username
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Enter Address
          </label>
          <input
            type="address"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <label for="exampleInputEmail1" className="form-label">
          Enter Capacity
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Capacity of guests"
        />
        <label for="exampleInputEmail1" className="form-label">
          Enter Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter price to be paid for your venue per day"
        />
        <label for="exampleInputEmail1" className="form-label">
          Upload Images
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <label for="exampleInputEmail1" className="form-label">
        Enter Description
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <label for="exampleInputEmail1" className="form-label">
        Enter Contact Number
        </label>
        <input
          type="phoneNumber"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BMVYourVenue;
