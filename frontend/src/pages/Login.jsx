
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import { useDispatch } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/user.slice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverURL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      dispatch(setSelectedUser(null));
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error.response?.data?.message || "Login failed");
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
      className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="z-10 w-full max-w-md p-8 bg-[#0d1a2d]/60 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.4)] text-white">
        <h2 className="text-4xl font-semibold text-center mb-2 tracking-wider text-white drop-shadow-md">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 font-extrabold">
            ChatBook
          </span>
        </h2>
        <p className="text-center text-white/60 text-sm mb-8">
          Log in to your account
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full h-12 px-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 px-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-sm cursor-pointer text-cyan-300 hover:text-cyan-100 transition"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {err && <p className="text-red-400 text-sm mt-1">* {err}</p>}

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 hover:from-blue-300 hover:via-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Don’t have an account?{" "}
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 font-medium cursor-pointer hover:brightness-110"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
