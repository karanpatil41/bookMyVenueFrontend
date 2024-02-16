import React from "react";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-2 py-3 fixed-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://example.com/help-centre"
                  className="text-light"
                >
                  Help Centre
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/safety-issue"
                  className="text-light"
                >
                  Get help with a safety issue
                </a>
              </li>
              <li>
                <a href="https://example.com/aircover" className="text-light">
                  AirCover
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/anti-discrimination"
                  className="text-light"
                >
                  Anti-discrimination
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/disability-support"
                  className="text-light"
                >
                  Disability support
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Hosting</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://example.com/airbnb-your-home"
                  className="text-light"
                >
                  BMV your Venue
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/hosting-resources"
                  className="text-light"
                >
                  Hosting resources
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/community-forum"
                  className="text-light"
                >
                  Community forum
                </a>
              </li>
              <li>
                {" "}
                <a
                  href="https://example.com/hosting-responsibly"
                  className="text-light"
                >
                  Hosting responsibly
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>BookMyVenue</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://example.com/newsroom" className="text-light">
                  Newsroom
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/new-features"
                  className="text-light"
                >
                  New features
                </a>
              </li>
              <li>
                <a href="https://example.com/careers" className="text-light">
                  Careers
                </a>
              </li>
              <li>
                <a href="https://example.com/investors" className="text-light">
                  Investors
                </a>
              </li>
              <li>
                <a
                  href="https://example.com/airbnb-org-emergency-stays"
                  className="text-light"
                >
                  BookMyVenue.org emergency stays
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row mt-1">
          <div className="col-md-6">
            <p>
              &copy; {currentYear} BookMyVenue,Inc. | Privacy | Terms | Sitemap
            </p>
          </div>
          <div className="col-md-6 text-right">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                size={20}
                color="#1877f2"
                style={{ marginRight: "10px" }}
              />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                size={20}
                color="#1877f2"
                style={{ marginRight: "10px" }}
              />
            </a>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle size={20} color="#4285f4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
