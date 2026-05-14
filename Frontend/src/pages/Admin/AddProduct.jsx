import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/Redux/productSlice.js";
import { TbLoader3 } from "react-icons/tb";

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { products } = useSelector((store) => store.product);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    brand: "",
    category: "",
    productDescription: "",
    productImg: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("brand", productData.brand);
    formData.append("category", productData.category);
    formData.append("productDescription", productData.description);

    if (productData.productImg.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      setLoading(true);
      console.log(productData.productImg);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message);
      }
      console.log(res);
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.log("FULL ERROR:", error);
      console.log("DATA:", error.response?.data);
      console.log("MESSAGE:", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 sm:p-6 md:p-8 min-h-screen shadow-md">
  <Card className="w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
    <CardHeader className="p-4 sm:p-6">
      <CardTitle className="text-xl sm:text-2xl text-cyan-300">Add Product</CardTitle>
      <CardDescription className="text-slate-400">
        Enter Product details below
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4 sm:p-6">
      <div className="flex flex-col space-y-5 sm:space-y-8">
        <div className="grid gap-2">
          <Label className="text-slate-300">Product Name</Label>
          <input
            type="text"
            name="productName"
            placeholder="E.g, iPhone"
            value={productData.productName}
            onChange={handleChange}
            required
            className="h-11 bg-slate-800/60 border border-slate-600 rounded-xl px-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="grid gap-2">
          <Label className="text-slate-300">Price</Label>
          <input
            type="number"
            name="productPrice"
            placeholder="XXXX"
            value={productData.productPrice}
            onChange={handleChange}
            required
            className="h-11 bg-slate-800/60 border border-slate-600 rounded-xl px-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Brand & Category — mobile pe stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label className="text-slate-300">Brand</Label>
            <input
              type="text"
              name="brand"
              placeholder="E.g, Apple"
              value={productData.brand}
              onChange={handleChange}
              required
              className="h-11 bg-slate-800/60 border border-slate-600 rounded-xl px-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-slate-300">Category</Label>
            <input
              type="text"
              name="category"
              placeholder="E.g, Mobile"
              value={productData.category}
              onChange={handleChange}
              required
              className="h-11 bg-slate-800/60 border border-slate-600 rounded-xl px-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label className="text-slate-300">Description</Label>
          <Textarea
            name="description"
            placeholder="Product description goes here..."
            value={productData.description}
            onChange={handleChange}
            required
            rows={5}
            className="bg-slate-800/60 border border-slate-600 rounded-xl px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          />
        </div>

        <ImageUpload
          productData={productData}
          setProductData={setProductData}
        />
      </div>

      <CardFooter className="border-none bg-transparent px-0 pt-6">
        <Button
          disabled={loading}
          className="w-full h-11 sm:h-12 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-600/20 transition-all duration-200 active:scale-[0.98]"
          type="submit"
          onClick={submitHandler}
        >
          {loading ? (
            <span className="flex gap-1 items-center">
              <TbLoader3 className="animate-spin" />
              Adding Product...
            </span>
          ) : (
            "Add Product"
          )}
        </Button>
      </CardFooter>
    </CardContent>
  </Card>
</div>
  );
};

export default AddProduct;
