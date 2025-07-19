
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../main.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice.js";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverURL}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setUsername("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error?.response?.data?.message || "Signup failed");
    }
  };

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => setErr(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="z-10 w-full max-w-md px-8 py-10 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-1">
          Create your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 font-extrabold">
            ChatBook
          </span>{" "}
          account
        </h2>
        <p className="text-center text-sm text-white/60 mb-6">
          Start chatting in seconds
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="h-11 px-4 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            className="h-11 px-4 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-11 px-4 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-400 cursor-pointer hover:text-blue-300"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {err && <p className="text-sm text-red-400">* {err}</p>}

          <button
            type="submit"
            disabled={!username || !email || !password || loading}
            className="mt-2 h-11 bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 hover:opacity-90 text-white font-medium rounded-md transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Already have an account?{" "}
          <span
            className="text-blue-400 font-medium cursor-pointer hover:text-blue-300"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
