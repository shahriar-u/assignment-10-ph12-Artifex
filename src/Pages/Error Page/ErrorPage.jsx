import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-20">
      <div className="container mx-auto text-center">
        
        <div className="relative inline-block mb-8">
          <h1 className="text-[120px] md:text-[200px] font-serif font-black text-white/5 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-64 md:w-64 md:h-80 border-2 border-amber-500/30 relative flex items-center justify-center group">
              
              <div className="absolute inset-2 border border-amber-500/10"></div>
              <span className="text-amber-500 font-serif italic text-xl md:text-2xl tracking-widest animate-pulse">
                Lost in Art
              </span>
            </div>
          </div>
        </div>

        
        <div className="max-w-2xl mx-auto mt-10">
          <h2 className="text-white text-3xl md:text-5xl font-serif mb-6 italic">
            Frame Not Found
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-12 tracking-wide font-sans">
            The masterpiece you are looking for has been moved or doesn't exist
            in our current collection. Perhaps it's time to head back to the
            main gallery.
          </p>

          
          <Link to="/">
            <button className="px-12 py-4 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-500 uppercase tracking-[0.4em] font-bold text-xs">
              Return to Gallery
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
