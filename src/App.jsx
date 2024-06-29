import React from 'react';
import TrackingForm from './components/TrackingForm';
import Footer from './components/Footer'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cek Resi Online Cepat</h1>
      </header>
      <div className="banner">
        <p>Tempat iklan Anda di sini!</p>
      </div>
      <TrackingForm />
      <div className="banner">
        <p>Tempat iklan Anda di sini!</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
