import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">
          &copy; 2024 ToolsKU. All rights reserved.
        </p>
        <p className="text-sm">
          Contact Me: <a href="mailto:pancavickry@gmail.com" className="underline hover:text-gray-400">pancavickry@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
