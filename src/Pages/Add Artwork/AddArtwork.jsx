/** @format */

import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";

const AddArtwork = () => {
  const { user } = useContext(AuthContextAPI);

  
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 

    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const medium = form.medium.value;
    const dimensions = form.dimensions.value;
    const price = form.price.value;
    const visibility = form.visibility.value;
    const description = form.description.value;
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userPhoto = user?.photoURL;

    const artworkData = {
      title,
      image,
      category,
      medium,
      dimensions,
      price: parseFloat(price) || 0, // নাম্বার হিসেবে সেভ করা
      visibility,
      description,
      userName,
      userEmail,
      userPhoto,
      likes: 0,
      createdAt: new Date(),
    };

    // সার্ভারে ডাটা পাঠানো
    fetch("http://localhost:3000/add-artwork", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(artworkData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId) {
          toast.success("Artwork added successfully!");
          form.reset();
        }
      })
      .catch((error) => {
        setLoading(false); 
        toast.error("Something went wrong. Please try again.");
        console.error("Error:", error);
      });
  };



  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto bg-[#111111] border border-white/5 p-8 md:p-12 rounded-sm shadow-2xl">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
            Add New <span className="text-amber-500">Artwork</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-medium">
            Share your masterpiece with the art world
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                Artwork Title
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Ex: Midnight Serenade"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all placeholder:text-gray-700"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                required
                placeholder="https://i.ibb.co/artwork.jpg"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all placeholder:text-gray-700"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all"
              >
                <option value="Painting">Painting</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Photography">Photography</option>
                <option value="Drawing">Drawing</option>
              </select>
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                Medium / Tools
              </label>
              <input
                type="text"
                name="medium"
                required
                placeholder="Ex: Oil on Canvas, Procreate"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all placeholder:text-gray-700"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                Dimensions
              </label>
              <input
                type="text"
                name="dimensions"
                placeholder="Ex: 24 x 36 inches"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all placeholder:text-gray-700"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                placeholder="Ex: 250"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all placeholder:text-gray-700"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                Visibility
              </label>
              <select
                name="visibility"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-amber-500/50 uppercase tracking-[0.2em] mb-2">
                Artist (Locked)
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full bg-black/40 border border-white/5 text-gray-600 p-3 rounded-sm cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-amber-500/50 uppercase tracking-[0.2em] mb-2">
                Artist (Locked)
              </label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="w-full bg-black/40 border border-white/5 text-gray-600 p-3 rounded-sm cursor-not-allowed outline-none"
              />
            </div>

            
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                Artwork Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                placeholder="Tell the story behind this piece..."
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all resize-none placeholder:text-gray-700"
              ></textarea>
            </div>
          </div>

          
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-sm flex items-center justify-center gap-3 ${
                loading
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-white text-black active:scale-[0.98] shadow-lg shadow-amber-500/10"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                "Post Masterpiece"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtwork;
