/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEye, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../../AuthProvider/AuthProvider";
import Loading from "../../Components/Loading/Loading";

const MyFavorites = () => {
  const { user } = useContext(AuthContextAPI);
  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/favorites/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setFavoriteArtworks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  
  const handleRemoveFavorite = (id) => {
    
    if (
      window.confirm("Are you sure you want to remove this from favorites?")
    ) {
      fetch(`http://localhost:3000/favorites/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            
            const remaining = favoriteArtworks.filter((art) => art._id !== id);
            setFavoriteArtworks(remaining);
            toast.error("Removed from favorites", {
              style: {
                borderRadius: "2px",
                background: "#333",
                color: "#fff",
              },
            });
          }
        });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 md:px-12 lg:px-24 text-white font-sans">
      <div className="container mx-auto">
        
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-serif font-black tracking-tight mb-4 uppercase">
            My <span className="text-amber-500">Favorites</span>
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] font-bold">
            Your personal curated collection
          </p>
        </div>

        
        {favoriteArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteArtworks.map((art) => (
              <div
                key={art._id}
                className="group relative bg-[#111111] border border-white/5 p-3 transition-all duration-500 hover:border-amber-500/30 shadow-2xl"
              >
                
                <div className="relative h-72 overflow-hidden mb-5">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />

                  
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-5">
                    <Link
                      to={`/artwork-details/${art.artworkId}`} 
                      className="p-4 bg-white text-black rounded-full hover:bg-amber-500 transition-all transform hover:scale-110 shadow-xl"
                      title="View Details"
                    >
                      <FaEye size={18} />
                    </Link>
                    <button
                      onClick={() => handleRemoveFavorite(art._id)} 
                      className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all transform hover:scale-110 shadow-xl"
                      title="Remove from Favorites"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>

                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 backdrop-blur-sm text-amber-500 text-[8px] font-black uppercase tracking-widest px-3 py-1 border border-white/10">
                      {art.category}
                    </span>
                  </div>
                </div>

                
                <div className="text-center pb-3">
                  <h3 className="text-lg font-serif font-bold tracking-wide mb-1 group-hover:text-amber-500 transition-colors uppercase truncate">
                    {art.title}
                  </h3>
                  <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">
                    Price: ${art.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-sm bg-[#111111]/30">
            <div className="relative mb-6">
              <FaHeart className="text-6xl text-gray-800" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-0.5 bg-gray-600 rotate-45"></div>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-500 uppercase tracking-widest mb-4">
              Collection is Empty
            </h3>
            <Link
              to="/explore-artworks"
              className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all"
            >
              Discover Artworks
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
