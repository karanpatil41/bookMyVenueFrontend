import React, { useState } from "react";
import Menu from "./menuApi";

const VenueCard = ({ venueName, venueLocation }) => {
  const [menuData, setMenuData] = useState(Menu);

  return (
    <>
      <section className="container mt-4">
        <h2 className="text-center mb-4">{venueName}</h2>
        <div className="row">
          {menuData.map((curElem) => {
            const { id, name, category, image, description } = curElem;

            return (
              <div className="col-md-4 mb-4" key={id}>
                <div className="card">
                  <img
                    src={image}
                    className="card-img-top"
                    alt={name}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  />
                  <span className="card-number card-circle subtle">
                    {curElem.id}
                  </span>
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <button type="button" class="btn btn-warning">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default VenueCard;
