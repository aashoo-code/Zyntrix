import React from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const FilterSideBar = ({
  allProducts,
  priceRange,
  search,
  setSearch,
  brand,
  setBrand,
  category,
  setCategory,
  setPriceRange,
}) => {
  const Categories = allProducts.map((p) => p.category);
  const uniqueCategory = ["All", ...new Set(Categories)];
  const Brands = allProducts.map((p) => p.brand);
  const uniqueBrand = ["All", ...new Set(Brands)];
  //   console.log(uniqueCategory);
  //   console.log(uniqueBrand);

  const handleCategoryClick = (value) => {
    setCategory(value);
  };

  const handleBrandChange = (e) => {
    setBrand(e);
  };

  const handleMinPriceChange = (e) => {
    const val = Number(e.target.value);
    if (val <= priceRange[1]) {
      setPriceRange([val, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e) => {
    const val = Number(e.target.value);
    if (val >= priceRange[0]) {
      setPriceRange([priceRange[0], val]);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setBrand("All");
    setCategory("All");
    setPriceRange([0, 999999]);
  };

  return (
    <div
      className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]
  text-white
  border border-gray-800
  mt-6
  p-4
  rounded-md
  w-full
  lg:w-64
  h-max"
    >
      {/* Search */}
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-transparent p-2 rounded-md border-gray-600 border-2 w-full"
      />
      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {uniqueCategory.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="radio"
              className="accent-black"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>

      {/* Brand */}
      <h1 className="mt-5 font-semibold text-xl">Brand</h1>
      <Select value={brand} onValueChange={handleBrandChange}>
        <SelectTrigger className="w-full bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white border border-gray-700">
          <SelectValue placeholder="Select a Brand" />
        </SelectTrigger>

        <SelectContent className="bg-[#0f172a] text-white border border-gray-700">
          <SelectGroup>
            {uniqueBrand.map((item, idx) => (
              <SelectItem
                value={item}
                key={idx}
                className="focus:bg-slate-700 focus:text-cyan-300"
              >
                {item.toUpperCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-4">
        <label className="text-white font-medium text-lg">
          ₹ {priceRange[0]} - ₹ {priceRange[1]}
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            min="0"
            max="5000"
            className="w-24 p-2 rounded-lg 
      bg-[#0f172a] text-white 
      border border-slate-700
      focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <span className="text-white text-lg">-</span>

          <input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            min="0"
            max="999999"
            className="w-28 p-2 rounded-lg 
      bg-[#0f172a] text-white 
      border border-slate-700
      focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <input
          type="range"
          value={priceRange[0]}
          onChange={handleMinPriceChange}
          min="0"
          max="5000"
          step="100"
          className="w-full accent-cyan-400 cursor-pointer "
        />

        <input
          type="range"
          value={priceRange[1]}
          onChange={handleMaxPriceChange}
          min="0"
          max="999999"
          step="1000"
          className="w-full accent-cyan-400 cursor-pointer"
        />
      </div>
      <Button
        className="mt-5 w-full cursor-pointer
  bg-gradient-to-r from-slate-800 to-slate-900
  border border-slate-700
  hover:border-cyan-400
  hover:bg-slate-800
  text-white font-medium
  rounded-xl py-2
  transition-all duration-300"
        type="reset"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSideBar;
