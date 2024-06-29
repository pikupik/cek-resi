import React, { useState } from 'react';
import axios from 'axios';
import './TrackingForm.css';

const couriers = [
  { code: "jne", description: "JNE Express" },
  { code: "pos", description: "POS Indonesia" },
  { code: "jnt", description: "J&T Express" },
  { code: "jnt_cargo", description: "J&T Cargo" },
  { code: "sicepat", description: "SiCepat" },
  { code: "tiki", description: "TIKI" },
  { code: "anteraja", description: "AnterAja" },
  { code: "wahana", description: "Wahana" },
  { code: "ninja", description: "Ninja Express" },
  { code: "lion", description: "Lion Parcel" },
  { code: "pcp", description: "PCP Express" },
  { code: "jet", description: "JET Express" },
  { code: "rex", description: "REX Express" },
  { code: "first", description: "First Logistics" },
  { code: "ide", description: "ID Express" },
  { code: "spx", description: "Shopee Express" },
  { code: "kgx", description: "KGXpress" },
  { code: "sap", description: "SAP Express" },
  { code: "rpx", description: "RPX" },
  { code: "lex", description: "Lazada Express" },
  { code: "indah_cargo", description: "Indah Cargo" },
  { code: "dakota", description: "Dakota Cargo" },
  { code: "kurir_tokopedia", description: "Kurir Rekomendasi" }
];

const TrackingForm = () => {
  const [awb, setAwb] = useState('');
  const [courier, setCourier] = useState(couriers[0].code);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    try {
      const response = await axios.get(`https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${courier}&awb=${awb}`);
      setResult(response.data.data);
    } catch (err) {
      setError('Error fetching tracking information');
    }
  };

  return (
    <div className="tracking-form-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={awb} 
          onChange={(e) => setAwb(e.target.value)} 
          placeholder="Masukkan nomor resi"
          className="input-field"
        />
        <select 
          value={courier} 
          onChange={(e) => setCourier(e.target.value)}
          className="select-field"
        >
          {couriers.map((courier) => (
            <option key={courier.code} value={courier.code}>
              {courier.description}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-button">Cek Resi</button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="tracking-result">
          <h3>Status Pengiriman</h3>
          <p>No Resi: {result.summary.awb}</p>
          <p>Kurir: {result.summary.courier}</p>
          <p>Layanan: {result.summary.service}</p>
          <p>Status: {result.summary.status}</p>
          <p>Berat: {result.summary.weight}</p>
          
          <h3>Detail Pengiriman</h3>
          <p>Tujuan: {result.detail.destination}</p>
          <p>Pengirim: {result.detail.shipper}</p>
          <p>Penerima: {result.detail.receiver}</p>
          
          <h3>Riwayat Pengiriman</h3>
          <ul>
            {result.history.map((item, index) => (
              <li key={index}>
                <p style={{fontWeight: "bold"}}>Tanggal: {item.date}</p>
                <p style={{fontSize: "12px"}}>Deskripsi: {item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackingForm;
