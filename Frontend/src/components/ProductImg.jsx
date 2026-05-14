import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images[0].url);
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 w-full">

  {/* Thumbnail Images */}
  <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">

    {images.map((items, idx) => {
      return (
        <img
          key={idx}
          onClick={() => setMainImg(items.url)}
          className="w-20 h-20 object-cover cursor-pointer
          rounded-xl border border-slate-700
          bg-slate-900 p-1
          transition-all duration-300
          hover:border-cyan-400 hover:scale-105
          shadow-md shrink-0"
          src={items.url}
          alt=""
        />
      );
    })}

  </div>

  {/* Main Image */}
  <div
    className="bg-slate-900 border border-slate-800
    rounded-2xl p-4 shadow-xl w-full"
  >
    <Zoom>
      <img
        src={mainImg}
        alt="MainImage"
        className="w-full max-w-[500px] mx-auto object-contain"
      />
    </Zoom>
  </div>

</div>
  );
};

export default ProductImg;
