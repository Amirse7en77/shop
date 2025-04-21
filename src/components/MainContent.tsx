import React, { FC } from "react";
import banner from "./../assets/Bannar.svg";
import {logos} from './mainContent/logos' 

import PopularCategory from "./PopularCategory";
import Banner from "./mainContent/Banner";
import { useDispatch } from "react-redux";
import InfiniteScroll from "./InfiniteScroll";
import InfiniteScrollComponent from "./InfiniteScrollComponent";

interface IProps {}

const MainContent: FC<IProps> = () => {
  

  return (
    <div className="container mx-auto px-4">
     <Banner/>

      {/* Logo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[50px] ">
        {logos.map((logo, index) => (
          <div 
            key={index}
            className={`border-2 p-6 rounded-lg transition-all hover:shadow-lg hover:-translate-y-1 bg-green-700`}
          >
            <div className="flex flex-col items-center text-center ">
              <img 
                src={logo.logo} 
                alt={logo.header}
                className="w-10 h-10 mb-4 object-contain filter brightness-0 invert"
              />
              <h3 className="text-xl font-semibold mb-2 text-white ">
                {logo.header}
              </h3>
              <p className="text-sm text-white">
                {logo.content}
              </p>
            </div>
          </div>
        ))}
        <div>
           
        </div>
        
      </div>
      <PopularCategory/>
    </div>
  );
};

export default MainContent;