import { Input } from "@/components/ui/input";
import { FcSearch } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/Redux/productSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const [editProducts, setEditProducts] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  let filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (sortOrder === "asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  } else if (sortOrder === "desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProducts((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", editProducts.productName);
    formData.append("productPrice", editProducts.productPrice);
    formData.append("brand", editProducts.brand);
    formData.append("category", editProducts.category);
    formData.append("productDescription", editProducts.productDescription);

    const existingImages = editProducts?.productImg
      ?.filter((img) => !(img instanceof File) && img.public_id)
      ?.map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    // Add New Files to FormData
    editProducts.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => formData.append("files", file));
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/product/update/${editProducts._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product updated successfully!");
        const updateProducts = products.map((p) =>
          p._id === editProducts._id ? res.data.product : p,
        );
        dispatch(setProducts(updateProducts));
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
      console.log(error.response.data);
    }
  };

  const handleDelete = async (productId) => {
    console.log(products);
    try {
      const remainingProducts = products.filter((p) => p._id !== productId);

      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/product/delete/${productId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      if (res.data.success) {
        toast.success("Product deleted successfully!");
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data || error.message);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 sm:p-6 md:p-10 flex flex-col gap-6">
  
  {/* Search + Sort */}
  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 p-2 sm:p-4">
    <div className="relative w-full sm:w-[400px]">
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-11 bg-slate-800/60 border border-slate-600 text-white placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-cyan-500 pr-10"
      />
      <FcSearch className="absolute right-3 top-3 text-xl cursor-pointer" />
    </div>

    <Select onValueChange={(value) => setSortOrder(value)}>
      <SelectTrigger className="w-full sm:w-48 bg-slate-900 border border-slate-700 text-white hover:border-cyan-400 transition-all duration-300">
        <SelectValue className="placeholder:font-medium text-white" placeholder="Sort by Price" />
      </SelectTrigger>
      <SelectContent className="bg-slate-900 text-white border border-slate-700">
        <SelectGroup>
          <SelectItem className="focus:bg-slate-300 font-medium focus:text-cyan-300" value="asc">
            Price: Low to High
          </SelectItem>
          <SelectItem className="focus:bg-slate-300 font-medium focus:text-cyan-300" value="desc">
            Price: High to Low
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  {/* Product Cards */}
  {filteredProducts.map((product, idx) => (
    <Card
      key={idx}
      className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full p-4 sm:p-5 gap-4 sm:gap-0">
        
        {/* Image + Name */}
        <div className="flex gap-3 items-center w-full sm:w-auto flex-1">
          <img
            src={product?.productImg?.[0]?.url}
            alt="Product Img"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex-shrink-0 object-contain"
          />
          <h1 className="text-base sm:text-lg font-semibold text-cyan-200 line-clamp-2 flex-1 sm:w-64 md:w-80">
            {product?.productName}
          </h1>
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-8">
          <h1 className="text-lg sm:text-xl font-bold text-green-500">
            ₹ {Number(product?.productPrice || 0).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>

          <div className="flex gap-4 sm:gap-5">
            {/* Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <FaEdit
                  onClick={() => { setOpen(true); setEditProducts(product); }}
                  className="cursor-pointer h-5 w-5 text-emerald-600 hover:text-emerald-800 hover:scale-125 transition-transform"
                />
              </DialogTrigger>
              <DialogContent className="w-[95vw] sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 text-white p-4 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-cyan-300">Edit Product</DialogTitle>
                  <DialogDescription className="text-slate-300">
                    Make changes to your product information here.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  {/* Label + Input — stack on mobile */}
                  {[
                    { label: "Product Name", name: "productName", type: "text", placeholder: "Eg: iPhone 14 Pro Max" },
                    { label: "Product Price", name: "productPrice", type: "number", placeholder: "Eg: 109999" },
                    { label: "Product Brand", name: "brand", type: "text", placeholder: "Eg: Apple" },
                    { label: "Product Category", name: "category", type: "text", placeholder: "Eg: Mobile" },
                  ].map((field) => (
                    <div key={field.name} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-center">
                      <Label className="text-slate-300">{field.label}</Label>
                      <Input
                        type={field.type}
                        name={field.name}
                        value={editProducts?.[field.name]}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  ))}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 items-start">
                    <Label className="text-slate-300">Product Description</Label>
                    <textarea
                      name="productDescription"
                      value={editProducts?.productDescription}
                      placeholder="Eg: The iPhone 14 Pro Max features..."
                      className="border border-slate-600 bg-slate-800 text-white rounded-lg p-2 w-full resize-none"
                      rows={4}
                      onChange={handleChange}
                    />
                  </div>

                  <ImageUpload productData={editProducts} setProductData={setEditProducts} />
                </div>

                <DialogFooter className="bg-transparent border-none flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
                  <DialogClose asChild>
                    <button className="px-4 py-2 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 rounded-xl w-full sm:w-auto">
                      Cancel
                    </button>
                  </DialogClose>
                  <Button
                    className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-xl transition-all w-full sm:w-auto"
                    onClick={handleSave}
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Delete AlertDialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <FaRegTrashAlt className="cursor-pointer h-5 w-5 text-red-600 hover:text-red-800 hover:scale-125 transition-transform" />
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[95vw] sm:max-w-md rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-cyan-400 text-white p-4 sm:p-6">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-semibold text-cyan-300">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-300">
                    This action cannot be undone. This will permanently delete your product from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="border-none bg-transparent flex-col sm:flex-row gap-2 sm:gap-0">
                  <AlertDialogCancel className="border-2 border-cyan-400 text-cyan-300 bg-transparent hover:bg-transparent hover:text-white rounded-xl w-full sm:w-auto">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all w-full sm:w-auto"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

      </div>
    </Card>
  ))}
</div>
  );
};

export default AdminProduct;
