import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';
import image1 from '../assets/banner/phone.jpg';
import image2 from '../assets/banner/phonea.jpg';
import image3 from '../assets/banner/i1.jpg';
import image4 from '../assets/banner/phoneb.jpg';
import image5 from '../assets/banner/i2.jpg';
import image6 from '../assets/banner/i3.jpg';



import image1Mobile from '../assets/banner/callforvendor.jpg';
import image2Mobile from '../assets/banner/p1.jpg';
import image3Mobile from '../assets/banner/p2.jpg';
import image4Mobile from '../assets/banner/p3.jpg';
import image5Mobile from '../assets/banner/im1.jpg';
import image6Mobile from '../assets/banner/im2.jpg';
import image7Mobile from '../assets/banner/im3.jpg';






const BannerProduct = () => {
  const [currrentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1,image2,image3,image4,image5,image6,image6];

  const mobileImages = [image1Mobile, image2Mobile, image3Mobile,image4Mobile,image5Mobile,image6Mobile,image7Mobile];

  const nextImage = () => {
    if (desktopImages.length - 1 > currrentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const previousImage = () => {
    if (currrentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currrentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currrentImage]);

  return (
    <div className="px-2 lg:mt-[120px] mt-[95px] rounded-md">
      <div className="h-[160px] sm:h-56 md:h-72 w-full bg-slate-200 rounded-2xl relative">
        <div className="absolute z-10 w-full h-full md:flex  items-center hidden">
          <div className="flex justify-between w-full text-2xl ">
            <button onClick={previousImage} className="bg-white shadow-md rounded-md">
              <FaAngleLeft />
            </button>
            <button onClick={nextImage} className="bg-white shadow-md rounded-md">
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop and Tablet Version */}
        <div className="hidden md:flex h-full w-full p-1 overflow-hidden rounded-lg">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className="h-full w-full min-w-full min-h-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currrentImage * 100}%)` }}
              >
                <img src={imageURL} className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* Mobile Version */}
        <div className="flex h-[160px] rounded-2xl w-full p-1 overflow-hidden md:hidden">
          {mobileImages.map((imageURL, index) => {
            return (
              <div
                className="h-[160px] w-full min-w-full rounded-2xl min-h-[100px] transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currrentImage * 100}%)` }}
              >
                <img src={imageURL} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
