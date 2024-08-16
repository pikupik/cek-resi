import React, { useState } from 'react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerate = () => {
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=200x200`);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text to generate QR code"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <button 
        onClick={handleGenerate} 
        className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Generate QR Code
      </button>
      {qrCode && (
        <div className="mt-4 flex justify-center">
          <img src={qrCode} alt="Generated QR Code" className="w-52 h-52 object-cover"/>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
