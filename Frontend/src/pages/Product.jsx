import FilterSideBar from "@/components/FilterSideBar";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setProducts } from "@/Redux/productSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Product = () => {
  const { products } = useSelector((store) => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}api/product/getAllProducts`,
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
       
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) return;
    let filteredProducts = [...allProducts];

    if (search.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.productName?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category,
      );
    }

    if (brand !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === brand,
      );
    }

    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.productPrice >= priceRange[0] &&
        product.productPrice <= priceRange[1],
    );

    if (sortOrder === "LtoH") {
      filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "HtoL") {
      filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
    } else {
      // Default sorting (e.g., by newest)
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }

    dispatch(setProducts(filteredProducts));
  }, [search, category, brand, priceRange, sortOrder, allProducts, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex flex-col lg:flex-row gap-7">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
          <FilterSideBar
            allProducts={allProducts}
            priceRange={priceRange}
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            category={category}
            setCategory={setCategory}
            setPriceRange={setPriceRange}
            />
            </div>
          {/* Main Product section */}
          <div className="flex flex-col w-full lg:w-3/4">
            <div className="flex justify-end lg:justify-end md:justify-end mb-4">
             <Select onValueChange={(value) => setSortOrder(value)}>

  <SelectTrigger
    className="w-full max-w-48
    bg-slate-900
    border border-slate-700
    text-white
    hover:border-cyan-400
    transition-all duration-300"
  >
    <SelectValue className="placeholder:font-medium" placeholder="Sort By Price" />
  </SelectTrigger>

  <SelectContent
    className="bg-slate-900 text-white border border-slate-700"
  >
    <SelectGroup>

      <SelectItem
        value="LtoH"
        className="focus:bg-slate-300 font-medium focus:text-cyan-300"
      >
        Price: Low to High
      </SelectItem>

      <SelectItem
        value="HtoL"
        className="focus:bg-slate-300 font-medium focus:text-cyan-300"
      >
        Price: High to Low
      </SelectItem>

    </SelectGroup>
  </SelectContent>

</Select>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 
sm:grid-cols-2 
md:grid-cols-3 
lg:grid-cols-4 
xl:grid-cols-5 gap-7">
              {
              products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    loading={loading} 
                  />
                ); 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
