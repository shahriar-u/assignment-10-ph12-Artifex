import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import ArtGalleryLanding from "../../Components/ArtGalleryLanding/ArtGalleryLanding";
import { Typewriter } from "react-simple-typewriter";
import TypewriterHook from "../../Components/TypewriterHook/TypewriterHook";
import ProductCard from "../../Components/ArtCard/ArtCard";

const Home = () => {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co.com/7JwRYmpX/exhibitions-751576-1920-1.jpg",
      subTitle: "Your New Art World",
      title: "Art Gallery Society Event: Christmas Eve",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/B0SvPyt/post3-home1-1024x440-1.jpg",
      subTitle: "Creative Showcase",
      title: "Experience the Modern Art Exhibition",
    },
    {
      id: 3,
      image:
        "https://i.ibb.co.com/F4YjyqtD/exhibition-1659447-1920-1-1536x806.jpg",
      subTitle: "Join the Community",
      title: "Share Your Masterpiece With Us",
    },
  ];

  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recent-artworks")
      .then((res) => res.json())
      .then((data) => setArtworks(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const [galleryItems, setGalleryItems] = useState([]);

  
  useEffect(() => {
    fetch("/card.json")
      .then((res) => res.json())
      .then((data) => {
        
        setGalleryItems(data);
      })
      .catch((err) => console.error("ডাটা লোড করতে সমস্যা হয়েছে:", err));
  }, []);

  const [creativeTalents, setCreativeTalents] = useState([]);

  useEffect(() => {
    fetch("/artists.json")
      .then((res) => res.json())
      .then((data) => setCreativeTalents(data))
      .catch((err) => console.error("Error loading artists:", err));
  }, []);

  const [socialBuzz, setSocialBuzz] = useState([]);

  useEffect(() => {
    fetch("/highlights.json")
      .then((res) => res.json())
      .then((data) => setSocialBuzz(data))
      .catch((err) => console.error("Error loading highlights:", err));
  }, []);

  return (
    <div className="w-full">
      <section className="h-[75vh] md:h-screen w-full overflow-hidden relative group">
        <Swiper
          effect={"fade"}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          className="mySwiper h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full flex items-center justify-center">
                
                <div
                  className="absolute inset-0 bg-cover bg-center animate-slowZoom"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
                </div>

                
                <div className="container mx-auto px-6 relative z-10 text-white text-center">
                  <div className="max-w-5xl mx-auto">
                    
                    <p className="text-gray-300 font-medium uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] sm:text-xs md:text-lg animate-fadeInUp">
                      {slide.subTitle}
                    </p>

                    
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mt-4 mb-8 leading-tight animate-fadeInUp [animation-delay:0.3s]">
                      {slide.title}
                    </h1>

                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 animate-fadeInUp [animation-delay:0.6s]">
                      <button className="w-full sm:w-auto px-10 py-3 md:py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-500 text-xs md:text-sm font-bold tracking-widest uppercase">
                        Buy Ticket
                      </button>
                      <button className="w-full sm:w-auto px-10 py-3 md:py-4 bg-white text-black border border-white hover:bg-transparent hover:text-white transition-all duration-500 text-xs md:text-sm font-bold tracking-widest uppercase">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

    
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-serif mb-12">
            The MooM with its unique collection is among those museums that
            attracts a wide array of people and is among the rare that have
            residencies.
          </p>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            <div
              className="relative h-64 md:h-96 bg-cover bg-center flex items-center justify-center p-6"
              style={{
                backgroundImage: `url('https://mooseoom.foxthemes.me/wp-content/uploads/2019/10/block2-2.jpg')`, 
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>{" "}
              
              <div className="relative z-10 text-white text-center">
                <h3 className="text-3xl md:text-4xl font-serif mb-6">
                  Buy Tickets Online
                </h3>
                <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm">
                  Buy Ticket
                </button>
              </div>
            </div>

            
            <div
              className="relative h-64 md:h-96 bg-cover bg-center flex items-center justify-center p-6"
              style={{
                backgroundImage: `url('https://mooseoom.foxthemes.me/wp-content/uploads/2019/10/block2-1.jpg')`, 
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>{" "}
              
              <div className="relative z-10 text-white text-center">
                <h3 className="text-3xl md:text-4xl font-serif mb-6">
                  Get Your Discounts
                </h3>
                <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0d0d0d]">
        {" "}
        
        <div className="container mx-auto px-4">
     
          <div className="text-center mb-16">
            <p className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
              Featured Selection
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              Featured
              <TypewriterHook array={[" Artworks"]} />
            </h2>
            <div className="w-16 h-px bg-amber-500 mx-auto mt-6"></div>
          </div>

          {/* art card grid                                                                                                                              */}
          <ProductCard arrayData={artworks || []} />
        </div>
      </section>

      <section className="bg-[#0f0f0f] py-20 px-4">
        <div className="container mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-amber-500 font-medium uppercase tracking-[0.5em] text-xs mb-3">
              Creative Portfolio
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-serif tracking-tight">
              From
              <TypewriterHook array={[" Our Collection"]} />
            </h2>
            <div className="w-20 h-px bg-amber-500 mx-auto mt-6"></div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[280px]">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className={`relative overflow-hidden group shadow-lg transition-all duration-500 border border-white/5 ${item.size}`}
              >
                
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center text-center p-6 backdrop-blur-sm">
                  <span className="text-amber-500 text-[10px] font-bold uppercase mb-2 tracking-[0.2em]">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl font-serif mb-1 uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-6 font-light tracking-widest">
                    Artist: {item.artist}
                  </p>

                  <button className="px-5 py-2 border border-white/30 text-white text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300">
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          <div className="flex justify-center mt-16">
            <button className="px-10 py-3 bg-transparent border border-white/20 text-white hover:border-amber-500 hover:text-amber-500 transition-all duration-500 text-xs tracking-[0.4em] uppercase">
              Browse All Collection
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 px-6">
        <div className="container mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
            <div>
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">
                Weekly Spotlight
              </span>
              <h2 className="text-white text-4xl md:text-5xl font-serif mt-2">
                <TypewriterHook array={[" Top Artists of the Week"]} />
              </h2>
            </div>
            <button className="hidden md:block text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-tighter">
              View All Artists →
            </button>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {creativeTalents.map((artist) => (
              <div key={artist.id} className="group relative">
                
                <div className="relative aspect-4/5 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-4 left-4 w-8 h-8 bg-amber-500 text-black flex items-center justify-center font-bold text-sm rounded-full">
                    #{artist.id}
                  </div>
                </div>

                
                <div className="mt-6 text-center md:text-left">
                  <h3 className="text-white text-xl font-serif tracking-wide group-hover:text-amber-500 transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">
                    {artist.role}
                  </p>
                  <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-white text-sm font-bold">
                      {artist.works}
                    </span>
                    <span className="text-gray-600 text-xs uppercase">
                      Artworks
                    </span>
                  </div>
                </div>

                
                <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <button className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full text-white text-xs hover:bg-amber-500 hover:text-black transition-all">
                    FB
                  </button>
                  <button className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full text-white text-xs hover:bg-amber-500 hover:text-black transition-all">
                    IG
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          <button className="md:hidden w-full mt-10 py-4 border border-white/10 text-gray-400 text-xs uppercase tracking-widest">
            View All Artists
          </button>
        </div>
      </section>

      <section className="bg-[#121212] py-20 px-6 border-t border-white/5">
        <div className="container mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-serif mb-4">
              Community Highlights
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base tracking-wide">
              See what our creative community is talking about. Join the
              conversation and share your thoughts.
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialBuzz.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 hover:border-amber-500/50 transition-all duration-500 group"
              >
                
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {item.tag}
                  </span>
                  <span className="text-gray-600 text-xs">{item.date}</span>
                </div>

                
                <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 italic">
                  "{item.comment}"
                </p>

                
                <div className="flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.user}
                    className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-amber-500 transition-colors"
                  />
                  <div>
                    <h4 className="text-white font-medium tracking-wide">
                      {item.user}
                    </h4>
                    <p className="text-gray-600 text-xs">Community Member</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="mt-16 text-center">
            <button className="bg-white text-black px-10 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-500 transition-all duration-300">
              Join Our Community
            </button>
          </div>
        </div>
      </section>

      <ArtGalleryLanding />
    </div>
  );
};

export default Home;
