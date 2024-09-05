import React, { useState } from 'react';

function AirQty() {
  const [temperature, setTemperature] = useState('');
  const [pressure, setPressure] = useState('');
  const [humidity, setHumidity] = useState('');
  const [result, setResult] = useState('');

  const checkAirQuality = () => {
    let recommendations = [];

    if (temperature < 20) {
      recommendations.push("Suhu terlalu rendah. Disarankan untuk menggunakan pakaian hangat.");
    } else if (temperature > 25) {
      recommendations.push("Suhu terlalu tinggi. Disarankan untuk tetap terhidrasi dan menghindari aktivitas berat.");
    }

    if (pressure < 30) {
    recommendations.push("Tekanan udara terlalu rendah. Ini bisa menyebabkan ketidaknyamanan. Cobalah untuk tetap tenang dan hindari aktivitas berat.");
    } else if (pressure > 70) {
      recommendations.push("Tekanan udara terlalu tinggi. Bisa menyebabkan sakit kepala atau ketidaknyamanan. Disarankan untuk beristirahat dengan cukup.");
    }

    if (humidity < 40) {
      recommendations.push("Kelembaban terlalu rendah. Disarankan untuk menggunakan pelembap udara.");
    } else if (humidity > 60) {
      recommendations.push("Kelembaban terlalu tinggi. Cobalah untuk mengurangi kelembaban di dalam ruangan dengan menggunakan dehumidifier.");
    }

    if (recommendations.length === 0) {
      setResult("Udara dalam kondisi baik.");
    } else {
      setResult("Udara tidak dalam kondisi baik. " + recommendations.join(' '));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAirQuality();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Cek Kualitas Udara</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Suhu (°C):
          </label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tekanan Udara / Angin (%):
          </label>
          <input
            type="number"
            value={pressure}
            onChange={(e) => setPressure(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kelembaban (%):
          </label>
          <input
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Cek Kualitas Udara
        </button>
      </form>
      {result && (
        <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          {result}
        </div>
      )}
    </div>
  );
}

export default AirQty;
