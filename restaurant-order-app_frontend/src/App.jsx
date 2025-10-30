// App.jsx
import React from 'react';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import '@fortawesome/fontawesome-free/css/all.min.css';

{/*
{/*
import PopularSection from './Components/PopularSection';
import AppPromo from './Components/AppPromo';
import Footer from './Components/Footer';
*/}
function App() {
  return (
    <div className="App font-sans">
      <Navbar />
      
      <Main />
      
      {/*
      <PopularSection />
      <AppPromo />
      +
      */}
    </div>
  );
}

export default App;
