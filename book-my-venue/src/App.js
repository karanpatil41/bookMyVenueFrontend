import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Vmsignup from "./Components/vmsignup";
import UserSignup from "./Components/UserSignup";
import Vmlogin from "./Components/Vmlogin";
import UserLogin from "./Components/Userlogin";
import VenueDetails from "./Components/VenueDetails";
import Trial from "./Components/Trial";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import BMVYourVenue from "./Components/BMVYourVenue";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BrowserRouter> 
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vmSignUp" element={<Vmsignup />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/venueManagerLogin" element={<Vmlogin />} />
          <Route path="/userSignUp" element={<UserSignup />} />
          <Route path="/venueDetails" element={<VenueDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bmvYourVenue" element={<BMVYourVenue/>} />
          <Route path="/trial" element={<Trial />} />
          <Route Component={Error} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
