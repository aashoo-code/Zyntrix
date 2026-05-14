import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white py-12 md:py-20 min-h-[650px] flex items-center">
  <div className="max-w-7xl mx-auto px-4 w-full">
    
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

      {/* Text Content */}
      <div className="text-center md:text-left flex-1">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Latest Electronics at Best Prices
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8 text-slate-400">
          Discover cutting-edge technology with unbeatable deals on
          smartphones, laptops and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
  
  <Button
    onClick={() =>
      navigate("/product/69c777a3b6eba8bae197631b")
    }
    className="
    bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800
    hover:from-slate-900 hover:via-slate-800 hover:to-slate-700
    text-cyan-400
    border border-cyan-500/40 cursor-pointer
    shadow-lg shadow-cyan-500/10
    hover:shadow-cyan-500/20
    transition-all duration-300
    hover:scale-[1.03]
    rounded-xl
    "
  >
    Shop Now
  </Button>

  <Button
    onClick={() => navigate("/product")}
    className="
    bg-transparent
    border border-cyan-500/50
    text-cyan-400

    hover:bg-gradient-to-br
    hover:from-slate-950
    hover:via-slate-900
    hover:to-slate-800
 cursor-pointer
    hover:text-cyan-300
    hover:border-cyan-400

    shadow-md shadow-cyan-500/5
    hover:shadow-cyan-500/20

    transition-all duration-300
    hover:scale-[1.03]
    rounded-xl
    "
  >
    View Deals
  </Button>

</div>
      </div>


<Tilt
      glareEnable={true}
      glareMaxOpacity={0.1}
      scale={1.05}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      transitionSpeed={1500}
      className="rounded-2xl flex h-full justify-center flex-1"
    >
      <img
        src="/hero.png"
        alt="preview"
        onClick={() =>
              navigate("/product/69c777a3b6eba8bae197631b")
            }
        className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[420px] cursor-pointer"
      />
    </Tilt>
    </div>
  </div>
</section>
  );
};

export default Hero;