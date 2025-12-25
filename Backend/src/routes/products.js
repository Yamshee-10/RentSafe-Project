// // Backend/src/routes/products.js

// const fs = require("fs");
// const path = require("path");

// // JSON file path
// const jsonFilePath = path.join(__dirname, "..", "tempData", "ProductDetails.json");
// const express = require("express");
// const router = express.Router();
// // const Product = require("../models/Product");
// const upload = require("../middleware/upload");

// // CREATE PRODUCT (with image)
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     console.log("REQ BODY:", req.body);
//     console.log("REQ FILE:", req.file);

//     const { name, priceRange, minRentalPeriod, description } = req.body;

//     // Basic validation
//     if (!name || !priceRange || !minRentalPeriod) {
//       return res.status(400).json({
//         message: "Missing required fields: name, priceRange, minRentalPeriod are required."
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "Image upload is required" });
//     }

//     // 1️⃣ Create product in Sequelize (your existing logic stays)
//     // const newProduct = await Product.create({
//     //   productName: name,
//     //   priceRange,
//     //   minRentalPeriod,
//     //   description,
//     //   imageUrl: `/uploads/${req.file.filename}`
//     // });


//     // TEMPORARY: manual ID generation since DB is disabled
//     const newProduct = {
//       id: Date.now(), 
//       productName: name,
//       priceRange,
//       minRentalPeriod,
//       description,
//       imageUrl: `/uploads/${req.file.filename}`
//     };

//     // 2️⃣ Read existing JSON file
//     let productsArray = [];

//     if (fs.existsSync(jsonFilePath)) {
//       const data = fs.readFileSync(jsonFilePath, "utf-8");
//       productsArray = data ? JSON.parse(data) : [];
//     }

//     // 3️⃣ Prepare the product object for JSON file
//     const jsonProduct = {
//       id: newProduct.id || Date.now(),
//       productName: name,
//       priceRange,
//       minRentalPeriod,
//       description,
//       imageUrl: `/uploads/${req.file.filename}`
//     };

//     // 4️⃣ Add to array
//     productsArray.push(jsonProduct);

//     // 5️⃣ Save back to JSON file
//     fs.writeFileSync(jsonFilePath, JSON.stringify(productsArray, null, 2));

//     return res.status(201).json(jsonProduct);

//   } catch (error) {
//     console.error("Product creation error:", error);
//     return res.status(500).json({ message: "Server error", error: error.message || error });
//   }
// });
// // GET ALL PRODUCTS (from JSON file)
// router.get("/", (req, res) => {
//   try {
//     if (!fs.existsSync(jsonFilePath)) {
//       return res.json([]); // no file yet → return empty array
//     }

//     const data = fs.readFileSync(jsonFilePath, "utf-8");
//     const products = data ? JSON.parse(data) : [];

//     return res.json(products);
//   } catch (error) {
//     console.error("Error reading products:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;




// // CREATE PRODUCT (with image)
// // router.post("/", upload.single("image"), async (req, res) => {
// //   try {
// //     console.log("REQ BODY:", req.body);
// //     console.log("REQ FILE:", req.file);

// //     // Accept front-end keys and map to model fields:
// //     // front-end: name, priceRange, minRentalPeriod, description
// //     // model fields: productName, priceRange, minRentalPeriod, description
// //     const {
// //       name,
// //       priceRange,
// //       minRentalPeriod,
// //       description
// //     } = req.body;

// //     // Basic validation (server-side)
// //     if (!name || !priceRange || !minRentalPeriod) {
// //       return res.status(400).json({
// //         message: "Missing required fields: name, priceRange, minRentalPeriod are required."
// //       });
// //     }

// //     if (!req.file) {
// //       return res.status(400).json({ message: "Image upload is required" });
// //     }

// //     // Create using the model's field names
// //     const newProduct = await Product.create({
// //       productName: name,
// //       priceRange,
// //       minRentalPeriod,
// //       description,
// //       imageUrl: `/uploads/${req.file.filename}`
// //     });

// //     return res.status(201).json(newProduct);
// //   } catch (error) {
// //     console.error("Product creation error:", error);
// //     return res.status(500).json({ message: "Server error", error: error.message || error });
// //   }
// // });



// Chatgpt code

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Create Product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const product = await Product.create({
      productName: req.body.name,               // matches model
      priceRange: req.body.priceRange,
      minRentalPeriod: req.body.minRentalPeriod,
      description: req.body.description,
      imageUrl: req.file.filename,               //  matches model
    });

    res.status(201).json({
      message: "Product saved in MySQL successfully",
      product,
    });
  } catch (err) {
    console.error("❌ DB INSERT ERROR:", err);
    res.status(500).json({ error: "Failed to save product" });
  }
});


  //  GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error("❌ FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
