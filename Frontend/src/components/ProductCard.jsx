import { Button } from "./ui/button";
import { FaOpencart } from "react-icons/fa";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/Redux/productSlice";
const ProductCard = ({ product, loading }) => {
  const { productImg, productPrice, productName } = product;
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.data.success) {
        toast.success("Product added to cart successfully!");
        dispatch(setCart(response.data.cart));
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
        <div
      className="bg-slate-900
  border border-slate-800
  shadow-lg
  rounded-2xl
  overflow-hidden
  h-full
  flex flex-col
  transition-all duration-300
  hover:-translate-y-1
  hover:border-cyan-500/40 "
    >
      <div className="w-full h-full aspect-square overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full rounded-lg" />
        ) : (
          <img
            src={productImg?.[0]?.url}
            alt="Product Img"
            onClick={() => navigate(`/product/${product._id}`)}
            className="w-full h-full object-cover cursor-pointer
        transition-transform duration-300 hover:scale-105 "
          />
        )}
      </div>

      {loading ? (
        <div className="px-3 space-y-2 my-3">
          <Skeleton className="w-50 h-4" />
          <Skeleton className="w-25 h-4" />
          <Skeleton className="w-37.5 h-8" />
        </div>
      ) : (
        <div className="p-4 flex flex-col flex-1">
          <h1
            className="font-semibold
  text-sm sm:text-base
  line-clamp-2
  text-white
  cursor-pointer
  hover:text-cyan-300
  transition-colors duration-300"
          >
            {productName}
          </h1>

<h2 className="font-bold text-cyan-400 text-base sm:text-lg">
  ₹ {Number(productPrice).toLocaleString("en-IN")}
</h2>
          <Button
            className="
  mt-auto
  w-full
  cursor-pointer
  bg-gradient-to-r from-slate-800 to-slate-900
  border border-slate-700
  hover:border-cyan-400
  hover:bg-slate-800
  text-white
  font-medium
  rounded-xl
  py-2
  transition-all duration-300
  text-sm sm:text-base"
            onClick={() => addToCart(product._id)}
          >
            <FaOpencart />
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
