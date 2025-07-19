

import React from "react";
import { IoClose } from "react-icons/io5"; 

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
      {" "}
     
      <div className="backdrop-blur-lg bg-gray-900/80 p-6 rounded-2xl max-w-full max-h-full relative shadow-modal border border-gray-700/50 transform scale-95 animate-scale-in">
        {" "}
       
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors text-3xl cursor-pointer p-1 rounded-full hover:bg-white/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500/50" 
        >
          <IoClose className="w-7 h-7" />
        </button>
       
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-full max-h-[80vh] object-contain rounded-lg border border-gray-700 shadow-xl mb-4" 
        />
      </div>
    </div>
  );
};

export default ImageModal;


