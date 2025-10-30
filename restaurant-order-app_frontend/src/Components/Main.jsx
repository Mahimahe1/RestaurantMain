import { Routes,Route } from 'react-router-dom';
import React from 'react';
import Categories from './Categories';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './Footer';
import AboutUs from "./AboutUs";
import Careers from "./Careers";
import Blog from "./Blog";
import HelpCenter from "./HelpCenter";
import ContactUs from "./ContactUs";
import PrivacyPolicy from "./PrivacyPolicy";
import Register from "./Register";
import Login from "./Login";
import UploadCategories from './UploadCategories';
import CartSummary from './CartSummary';  
{/*
{/*
import PopularSection from './Components/PopularSection';
import AppPromo from './Components/AppPromo';
import Footer from './Components/Footer';
*/}
function App() {
  return (
    <div className="App font-sans">
      <div className="flex-grow">
        
          <Routes>
            <Route path="/cart" element={<CartSummary />} />
            <Route path="/upload" element={<UploadCategories />} />
            <Route path="/view" element={<Categories />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />   
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
      </div>
      {/*
      <PopularSection />
      <AppPromo />
      +
      */}
    </div>
  );
}

export default App;
