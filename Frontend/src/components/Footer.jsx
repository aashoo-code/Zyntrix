import React from "react";
import { LiaFacebookF } from "react-icons/lia";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { TfiPinterest } from "react-icons/tfi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-200 py-10">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

    {/* Information */}
    <div>
      <div
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="cursor-pointer"
      >
        <img
          src="/Zyntrix.png"
          alt="Zyntrix Logo"
          className="w-28 sm:w-32"
        />
      </div>

      <p className="text-sm mt-3 text-slate-400">
        Powering Your World with the best in Electronics.
      </p>

      <p className="text-sm mt-3 text-slate-400">
        162 Electronics St, Style City Singapore, 342116
      </p>

      <p className="text-sm mt-2 text-slate-400">
        Email: support@zyntrix.com
      </p>

      <p className="text-sm text-slate-400">
        Phone: (+32) 868 226-8362
      </p>
    </div>

    {/* Customer Service */}
    <div>
      <h3 className="text-lg font-semibold text-cyan-400">
        Customer Service
      </h3>

      <ul className="mt-4 text-sm space-y-2 text-slate-400">
        <li className="hover:text-cyan-400 cursor-pointer transition">
          Contact Us
        </li>
        <li className="hover:text-cyan-400 cursor-pointer transition">
          Shipping & Returns
        </li>
        <li className="hover:text-cyan-400 cursor-pointer transition">
          FAQs
        </li>
        <li className="hover:text-cyan-400 cursor-pointer transition">
          Order Tracking
        </li>
        <li className="hover:text-cyan-400 cursor-pointer transition">
          Size Guide
        </li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h3 className="text-lg font-semibold text-cyan-400">
        Follow Us
      </h3>

      <div className="flex space-x-6 mt-4 text-xl">
        <LiaFacebookF className="cursor-pointer hover:text-blue-500 transition" />
        <BiLogoInstagramAlt className="cursor-pointer hover:text-pink-500 transition" />
        <FaXTwitter className="cursor-pointer hover:text-gray-300 transition" />
        <TfiPinterest className="cursor-pointer hover:text-red-500 transition" />
      </div>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="text-lg font-semibold text-cyan-400">
        Stay in the loop
      </h3>

      <p className="mt-3 text-sm text-slate-400">
        Subscribe to get special offers, free giveaways, and more.
      </p>

      <form className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full p-2 rounded-md text-slate-900 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm px-4 text-slate-400">
    <p>
      &copy; {new Date().getFullYear()}{" "}
      <span className="text-cyan-400 font-semibold">
        Zyntrix
      </span>{" "}
      All rights reserved
    </p>
  </div>
</footer>
  );
};

export default Footer;