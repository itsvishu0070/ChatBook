import React, { useEffect, useRef, useState } from "react";
import { serverURL } from "../main.jsx";
import { IoReturnUpBack, IoClose } from "react-icons/io5";
import dp from "../assets/dp.webp";
import useGetMessages from "../customHooks/GetMessages.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, incrementUnread } from "../redux/user.slice";
import { BsEmojiGrin, BsImage } from "react-icons/bs";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage.jsx"; 
import ReceiverMessage from "./ReceiverMessage.jsx"; 
import axios from "axios";
import { setMessages } from "../redux/messages.slice.js";
import ImageModal from "./ImageModal.jsx";

const MessageArea = () => {
  useGetMessages();
  const { selectedUser, userData, socket, onlineUsers } = useSelector(
    (state) => state.user
  );
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const image = useRef(); 
  const messagesEndRef = useRef(null); 

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim() && !backendImage) {
      return;
    }

    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.post(
        `${serverURL}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

     
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
      
      setShowPicker(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onEmojiClick = (emojiData) => {
   
    setInput((prevInput) => prevInput + emojiData.emoji);
  };

  const handleImage = (e) => {
   
    const file = e?.target?.files?.[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
     
      setShowPicker(false);
    }
  };

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); 
  useEffect(() => {
    socket?.on("newMessage", (mess) => {
      if (mess.sender === selectedUser?._id) {
        dispatch(setMessages([...messages, mess])); 
      } else {
        dispatch(incrementUnread(mess.sender));
      }
    });

    return () => socket?.off("newMessage");
  }, [messages, selectedUser]); 

  return (
    <div
      className={`flex-grow ${
        selectedUser ? "flex" : "hidden"
      } lg:flex flex-col relative h-full bg-gradient-to-br from-gray-950 to-black text-gray-100 font-inter overflow-hidden`}
    >
      {selectedUser ? (
        <>
         
          <div className="w-full h-[80px] backdrop-blur-xl bg-white/5 shadow-3xl border-b border-gray-800 flex items-center px-8 gap-5 flex-shrink-0 z-10">
            <IoReturnUpBack
              onClick={() => dispatch(setSelectedUser(null))}
              className="text-gray-300 hover:text-white transition-colors text-3xl cursor-pointer"
            />
            <div className="relative w-14 h-14 rounded-full bg-gray-800 flex justify-center items-center ring-2 ring-blue-700 shadow-lg cursor-pointer transition-transform hover:scale-105">
              <img
                src={selectedUser?.image || dp}
                alt="Selected User Profile"
                className="w-full h-full object-cover rounded-full"
                onClick={() => setShowModal(true)}
              />
              {onlineUsers?.includes(selectedUser?._id) && (
                <span className="w-4 h-4 rounded-full bg-green-500 absolute bottom-1 right-1 border-2 border-gray-950"></span>
              )}
            </div>
            <h1 className="font-semibold text-2xl text-white tracking-wide">
              {selectedUser?.name || selectedUser?.username || "User"}
            </h1>
          </div>

         
          <div className="flex-grow overflow-y-auto custom-scrollbar bg-gradient-to-b from-gray-950 to-black p-6 flex flex-col gap-4">
            {messages &&
              messages.map((mess) =>
               
                mess.sender === userData._id ? (
                  <SenderMessage
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                    createdAt={mess.createdAt} 
                  />
                ) : (
                  <ReceiverMessage
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                    createdAt={mess.createdAt} 
                  />
                )
              )}
            <div ref={messagesEndRef} />
          </div>

        
          <div
            onClick={() => {
              if (showPicker) setShowPicker(false);
              if (frontendImage) setFrontendImage(null);
            }}
            className="w-full py-4 px-6 bg-transparent flex flex-col items-center flex-shrink-0 relative"
          >
            {showPicker && (
              <div className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-full max-w-sm">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width={320}
                  height={380}
                  theme="dark"
                  searchDisabled
                  skinTonesDisabled
                  previewConfig={{ showPreview: false }}
                  className="shadow-3xl rounded-2xl border border-gray-700/50 backdrop-blur-md bg-gray-900/70"
                />
              </div>
            )}

            {frontendImage && (
              <div className="relative w-40 h-40 mb-8 rounded-2xl shadow-xl border-2 border-gray-600 overflow-hidden transform transition-transform duration-200 hover:scale-105">
                <img
                  src={frontendImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setFrontendImage(null);
                    setBackendImage(null);
                  }}
                  className="absolute top-2 right-2 bg-red-700/80 text-white rounded-full p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-800"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              </div>
            )}

            <form
              className="w-full max-w-4xl h-[64px] backdrop-blur-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-full shadow-input-bar-glow border border-gray-700/30 flex items-center gap-4 px-6
                         focus-within:border-blue-600/60 transition-all duration-300 ease-in-out relative overflow-hidden"
              onSubmit={handleSendMessage}
            >
           
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 animate-fade-in-out-light-left"></div>
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-purple-500/10 to-transparent opacity-0 animate-fade-in-out-light-right"></div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 transition-opacity duration-500 focus-within:opacity-100 hover:opacity-100 animate-pulse-border"></div>

            
              <div className="flex items-center gap-4 relative z-10">
                <button
                  type="button"
                  onClick={() => setShowPicker((prev) => !prev)}
                  className="text-gray-300 hover:text-blue-300 transition-colors text-2xl cursor-pointer p-2 rounded-full hover:bg-white/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <BsEmojiGrin />
                </button>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={image} 
                  onChange={handleImage}
                />
                <button
                  type="button"
                  onClick={() => image.current.click()} 
                  className="text-gray-300 hover:text-purple-300 transition-colors text-2xl cursor-pointer p-2 rounded-full hover:bg-white/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <BsImage />
                </button>
              </div>

             
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="flex-grow h-full bg-transparent outline-none border-0 text-lg text-white placeholder-gray-400 font-light tracking-wide placeholder:font-light focus:placeholder:text-gray-300 relative z-10"
                placeholder="Send a message..."
              />

           
              <button
                type="submit"
               
                disabled={!input.trim() && !backendImage}
                className="relative z-10 p-2 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-send-orb transition-all duration-300
                           hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed
                           flex items-center justify-center transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
              >
                <RiSendPlane2Fill className="w-6 h-6" />
              </button>
            </form>
          </div>
        </>
      ) : (
       
        <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-950 to-black text-gray-200 p-8 text-center relative overflow-hidden">
        
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-transparent animate-pulse-fast"></div>

         
          <div className="mb-12 p-10 bg-gradient-to-br from-blue-700 to-purple-800 rounded-full shadow-5xl transform hover:scale-105 transition-transform duration-500 ease-in-out relative z-10 group">
            <svg
              className="w-36 h-36 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-0.9 2-2V4C22 2.9 21.1 2 20 2zM6 9h12v2H6V9zm8 4H6v-2h8v2zm4 0h-2v-2h2v2z" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-once"></div>
          </div>

          
          <h1 className="text-gray-200 font-light text-5xl sm:text-5xl mb-6 animate-fade-in relative z-10">
            Welcome to
          </h1>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 font-extrabold text-9xl sm:text-[8rem] tracking-tight mb-10 animate-slide-up relative z-10">
            ChatBook
          </span>
          <p className="text-gray-300 font-light text-2xl sm:text-3xl mt-6 px-8 max-w-4xl leading-relaxed animate-fade-in-delay relative z-10">
            Where meaningful moments meet effortless connection.
          </p>
        </div>
      )}

    
      {showModal && (
        <ImageModal
          imageUrl={selectedUser?.image || dp}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MessageArea;