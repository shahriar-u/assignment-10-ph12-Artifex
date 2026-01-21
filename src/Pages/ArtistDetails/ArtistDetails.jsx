import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ArtistDetails = () => {
    const { email } = useParams(); 
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        
        fetch(`${import.meta.env.VITE_API_URL}/artist-details/${email}`)
            .then(res => res.json())
            .then(data => setProfileData(data))
            .catch(err => console.error("Error fetching artist details:", err));
    }, [email]);

    if (!profileData) return <div className="text-center py-20 font-bold text-gray-600">Loading Profile...</div>;


    const { artist, artworks } = profileData;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                
                
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <img 
                            src={artist?.image} 
                            className="w-40 h-40 rounded-full object-cover border-4 border-pink-500 shadow-lg" 
                            alt={artist?.name} 
                        />
                        <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-black text-[#2d3a5e] mb-2">
                            {artist?.name} <span className="text-pink-500">.</span>
                        </h1>
                        <p className="text-gray-500 mb-6 max-w-xl leading-relaxed">
                            {artist?.bio}
                        </p>
                        
                        <div className="flex gap-8 justify-center md:justify-start">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-pink-500">{artist?.totalArtworks}</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Artworks</p>
                            </div>
                            <div className="text-center border-x px-8 border-gray-100">
                                <p className="text-2xl font-bold text-[#2d3a5e]">{artist?.followers}</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Followers</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="bg-[#2d3a5e] text-white px-10 py-3 rounded-xl font-bold hover:bg-pink-500 hover:-translate-y-1 transition-all shadow-lg">
                            Follow Artist
                        </button>
                        <button className="border-2 border-gray-200 text-gray-600 px-10 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
                            Message
                        </button>
                    </div>
                </div>

                
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-[#2d3a5e]">
                        Portfolio <span className="text-pink-500 text-sm">({artworks?.length})</span>
                    </h2>
                    <div className="h-1 flex-1 bg-gray-100 ml-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artworks && artworks.length > 0 ? (
                        artworks.map(art => (
                            <Link to={`/artwork-details/${art?._id}`}>
                            <div key={art?._id} className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 group">
                                <div className="relative overflow-hidden h-72">
                                    <img 
                                        src={art?.image} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        alt={art?.title}
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
                                        <p className="text-pink-500 font-black text-sm">${art?.price}</p>
                                    </div>
                                    {art?.visibility === "Private" && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <span className="bg-white px-3 py-1 rounded text-xs font-bold uppercase tracking-tighter">Private Collection</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-7">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-extrabold text-xl text-[#2d3a5e] group-hover:text-pink-500 transition-colors">
                                            {art?.title}
                                        </h4>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{art?.description}</p>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 bg-gray-50 px-2 py-1 rounded">
                                            {art?.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                                            <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                            </svg>
                                            {art?.likes || 0}
                                        </div>
                                    </div>
                                </div>
                            </div></Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                            <p className="text-gray-400 font-medium text-lg">No artworks found for this artist.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtistDetails;