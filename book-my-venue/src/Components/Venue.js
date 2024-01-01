import React, { useState } from "react";
import Menu from "./menuApi";
// import { CImage } from '@coreui/bootstrap-react';

const Venue = ({ venueName, venueLocation }) => {

  const itemsPerPage = 4; //Set the number of items per page
  const [currentPage, setCurrentPage]=useState(1);
  
  //Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Menu.slice(indexFirstItem,indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const [menuData, setMenuData] = useState(Menu);

  return (
    <div>
      <section className="container mt-4">
        <h2 className="text-center mb-4">{venueName}</h2>
        <div className="row">
          {currentItems.map((curElem) => {
            const { id, name, category, image, description } = curElem;

            return (
              <div className="col-md-4 mb-4" key={id}>
                <div className="card">
                {/* <CImage rounded thumbnail src={image} width={200} height={200} /> */}
                  <img src={image} className="card-img-top" alt={name} />
                  <span className="card-number card-circle subtle">
                    {curElem.id}
                  </span>
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <button type="button" class="btn btn-warning">
                      Book Nowe
                    </button>
                  </div>
                </div>
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
                className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-secondary"}`}
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
