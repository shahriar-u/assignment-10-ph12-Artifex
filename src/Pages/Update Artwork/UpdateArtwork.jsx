/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContextAPI } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";

const UpdateArtwork = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContextAPI);
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artwork:", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      title: form.title.value,
      image: form.image.value,
      category: form.category.value,
      medium: form.medium.value,
      dimensions: form.dimensions.value,
      price: form.price.value,
      visibility: form.visibility.value,
      description: form.description.value,
    };

    
    fetch(`${import.meta.env.VITE_API_URL}/update-artwork/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Masterpiece Updated Successfully!", {
            style: { borderRadius: "2px", background: "#333", color: "#fff" },
          });
          navigate("/my-gallery"); 
        } else {
          toast.error("No changes made.");
        }
      })
      .catch((err) => {
        console.error("Update Error:", err);
        toast.error("Failed to update artwork");
      });
  };

  if (loading) return <Loading />;
  if (!artwork)
    return (
      <div className="text-white text-center py-20 uppercase tracking-widest">
        Artwork not found!
      </div>
    );

  return (
    <div className="min-h-screen py-12 px-4 bg-[#0a0a0a] font-sans">
      <div className="max-w-4xl mx-auto bg-[#111111] border border-white/5 p-8 md:p-12 rounded-sm shadow-2xl">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight uppercase">
            Update <span className="text-amber-500">Masterpiece</span>
          </h2>
          <p className="text-gray-500 mt-2 text-[10px] uppercase tracking-[0.4em] font-bold">
            Modify the details of: {artwork.title}
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={artwork.title}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={artwork.image}
                required
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none transition-all"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                Category
              </label>
              <select
                name="category"
                defaultValue={artwork.category}
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none"
              >
                <option value="Painting">Painting</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Photography">Photography</option>
              </select>
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                Medium / Tools
              </label>
              <input
                type="text"
                name="medium"
                defaultValue={artwork.medium}
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                Dimensions
              </label>
              <input
                type="text"
                name="dimensions"
                defaultValue={artwork.dimensions}
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                defaultValue={artwork.price}
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none"
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                Visibility
              </label>
              <select
                name="visibility"
                defaultValue={artwork.visibility}
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={artwork.description}
                rows="4"
                className="w-full bg-[#1a1a1a] border border-white/10 text-white p-3 rounded-sm focus:border-amber-500 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-white text-black font-black py-4 rounded-sm uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateArtwork;
