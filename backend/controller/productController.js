import { Product } from "../models/productModels.js";
import cloudinary from "../utils/Cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const addProduct = async (req, res) => {
  try {
    const { productName, productDescription, productPrice, category, brand } =
      req.body;
    const userId = req.id;

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !category ||
      !brand
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Handle Multiple image uploads
    let productImg = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "mern_Products",
          timeout: 60000, // 60 seconds timeout
        });
        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
    const newProduct = await Product.create({
      userId,
      productName,
      productDescription,
      productPrice,
      category,
      brand,
      productImg,
    });
    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product: newProduct,
    });


  } catch (error) {
    console.log("Cloudinary Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProduct = async (_, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No Products Availabe",
        product: [],
      });
    }
    return res.status(200).json({
      success: true, 
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => { 
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }
    // Delete Imgs from Cloudinary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      } 
    }

    // Delete Product from MongoDb
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      message: "Products Deleted Successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDescription,
      productPrice,
      category,
      brand,
      existingImg,
    } = req.body;


    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    let updatedImg = [];
    // Keep selected old Images
    if (existingImg) {
      const keepId = JSON.parse(existingImg);
      updatedImg = product.productImg.filter((img) =>
        keepId.includes(img.public_id),
      );
      // Delete only Removed Images
      const removedImg = product.productImg.filter(
        (img) => !keepId.includes(img.public_id),
      );
      for (let img of removedImg) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      updatedImg = product.productImg; // Keep all if nothing sends
    }

    // Upload New Img of any
    if (req.files && req.files.length > 0)
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder:"mern_Products",
        });
        updatedImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    // update Product
    product.productName = productName || product.productName;
    product.productDescription =
      productDescription || product.productDescription;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.productImg = updatedImg;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
