import React, { useState } from 'react';

const Navbar = ({ onNavItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (componentName) => {
    onNavItemClick(componentName);
    setIsOpen(false);  // Tutup menu saat mobile view
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <a href="#" className="hover:text-gray-300">ToolsKU</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => handleNavClick('CekResi')}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            Cek Resi
          </button>
          <button
            onClick={() => handleNavClick('QRCodeGenerator')}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            QR Code Generator
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 bg-blue-600">
          <button
            onClick={() => handleNavClick('CekResi')}
            className="block text-white py-2 px-4 hover:bg-blue-700 w-full text-left focus:outline-none"
          >
            Cek Resi
          </button>
          <button
            onClick={() => handleNavClick('QRCodeGenerator')}
            className="block text-white py-2 px-4 hover:bg-blue-700 w-full text-left focus:outline-none"
          >
            QR Code Generator
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
