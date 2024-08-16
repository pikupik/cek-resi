import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfoGempa = () => {
  const [earthquakeData, setEarthquakeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      try {
        const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
        setEarthquakeData(response.data.Infogempa.gempa);
      } catch (err) {
        setError('Failed to fetch earthquake data');
      }
    };

    fetchEarthquakeData();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md">
     <h2 className="text-xl font-bold mb-2">
        Informasi Gempa Terkini by{' '}
        <a 
          href="https://www.bmkg.go.id" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline"
        >
          BMKG
        </a>
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {earthquakeData ? (
        <div>
          <p><strong>Waktu: </strong>{earthquakeData.Tanggal} {earthquakeData.Jam}</p>
          <p><strong>Magnitudo: </strong>{earthquakeData.Magnitude}</p>
          <p><strong>Kedalaman: </strong>{earthquakeData.Kedalaman}</p>
          <p><strong>Lokasi: </strong>{earthquakeData.Lintang}, {earthquakeData.Bujur}</p>
          <p><strong>Wilayah: </strong>{earthquakeData.Wilayah}</p>
          <p><strong>Dirasakan: </strong>{earthquakeData.Dirasakan}</p>
          <p><strong>Potensi Tsunami: </strong>{earthquakeData.Potensi}</p>

          {earthquakeData.Shakemap && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Detail Lokasi</h3>
              <img 
                src={`https://data.bmkg.go.id/DataMKG/TEWS/${earthquakeData.Shakemap}`} 
                alt="Shakemap Gempa" 
                className="w-full h-auto rounded"
              />
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InfoGempa;
