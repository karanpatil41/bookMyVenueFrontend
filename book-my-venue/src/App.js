import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Vmsignup from "./Components/vmsignup";
import UserSignup from "./Components/UserSignup";
import UserLogin from "./Components/Userlogin";
import Trial from "./Components/Trial";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import AddYourVenue from "./Components/AddYourVenue";
import VenueDetails from "./Components/VenueDetails";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Components/Logout";
import { store } from "./store";
import Venue from "./Components/Venue";
import { UserProfile } from "./Components/UserProfile";
import UpdateUser from "./Components/UpdateUser";
import UserVenue from "./Components/UserVenue";
import UpdateVenue from "./Components/UpdateVenue";
import Booking from "./Booking/Booking";
import BookingRequest from "./Booking/BookingRequest";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vmSignUp" element={<Vmsignup />} />
            <Route path="/userLogin" element={<UserLogin />} />
            <Route path="/userSignUp" element={<UserSignup />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/api/user/updateProfile" element={<UpdateUser />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addYourVenue" element={<AddYourVenue />} />
            <Route path="/api/venue/updateVenue" element={<UpdateVenue />} />
            <Route path="/api/venue/userVenue" element={<UserVenue />} />
            <Route path="/api/venue/venueDetails" element={<VenueDetails />} />
            <Route path="/api/venue/booking" element={<Booking />} />
            <Route path="/bookingRequest" element={<BookingRequest />} />
            <Route path="/api/venue/search" element={<Venue />} />
            updateVenue
            <Route path="/logout" element={<Logout />} />
            <Route path="/trial" element={<Trial />} />
            <Route Component={Error} />
          </Routes>
          <ToastContainer />
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
