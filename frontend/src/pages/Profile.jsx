
import React, { useRef, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../main";
import { setUserData } from "../redux/user.slice";
import axios from "axios";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(userData.name || "");
  const [frontendimage, setFrontendimage] = useState(userData.image || dp);
  const [backendimage, setBackendimage] = useState(null);
  const [saving, setSaving] = useState(false);

  const image = useRef();

  const handleimage = (e) => {
    const file = e.target.files[0];
    setBackendimage(file);
    setFrontendimage(URL.createObjectURL(file));
  };

  const handleprofile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (backendimage) {
        formData.append("image", backendimage);
      }

      const result = await axios.put(
        `${serverURL}/api/user/profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(setUserData(result.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />


      <div
        className="fixed top-8 left-8 z-20 group cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
          <IoHomeOutline className="text-white text-[28px] group-hover:text-cyan-400 transition-colors duration-300" />
        </div>
      </div>

      <div className="z-10 w-full max-w-lg px-8 py-10 bg-[#0d1a2d]/70 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] text-white flex flex-col items-center gap-6">
        <h2 className="text-4xl font-semibold tracking-wide text-center">
          Edit Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 font-extrabold">
            Profile
          </span>
        </h2>

        
        <div
          className="relative rounded-full border-4 border-cyan-400 shadow-md cursor-pointer hover:scale-105 transition"
          onClick={() => image.current.click()}
        >
          <div className="w-40 h-40 overflow-hidden rounded-full">
            <img
              src={frontendimage}
              alt="profile"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
            <MdOutlineCameraAlt className="text-gray-800 text-lg" />
          </div>
        </div>

       
        <input
          type="file"
          accept="image/*"
          ref={image}
          onChange={handleimage}
          hidden
        />

       
        <form
          onSubmit={handleprofile}
          className="w-full flex flex-col gap-5 items-center"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full h-12 px-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
          />

          <input
            type="text"
            readOnly
            value={userData?.username}
            className="w-full h-12 px-4 rounded-xl bg-white/10 text-white/60 border border-white/10"
            placeholder="username"
          />

          <input
            type="email"
            readOnly
            value={userData?.email}
            className="w-full h-12 px-4 rounded-xl bg-white/10 text-white/60 border border-white/10"
            placeholder="email"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 mt-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-600 text-white font-semibold rounded-xl text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
