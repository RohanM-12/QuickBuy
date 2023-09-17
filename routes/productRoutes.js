import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update prod
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
//get products
router.get("/get-products", getProductController);

// singlle products get
router.get("/get-product/:slug", getSingleProductController);

//getPhoto
router.get("/product-photo/:pid", productPhotoController);

// delete Product
router.delete("/delete-product/:pid", deleteProductController);

//filter products

router.post("/product-filters", productFiltersController);

//productCount

router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

export default router;
