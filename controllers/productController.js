import ProductModel from "../models/ProductModel.js";
import {cloudinary} from "../config/cloudinary.js";
import fs from "fs/promises";

// Function for addProduct

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
    console.log(req.body)
    const images = []; 

    // Define the image fields to check
    const imageFields = ["image1", "image2", "image3", "image4"];

    for (const field of imageFields) {
      if (req.files[field] && Array.isArray(req.files[field])) { 
        for (const file of req.files[field]) {
          try {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: "uploads"
            });
            console.log("field", result)
            images.push(result.secure_url); // Add uploaded image URL
            await fs.unlink(file.path); // Remove temp file
          } catch (uploadError) {
            console.error("Upload failed:", uploadError.message);
            return res.status(500).json({ success: false, message: "Image upload failed" });
          }
        }
      }
    }

    // Create product data object
    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === 'true',
      image:images,
      date: Date.now(),
    };

    // Create and save the product
    const product = new ProductModel(productData);
    const savedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



//Function for List Products
const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

//Function for remove product

const removeProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

//Function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);
    res.json({ sucess: true, product });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
