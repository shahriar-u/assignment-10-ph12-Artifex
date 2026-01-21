/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaRegBookmark,
  FaTools,
  FaExpandArrowsAlt,
  FaPalette,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../../AuthProvider/AuthProvider";
import Loading from "../../Components/Loading/Loading";

const ArtworkDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContextAPI);
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [totalAuthorPosts, setTotalAuthorPosts] = useState(0); 

  
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
        setLikeCount(data.likes || 0);

       
        if (data?.userEmail) {
          fetch(`${import.meta.env.VITE_API_URL}/user-total-art/${data.userEmail}`)
            .then((res) => res.json())
            .then((statData) => {
              setTotalAuthorPosts(statData.totalPosts || 0);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("Failed to load artwork details");
      });
  }, [id]);

  
  const handleLike = () => {
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setLikeCount(newLikedStatus ? likeCount + 1 : likeCount - 1);

    fetch(`${import.meta.env.VITE_API_URL}/artwork/like/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ isLiked: newLikedStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (newLikedStatus) {
          toast.success("Added to liked collection!");
        }
      });
  };

  
  const handleFavorite = () => {
    if (!user) {
      return toast.error("Please login to add favorites!");
    }

    const favoriteItem = {
      artworkId: artwork._id,
      userEmail: user?.email,
      title: artwork.title,
      image: artwork.image,
      category: artwork.category,
      price: artwork.price,
    };

    fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(favoriteItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Added to My Favorites!");
        } else {
          toast.error(data.message || "Already in Favorites");
        }
      });
  };

  if (loading) return <Loading />;
  if (!artwork)
    return (
      <div className="text-white text-center py-20 uppercase tracking-widest font-black">
        Masterpiece Not Found!
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 md:px-12 lg:px-24 font-sans">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 group">
            <div className="relative overflow-hidden border border-white/5 bg-[#111111] p-2 shadow-2xl">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-auto object-cover rounded-sm transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1">
                  {artwork.category}
                </span>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-5 space-y-8">
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4 uppercase leading-none">
                {artwork.title}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    className="transition-transform active:scale-150 focus:outline-none"
                  >
                    {isLiked ? (
                      <FaHeart className="text-red-500 text-2xl" />
                    ) : (
                      <FaRegHeart className="text-gray-400 text-2xl hover:text-red-500 transition-colors" />
                    )}
                  </button>
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                    {likeCount} Likes
                  </span>
                </div>
                <div className="text-amber-500 font-serif text-3xl font-bold">
                  ${artwork.price}
                </div>
              </div>
            </div>

            
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-3 underline underline-offset-8 italic">
                The Narrative
              </h3>
              <p className="text-gray-300 leading-relaxed font-light text-lg italic mt-6">
                "{artwork.description}"
              </p>
            </div>

            
            <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-full text-amber-500">
                  <FaTools />
                </div>
                <div>
                  <p className="text-[9px] uppercase text-gray-500 font-black tracking-tighter">
                    Medium
                  </p>
                  <p className="text-sm font-bold">{artwork.medium || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/5 rounded-full text-amber-500">
                  <FaExpandArrowsAlt />
                </div>
                <div>
                  <p className="text-[9px] uppercase text-gray-500 font-black tracking-tighter">
                    Dimensions
                  </p>
                  <p className="text-sm font-bold">
                    {artwork.dimensions || "Original"}
                  </p>
                </div>
              </div>
            </div>

            
            <div className="bg-[#111111] p-6 border border-white/5 rounded-sm relative group overflow-hidden">
              
              <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-amber-500/10 transition-colors duration-500">
                <FaPalette size={100} />
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <img
                    src={
                      artwork.userPhoto || "https://i.ibb.co/mR79Y6B/user.png"
                    }
                    alt={artwork.userName}
                    className="w-16 h-16 rounded-full border-2 border-amber-500 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#111111]"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] uppercase text-gray-500 font-black tracking-widest">
                        Master Artist
                      </p>
                      

                      <Link to={`/artist-details/${artwork.userEmail}`}>
                        <h4 className="text-xl font-bold group-hover:text-amber-500 transition-colors cursor-pointer">
                          {artwork.userName}
                        </h4>
                      </Link>
                    </div>
                    
                    <div className="text-right border-l border-white/10 pl-4">
                      <p className="text-amber-500 text-xl font-black leading-none">
                        {totalAuthorPosts}
                      </p>
                      <p className="text-[8px] uppercase text-gray-500 font-bold tracking-tighter">
                        Artworks
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium tracking-tight mt-1">
                    {artwork.userEmail}
                  </p>
                </div>
              </div>
            </div>

            
            <div className="pt-4">
              <button
                onClick={handleFavorite}
                className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-500 transition-all active:scale-[0.98] shadow-xl"
              >
                <FaRegBookmark /> Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
