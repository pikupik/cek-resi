import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            type="text" 
            value={awb} 
            onChange={(e) => setAwb(e.target.value)} 
            placeholder="Masukkan nomor resi"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select 
            value={courier} 
            onChange={(e) => setCourier(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {couriers.map((courier) => (
              <option key={courier.code} value={courier.code}>
                {courier.description}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
          Cek Resi
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Status Pengiriman</h3>
          <p>No Resi: {result.summary.awb}</p>
          <p>Kurir: {result.summary.courier}</p>
          <p>Layanan: {result.summary.service}</p>
          <p>Status: {result.summary.status}</p>
          <p>Berat: {result.summary.weight}</p>
          
          <h3 className="text-lg font-semibold mt-4">Detail Pengiriman</h3>
          <p>Tujuan: {result.detail.destination}</p>
          <p>Pengirim: {result.detail.shipper}</p>
          <p>Penerima: {result.detail.receiver}</p>
          
          <h3 className="text-lg font-semibold mt-4">Riwayat Pengiriman</h3>
          <ul className="space-y-2">
            {result.history.map((item, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md">
                <p className="font-bold">Tanggal: {item.date}</p>
                <p className="text-sm">Deskripsi: {item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackingForm;
