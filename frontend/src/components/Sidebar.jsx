
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { serverURL } from "../main";
import {
  setOtherUsers,
  setSelectedUser,
  setUserData,
  clearUnread,
} from "../redux/user.slice";
import { setMessages } from "../redux/messages.slice";

const Sidebar = () => {
  let { userData, otherUsers, selectedUser, onlineUsers, unreadMessages } =
    useSelector((state) => state.user);
  let [input, setInput] = useState("");
  let [searchResults, setSearchResults] = useState([]);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handlelogout = async () => {
    try {
      await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handlesearch = async () => {
    try {
      console.log("SEARCH: Sending request for query:", input);
      let result = await axios.get(
        `${serverURL}/api/user/search?query=${input}`,
        { withCredentials: true }
      );
      console.log("SEARCH: API response received:", result.data);
      setSearchResults(result.data);
    } catch (error) {
      console.error("SEARCH: Error during API call:", error);
    }
  };

  useEffect(() => {
    if (input.trim() !== "") {
      const delayDebounceFn = setTimeout(() => {
        handlesearch();
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
    }
  }, [input]);

  const onlineUsersOnlyList =
    otherUsers?.filter((user) => onlineUsers?.includes(user._id)) || [];

  return (
    <div
      className={`
            lg:w-[350px]
            w-full
            h-full
            bg-gradient-to-br from-gray-900 to-black text-gray-100
            flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out font-inter

            ${selectedUser ? "hidden" : "flex"} 
            lg:flex 
        `}
    >
      
      <div className="p-6 pb-4 bg-gradient-to-br from-gray-950 to-gray-800 shadow-2xl border-b border-gray-700 z-20 flex items-center justify-between flex-shrink-0">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter select-none cursor-pointer hover:text-blue-400 transition-colors duration-200">
          Chat<span className="font-mono text-purple-400">Book</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div
              onClick={() => navigate("/profile")}
              className="relative w-14 h-14 rounded-full overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 ring-2 ring-blue-600 hover:ring-blue-500 flex-shrink-0 group"
            >
              <img
                src={userData.image || dp}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {userData.name?.split(" ")[0] || "Profile"}
              </span>
            </div>
            <span className="text-gray-300 text-sm font-medium mt-1">
              {userData.name || userData.username || "User"}
            </span>
          </div>
          <button
            onClick={handlelogout}
            className="relative flex items-center justify-center p-3 rounded-full bg-gray-800 text-gray-400 border border-gray-700 hover:text-red-400 hover:bg-gray-700 hover:border-red-500 transition-all duration-300 group shadow-md"
          >
            <RiLogoutCircleLine className="w-6 h-6" />
            <span className="absolute bottom-full mb-2 scale-0 group-hover:scale-100 transition-all duration-300 origin-bottom tooltip bg-gray-700 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100">
              Sign Out
            </span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 pt-4 bg-gray-950 border-b border-gray-800 z-10 sticky top-[104px] flex-shrink-0">
        <div className="relative flex items-center bg-gray-800 rounded-xl overflow-hidden shadow-inner text-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
          <FaSearch className="absolute left-4 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search for contacts..."
            className="w-full pl-12 pr-10 py-3 bg-transparent border-0 outline-none text-gray-100 placeholder-gray-500 text-base font-light tracking-wide"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {input.trim() !== "" && (
            <IoClose
              className="absolute right-4 w-6 h-6 text-gray-500 cursor-pointer hover:text-red-400 transition-colors duration-200"
              onClick={() => {
                setInput("");
              }}
            />
          )}
        </div>
      </div>

      {/* Main Content Area: Search Results or Chat List */}
      <div className="flex-grow overflow-y-auto custom-scrollbar px-6 pb-6 pt-4">
        {input.trim() !== "" ? (
          <div className="flex flex-col gap-3">
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-4 py-2 px-4 bg-gray-800 rounded-xl shadow-lg cursor-pointer transform transition-all duration-200 hover:bg-gray-700 hover:-translate-y-0.5 border border-gray-700"
                  onClick={() => {
                    dispatch(setSelectedUser(user));
                    dispatch(setMessages([]));
                    dispatch(clearUnread(user._id));
                    setInput("");
                  }}
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-700">
                    <img
                      src={user.image || dp}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {onlineUsers?.includes(user._id) && (
                      <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-gray-800"></span>
                    )}
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h1 className="font-semibold text-lg text-gray-100 truncate">
                      {user.name || user.username}
                    </h1>
                    <p className="text-sm text-gray-400 italic">Tap to chat</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center text-sm italic mt-12 px-4">
                No users found for "{input}". Try a different name.
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
           
            {onlineUsersOnlyList.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs uppercase text-gray-500 font-bold mb-4 tracking-widest px-1">
                  Online Contacts ({onlineUsersOnlyList.length})
                </h3>
              
                <div className="flex flex-nowrap gap-x-5 overflow-x-auto pb-4 custom-scrollbar">
                  {onlineUsersOnlyList.map((user) => (
                    <div
                      key={user._id}
                     
                      className="relative flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105 group w-14 flex-shrink-0"
                      onClick={() => {
                        dispatch(setMessages([]));
                        dispatch(setSelectedUser(user));
                        dispatch(clearUnread(user._id));
                      }}
                    >
                     
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex justify-center items-center ring-2 ring-green-500 group-hover:ring-green-400 transition-all duration-200 shadow-md">
                        <img
                          src={user.image || dp}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                     
                      <span className="absolute bottom-[-18px] text-xs font-medium text-gray-300 truncate w-full text-center group-hover:text-blue-300 transition-colors duration-200">
                        {user.name.split(" ")[0] || user.username.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-xs uppercase text-gray-500 font-bold mb-4 tracking-widest px-1">
                All Chats ({otherUsers?.length || 0})
              </h3>
              <div className="flex flex-col gap-3">
                {otherUsers?.length > 0 ? (
                  otherUsers.map((user) => (
                    <div
                      key={user._id}
                      className={`flex items-center gap-4 py-2 px-4 rounded-xl shadow-lg cursor-pointer transform transition-all duration-200 ${
                        selectedUser?._id === user._id
                          ? "bg-blue-800 ring-2 ring-blue-600"
                          : "bg-gray-800 hover:bg-gray-700"
                      } hover:-translate-y-0.5 relative border border-gray-700`}
                      onClick={() => {
                        dispatch(setMessages([]));
                        dispatch(setSelectedUser(user));
                        dispatch(clearUnread(user._id));
                      }}
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-700">
                        <img
                          src={user.image || dp}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        {onlineUsers?.includes(user._id) && (
                          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-gray-800"></span>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow overflow-hidden">
                        <h1 className="font-semibold text-lg text-gray-100 truncate">
                          {user.name || user.username}
                        </h1>
                        <p className="text-sm text-gray-400 truncate">
                          Last seen recently
                        </p>
                      </div>
                      {unreadMessages?.[user._id] > 0 && (
                        <span className="flex-shrink-0 ml-auto bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-ping-once">
                          {unreadMessages[user._id]}
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center text-sm italic mt-12 px-4">
                    No other contacts found. Add friends to start chatting!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;