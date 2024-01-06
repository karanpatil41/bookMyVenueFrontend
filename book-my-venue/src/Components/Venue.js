import React, { useState } from "react";
import Menu from "./menuApi";
import "./Venue.css";
import { NavLink } from "react-router-dom";

const Venue = () => {
  const itemsPerPage = 4; //Set the number of items per page
  const [currentPage, setCurrentPage] = useState(1);
 
  //Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Menu.slice(indexFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <section className="container mt-4">
        <div className="row">
          {currentItems.map((curElem) => {
            const { id, name, price, image, description } = curElem;
            return (
              <div className="col-md-4 mb-4" key={id}>
                <NavLink
                  to={{
                    pathname: "/venueDetails",
                    search: `id=${id}`,
                    state: { curElem: curElem },
                  }}
                >
                  <div className="card venue-card">
                    {/* <CImage rounded thumbnail src={image} width={200} height={200} /> */}
                    <img
                      src={image}
                      className="rounded img-thumbnail venue-img"
                      alt={name}
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                    <span className="card-number card-circle subtle">
                      {curElem.id}
                    </span>
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">{price}</p>
                      <p className="card-text">{description}</p>
                      <button type="button" className="btn btn-warning">
                        Book Nowe
                      </button>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
        {/* Pagination buttons */}
        <div className="d-flex justify-content-center">
          {Array.from({ length: Math.ceil(Menu.length / itemsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`btn ${
                  currentPage === index + 1 ? "btn-primary" : "btn-secondary"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </section>
    </div>
  );
};
export default Venue;
