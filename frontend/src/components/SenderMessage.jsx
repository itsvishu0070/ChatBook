
import React, { useRef, useEffect, useState } from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";
import ImageModal from "./ImageModal.jsx";

const SenderMessage = ({ image, message, createdAt }) => {
  const scroll = useRef();
  const { userData } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
   
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]); 

  return (
    <>
      <div ref={scroll} className="flex justify-end items-end gap-2 pl-2">
        {" "}
       
        <div className="relative w-fit max-w-md bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl rounded-tr-none py-2.5 px-4 shadow-message-sender flex flex-col gap-1.5 transform transition-transform duration-200">
          {" "}
         
          {image && (
            <img
              src={image}
              alt="sent-img"
              className="w-full max-w-[180px] h-auto rounded-lg object-cover cursor-pointer border border-gray-600 transition-transform hover:scale-[1.02]" 
              onClick={() => setShowModal(true)}
            />
          )}
          {message && (
            <span className="text-white text-base leading-snug">{message}</span>
          )}{" "}
          
          <small className="text-gray-300 text-xs font-light self-end">
            {" "}
           
            {new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </div>
        
        <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-800 ring-1 ring-gray-700 flex justify-center items-center shadow-lg flex-shrink-0">
          {" "}
         
          <img
            src={userData.image || dp}
            alt="sender-dp"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {showModal && (
        <ImageModal imageUrl={image} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default SenderMessage;