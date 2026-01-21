import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContextAPI } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { handelSingInWithEmail, handelSingInWithGoogle } = useContext(AuthContextAPI);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null);
    const password = e.target.password.value;

    handelSingInWithEmail(email, password)
      .then(() => {
        showSuccessAlert();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.code === "auth/invalid-credential" ? "Invalid email or password." : err.message);
      });
  };

  const handleGoogleLogin = () => {
    handelSingInWithGoogle()
      .then(() => {
        showSuccessAlert();
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Welcome Back!",
      text: "Successfully signed in",
      showConfirmButton: false,
      timer: 1500,
      background: "#161616", 
      color: "#fff",
      iconColor: "#f59e0b" 
    });
  };

  return (
    <div className="py-10 flex items-center justify-center bg-[#0a0a0a] px-4 font-serif">
      <div className="w-full max-w-md bg-[#161616] rounded-sm shadow-2xl p-10 border border-white/5">
        <div className="text-center mb-8">
          <h2 className=" text-3xl font-serif text-white">Login Now<span className="text-amber-500">.</span></h2>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-[0.2em]">Welcome back to Artify</p>
        </div>

        <form className="space-y-6" onSubmit={handleSignIn}>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 bg-black border border-white/10 rounded-sm focus:border-amber-500/50 text-white outline-none transition-all font-sans text-sm"
            />
          </div>

          
          <div className="space-y-2 relative">
            <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest ml-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-5 py-3 bg-black border border-white/10 rounded-sm focus:border-amber-500/50 text-white outline-none transition-all font-sans text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-[42px] text-gray-500 font-bold text-[10px] hover:text-amber-500 transition-colors tracking-tighter"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          
          <div className="flex justify-between items-center px-1">
            <div className="min-h-[1rem]">
                {error && <p className="text-[10px] text-red-500 font-bold italic tracking-tight">{error}</p>}
            </div>
          
          </div>

          
          <button type="submit" className="w-full bg-amber-500 text-black py-4 rounded-sm font-bold uppercase tracking-[0.3em] text-xs hover:bg-white transition-all duration-300 shadow-lg active:scale-95">
            SIGN IN
          </button>
        </form>

        
        <div className="relative flex py-8 items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-gray-700 font-bold text-[10px] uppercase tracking-widest">OR</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        
        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-transparent border border-white/10 py-4 rounded-sm font-bold text-xs uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
          Continue with Google
        </button>

        
        <p className="text-xs text-center mt-8 text-gray-600 tracking-wide">
          Don't have an account? <Link to="/signup" className="text-amber-500 font-bold hover:underline ml-1 uppercase">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;