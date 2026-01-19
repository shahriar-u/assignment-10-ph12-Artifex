/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaEye, FaSearch } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import ArtCard from "../../Components/ArtCard/ArtCard";
import ProductCard from "../../Components/ArtCard/ArtCard";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  
  const loadData = (search = "") => {
  
    fetch(`http://localhost:3000/all-artworks?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  
  useEffect(() => {
    loadData(searchText);
  }, [searchText]); 

  
  const handleSearch = () => {
    loadData(searchText);
  };

  
  if (loading && artworks.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto">
        
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-black text-white tracking-tighter mb-4">
            EXPLORE <span className="text-amber-500">ARTWORKS</span>
          </h2>
          <p className="text-gray-400 text-xs uppercase tracking-[0.4em] font-medium">
            Discover masterpieces from around the globe
          </p>
        </div>

        
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <input
              type="text"
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)} 
              placeholder="Search by title or artist..."
              className="w-full bg-[#111111] border border-white/10 text-white py-4 px-6 pr-12 rounded-sm focus:border-amber-500 outline-none transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-amber-500 transition-colors"
            >
              <FaSearch />
            </button>
          </div>
         
        </div>

    

          {/* art word grid  */}
          <ProductCard arrayData={artworks || []}/>
        
      </div>
    </div>
  );
};

export default ExploreArtworks;