import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchHotDealWise from '../helpers/fetchHotDealWise';
import displayNARCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Context from '../context';
import likedProduct from '../helpers/likedProduct';

const VerticalHotDealCard = ({ hotDeal, subhotDeal, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();
  const { fetchUserLikedProduct } = useContext(Context);

  const handleLikedProduct = async (e, id) => {
    await likedProduct(e, id);
    fetchUserLikedProduct();
  };

  const fetchData = async () => {
    setLoading(true);
    const hotDealProduct = await fetchHotDealWise(hotDeal);
    setLoading(false);
    setData(hotDealProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="mx-auto px-4 my-2 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-3 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[150px] sm:min-w-[200px] md:min-w-[280px] max-w-[200px] sm:max-w-[260px] md:max-w-[280px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-36 sm:h-48 flex justify-center items-center animate-pulse rounded-t-sm"></div>
                <div className="p-3 grid gap-3">
                  <h2 className="font-medium text-sm sm:text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200 p-2 rounded-full animate-pulse"></h2>
                  <p className="bg-slate-200 p-2 rounded-full animate-pulse"></p>
                  <div className="flex gap-2">
                    <p className="bg-slate-200 w-full p-2 rounded-full animate-pulse"></p>
                    <p className="bg-slate-200 w-full p-2 rounded-full animate-pulse"></p>
                  </div>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={'product/' + product?._id}
                key={index}
                className="w-full min-w-[150px] sm:min-w-[200px] md:min-w-[280px] max-w-[200px] sm:max-w-[260px] md:max-w-[280px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-100 h-36 sm:h-48 flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-3 grid gap-2">
                  <h2 className="font-medium text-sm sm:text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <div className="flex flex-col">
                    <p className="text-slate-500 line-through text-xs sm:text-sm md:text-base">
                      {displayNARCurrency(product?.price)}
                    </p>
                    <p className="text-black text-sm sm:text-base md:text-xl font-medium">
                      {displayNARCurrency(product?.sellingPrice)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalHotDealCard;
