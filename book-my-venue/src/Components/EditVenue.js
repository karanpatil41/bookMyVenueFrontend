import { useState } from "react";

const EditVenue = () => {
  const initialData = {
    username: "",
    venueName: "",
    contactNumber: "",
    address: "",
    capacity: "",
    amount: "",
    image: "", // This should be a File object, not a string
    description: "",
  };
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const {name, value}=e.target;
    setFormData({
        ...formData,
        [name]:value,
    });
  };

  return (
    <div className="container">
      <h1 className="text-center">Update Venue</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Venue Name: {formData.venueName}</h5>
              <p className="card-text">Email :{formData.username}</p>
              <div className="form-group">
                <label htmlFor="venueName">Venue Name:</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  className="form-control"
                  id="venueName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.contactNumber}
                  className="form-control"
                  id="venueName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.address}
                  className="form-control"
                  id="venueName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="capacity">Capacity:</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.capacity}
                  className="form-control"
                  id="venueName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.amount}
                  className="form-control"
                  id="venueName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Images :</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.image}
                  className="form-control"
                  id="venueName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.description}
                  className="form-control"
                  id="venueName"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditVenue;
