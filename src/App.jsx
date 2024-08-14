import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TrackingForm from './components/TrackingForm';
import Footer from './components/Footer';
import QRCodeGenerator from './components/QRCodeGenerator';
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
      </main>
      <Footer />
    </div>
  );
};

export default App;
