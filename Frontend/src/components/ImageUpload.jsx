import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { RxCross2 } from "react-icons/rx";

const ImageUpload = ({ productData, setProductData }) => {
  const handleFile = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      console.log(file.name);
      console.log(file.size);
    });

    if (files.length)
      setProductData((prev) => ({
        ...prev,
        productImg: [...(prev.productImg || []), ...files],
      }));
  };

  const handleRemoveImage = (index) => {
    setProductData((prev) => {
      const updatedImages = [...prev.productImg];
      updatedImages.splice(index, 1);
      return {
        ...prev,
        productImg: updatedImages,
      };
    });
  };

  return (
    <div className="grid gap-2">
      <Label className="text-slate-300"> Product Images</Label>
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFile}
      ></Input>
      <Button className="w-full h-11 rounded-xl 
           bg-white/5 
           backdrop-blur-xl 
           border border-cyan-400/20 
           text-cyan-300 
           shadow-lg 
           shadow-cyan-500/10 
           hover:shadow-cyan-500/20 
           hover:bg-white/10 
           transition-all duration-300 mb-5">
        <label htmlFor="file-upload" className="cursor-pointer">
          Upload Images
        </label>
      </Button>
      {productData?.productImg && productData?.productImg.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3">
          {productData?.productImg.map((file, index) => {
            // Check if the file is an image before rendering
            let preview;
            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            } else if (typeof file === "string") {
              preview = file;
            } else if (file?.url) {
              preview = file.url;
            } else {
              return null; // Skip if it's not a valid image file
            }
            return (
              <Card key={index} className="relative group overflow-hidden">
                <CardContent>
                  <img
                    src={preview}
                    alt={`preview ${index}`}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  {/* Remove Button */}
                  <button
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <RxCross2 size={14} />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
