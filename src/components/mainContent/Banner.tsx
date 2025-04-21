import React, { FC } from "react";
import banner1 from './../../assets/homeBanner/banner1.jpeg'
import banner2 from './../../assets/homeBanner/banner2.jpeg'
import bigBanner from './../../assets/homeBanner/bigBanner.jpeg'

interface IProps {};

const Banner: FC<IProps> = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 h-auto md:h-[470px] container mx-auto px-4">
      {/* Main Banner */}
      <div className="flex-1 relative group overflow-hidden rounded-2xl">
        <img 
          src={bigBanner} 
          alt="Main banner" 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-20 left-6 text-white">
          <p className="text-sm md:text-lg font-light mb-2">New Collection</p>
          <h3 className="text-2xl md:text-4xl font-bold">Seasonal Essentials</h3>
          <button className="mt-4 bg-white text-green-500 px-6 py-2 rounded-full text-sm hover:bg-opacity-90 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Side Banners */}
      <div className="flex flex-col gap-4 w-full md:w-1/3">
        <div className="relative group h-1/2 overflow-hidden rounded-2xl">
          <img
            src={banner2}
            alt="Side banner 1"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 text-green-500">
            <p className="text-xs md:text-sm font-light">Limited Offer</p>
            <h3 className="text-lg md:text-xl font-bold">Summer Sale</h3>
            <button className="mt-4 bg-green-500 text-black px-6 py-2 rounded-full text-sm hover:bg-opacity-90 transition">
            Shop Now
          </button>
          </div>
        </div>

        <div className="relative group h-1/2 overflow-hidden rounded-2xl">
          <img
            src={banner1}
            alt="Side banner 2"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p className="text-xs md:text-sm font-light">Trending Now</p>
            <h3 className="text-lg md:text-xl font-bold">Accessories</h3>
            <button className="mt-4 bg-white text-green-500 px-6 py-2 rounded-full text-sm hover:bg-opacity-90 transition">
            Shop Now
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;