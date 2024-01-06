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
import 'bootstrap/dist/css/bootstrap.min.css';
import AddYourVenue from "./Components/AddYourVenue";
import VenueDetails from "./Components/VenueDetails";

function App() {
  return (
    <div>
      <BrowserRouter> 
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vmSignUp" element={<Vmsignup />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userSignUp" element={<UserSignup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addYourVenue" element={<AddYourVenue/>} />
          <Route path="/venueDetails" element={<VenueDetails/>} />
          <Route path="/trial" element={<Trial />} />
          <Route Component={Error} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
