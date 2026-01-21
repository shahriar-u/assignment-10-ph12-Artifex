/** @format */

import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContextAPI } from "../../AuthProvider/AuthProvider";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";

const MyGallery = () => {
  const { user } = useContext(AuthContextAPI);
  const [myArtworks, setMyArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/my-gallery/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyArtworks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this masterpiece!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b", // amber-500
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#111",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/artwork/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = myArtworks.filter((art) => art._id !== id);
              setMyArtworks(remaining);
              Swal.fire({
                title: "Deleted!",
                text: "Your artwork has been removed.",
                icon: "success",
                background: "#111",
                color: "#fff",
              });
            }
          });
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 md:px-12 font-sans">
      <div className="container mx-auto">
        
        <div className="mb-12 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-serif font-black text-white tracking-tight uppercase text-center md:text-left">
              MY <span className="text-amber-500">GALLERY</span>
            </h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-2 text-center md:text-left">
              Manage your personal collection and masterpieces
            </p>
          </div>
          <Link
            to="/add-artwork"
            className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-colors shadow-lg"
          >
            + Add New Artwork
          </Link>
        </div>

        
        <div className="overflow-x-auto bg-[#111111] border border-white/5 rounded-sm shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 uppercase text-[10px] tracking-[0.2em] font-black bg-black/40">
                <th className="p-6">Artwork</th>
                <th className="p-6">Category</th>
                <th className="p-6">Price</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {myArtworks.map((art) => (
                <tr key={art._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-14 h-14 object-cover rounded-sm border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <span className="text-white font-bold tracking-wide uppercase text-sm">
                        {art.title}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    {art.category}
                  </td>
                  <td className="p-6 text-amber-500 font-black">${art.price}</td>
                  <td className="p-6">
                    <span
                      className={`text-[9px] uppercase font-black px-3 py-1 border ${
                        art.visibility === "Public"
                          ? "border-green-500/50 text-green-500 bg-green-500/5"
                          : "border-red-500/50 text-red-500 bg-red-500/5"
                      }`}
                    >
                      {art.visibility}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/artwork-details/${art._id}`}
                        className="p-3 bg-white/5 text-gray-400 hover:text-white transition-colors"
                        title="View"
                      >
                        <FaEye size={14} />
                      </Link>
                      <Link
                        to={`/update-artwork/${art._id}`}
                        className="p-3 bg-white/5 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(art._id)}
                        className="p-3 bg-white/5 text-red-500 hover:bg-red-600 hover:text-white transition-all"
                        title="Delete"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {myArtworks.length === 0 && (
            <div className="text-center py-20 bg-black/20">
              <p className="text-gray-600 uppercase tracking-[0.4em] text-xs font-bold">
                No artwork found in your gallery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGallery;