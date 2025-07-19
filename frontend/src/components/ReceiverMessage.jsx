
import React, { useEffect, useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";
import ImageModal from "./ImageModal.jsx";

const ReceiverMessage = ({ image, message, createdAt }) => {
  const scroll = useRef();
  const [showModal, setShowModal] = useState(false);
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
   
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]); 

  const handleImagescroll = () => {
    
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={scroll} className="flex items-end gap-2 pr-2">
      
      <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-800 flex justify-center items-center ring-1 ring-gray-700 shadow-lg flex-shrink-0">
        <img
          src={selectedUser?.image || dp}
          alt="Receiver"
          className="w-full h-full object-cover"
        />
      </div>

    
      <div className="flex flex-col gap-1.5 w-fit max-w-md bg-gray-900 border border-gray-700/50 rounded-3xl rounded-tl-none py-2.5 px-4 shadow-message-bubble transform transition-transform duration-200">
        {image && (
          <img
            src={image}
            onLoad={handleImagescroll}
            alt="received-img"
            className="w-full max-w-[180px] h-auto rounded-lg object-cover cursor-pointer border border-gray-600 transition-transform hover:scale-[1.02]"
            onClick={() => setShowModal(true)}
          />
        )}
        {message && (
          <span className="text-gray-100 text-base leading-snug">
            {message}
          </span>
        )}
        <small className="text-gray-400 text-xs font-light self-end">
          {new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>
      </div>

     
      {showModal && (
        <ImageModal imageUrl={image} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ReceiverMessage;