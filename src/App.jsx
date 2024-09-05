import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import TrackingForm from './mainfile/TrackingForm.jsx';
import QRCodeGenerator from './mainfile/QRCodeGenerator.jsx';
import InfoGempa from './mainfile/InfoGempa.jsx'
import ProfitCalculator from './mainfile/ProfitCalculator.tsx'
import AirQuality from './mainfile/AirQuality.jsx'

import './App.css'

const App = () => {
  const [activeComponent, setActiveComponent] = useState('CekResi');

  const handleNavItemClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavItemClick={handleNavItemClick} />
      <main className="flex-1 container mx-auto p-4">
        {activeComponent === 'CekResi' && <TrackingForm />}
        {activeComponent === 'QRCodeGenerator' && <QRCodeGenerator />}
        {activeComponent === 'InfoGempa' && <InfoGempa />}
        {activeComponent === 'AnalisisProfit' && <ProfitCalculator />}
        {activeComponent === 'AirQty' && <AirQuality />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
