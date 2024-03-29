import React, { useEffect, useState } from "react";
import "./Venue.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import { sortedVenues } from "../features/venueSlice";
import { useDispatch, useSelector } from "react-redux";

const Venue = () => {
  // read the redux state
 
  const venue = useSelector((state) => state.venues);
  
  console.log(`status = `, venue);

 
  const [venues, setVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); //Adjust the number of items per page
  const dispatch = useDispatch();

  //useEffect hook is used to fetch data from server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/venue/getAllVenues"
        );
        dispatch(sortedVenues(response.data));
        
        console.log("Server Response in Venue: ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //Calculate the index range for the current page
  const indexOfLastVenue = currentPage * itemsPerPage;
  const indexOfFirstVenue = indexOfLastVenue - itemsPerPage;
  const currentVenues = venue.venues.slice(indexOfFirstVenue, indexOfLastVenue);

  //Function to change the current page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <section className="container mt-3">
        <div className="row">
          {currentVenues.map((curElem) => {
            const {
              id,
              venueName,
              capacity,
              username,
              address,
              amount,
              image,
              contactNumber,
              description,
            } = curElem;
            return (
              <div className="col-md-4 mb-4" key={id}>
                <NavLink
                  as="div" // Use a div instead of the default anchor tag
                  to={{
                    pathname: "/api/venue/venueDetails",
                    search: `id=${id}`,
                    state: { curElem: curElem },
                  }}
                >
                  <div className="card venue-card">
                    <img
                      src={`data:image/jpeg;base64,${image}`}
                      className="rounded img-thumbnail venue-img"
                      alt={id}
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />

                    <div className="card-body">
                      <span className="card-number card-circle subtle">
                        {curElem.id}
                      </span>
                      <h5 className="card-title">{venueName}</h5>
                      <p className="card-text">₹ {amount}/day</p>
                      <p className="card-text">{contactNumber}</p>
                      <p className="card-text">{address}</p>
                      <p className="card-text">Capacity: {capacity}</p>
                      <button type="button" className="btn btn-warning">
                        Book Now
                      </button>
                    </div>
                  </div>
                </NavLink>
              </div>
              /* Bootstrap Pagination */
            );
          })}
        </div>
        {/* Bootstrap Pagination with Next and Previous buttons */}
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({
              length: Math.ceil(venue.venues.length / itemsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(venue.venues.length / itemsPerPage)}
            />
          </Pagination>
        </div>
      </section>
    </div>
  );
};
export default Venue;
