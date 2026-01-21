import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import toast from "react-hot-toast";
import { AuthContextAPI } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [userMenuOpen, setUserMenuOpen] = useState(false); 
  const { user, handelLogOut } = useContext(AuthContextAPI);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    handelLogOut()
      .then(() => toast.success("Successfully logged out"))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Artworks", href: "/explore-artworks" },
  ];

  const privateLinks = [
    { name: "Add Artwork", href: "/add-artwork" },
    { name: "My Gallery", href: "/my-gallery" },
    { name: "My Favorites", href: "/my-favorites" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 px-4 md:py-4 md:px-12 font-serif">
      <div className="container mx-auto flex justify-between items-center">
      
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl md:text-2xl font-black tracking-tighter text-black"
          >
            Artify<span className="text-amber-500">.</span>
          </Link>
        </div>

        
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-6 items-center">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `text-[12px] font-bold uppercase tracking-widest ${
                      isActive
                        ? "text-amber-500"
                        : "text-gray-800 hover:text-amber-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user &&
              privateLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `text-[12px] font-bold uppercase tracking-widest ${
                        isActive
                          ? "text-amber-500"
                          : "text-gray-800 hover:text-amber-600"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>

        
        <div className="flex items-center gap-4 md:gap-6">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-[10px] font-bold uppercase tracking-widest text-gray-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden sm:block bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm"
              >
                Register
              </Link>
            </div>
          ) : (
            
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setUserMenuOpen(!userMenuOpen)} 
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-amber-500 overflow-hidden shadow-sm active:scale-90 transition-transform">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/mR79Y6B/user.png"}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* dropdown  */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full pt-4 z-[60] animate-fadeIn">
                  <div className="bg-white border border-gray-100 shadow-2xl p-4 rounded-sm min-w-[160px] text-center">
                    <p className="text-[11px] font-bold text-gray-800 mb-3 border-b border-gray-50 pb-2 uppercase tracking-wider">
                      {user?.displayName || "Artist"}
                    </p>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden text-2xl text-black focus:outline-none"
            onClick={() => {
              setIsOpen(!isOpen);
              setUserMenuOpen(false); // হ্যামবার্গার খুললে প্রোফাইল মেনু বন্ধ হবে
            }}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 py-6 px-6 flex flex-col gap-5 shadow-2xl animate-fadeIn">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-50 pb-2"
            >
              {link.name}
            </NavLink>
          ))}
          {user &&
            privateLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-50 pb-2"
              >
                {link.name}
              </NavLink>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
