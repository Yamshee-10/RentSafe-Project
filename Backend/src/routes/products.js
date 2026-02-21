const express = require("express"); 
const router = express.Router(); 
const multer = require("multer"); 
const path = require("path"); 
const Product = require("../models/Product"); 
const User = require("../models/User"); 
const storage = multer.diskStorage({
   destination: (req, file, cb) => { 
    cb(null, "uploads/"); 
   }, 
  filename: (req, file, cb) => { 
      const uniqueName = Date.now() + path.extname(file.originalname); 
      cb(null, uniqueName); }, 
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
        productName: req.body.name, // matches model 
        priceRange: req.body.priceRange, 
        minRentalPeriod: req.body.minRentalPeriod, 
        description: req.body.description, 
        imageUrl: req.file.filename, 
        user_id: 1, 
      }); 
      res.status(201).json({ 
        message: "Product saved in MySQL successfully", 
        product, 
      }); 
    } 
    catch (err) { 
      console.error(" DB INSERT ERROR:", err); 
      res.status(500).json({ error: "Failed to save product" }); 
    } 
  }); 
  // GET PRODUCTS LENT BY A SPECIFIC USER 
  router.get("/lent/:userId", async (req, res) => { 
    try { 
      const { userId } = req.params; 
      const products = await Product.findAll({ 
        where: { user_id: userId }, 
        include: [ 
          { 
            model: User, 
            attributes: ["id", "name"], 
          },
        ], 
      }); 
      res.json(products); 
    } 
    catch (err) { 
      console.error("FETCH LENT PRODUCTS ERROR:", err); 
      res.status(500).json({ error: "Failed to fetch lent products" }); 
    } 
  }); 
  // GET SINGLE PRODUCT BY ID 
  router.get("/:id", async (req, res) => { 
    try { 
      const product = await Product.findByPk(req.params.id); 
      if (!product) 
        { 
          return res.status(404).json({ error: "Product not found" }); 
        } 
        res.json(product); 
      } catch (err) 
        { 
          console.error(" FETCH ONE ERROR:", err); 
          res.status(500).json({ 
            error: "Failed to fetch product" }); 
          } 
  }); 
  // GET ALL PRODUCTS 
  router.get("/", async (req, res) => {
    try { 
      const products = await Product.findAll({ 
        include: [ 
          { 
            model: User, 
            attributes: ["user_id", "name"], // make sure "name" matches your User column 
          }, 
        ], 
      }); 
      res.json(products); 
    } catch (err) { 
      console.error("FETCH ERROR:", err); 
      res.status(500).json({ error: "Failed to fetch products" }); 
    } 
  }); 
module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const Product = require("../models/Product");
// // const User = require("../models/User");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// // Create Product
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     console.log("REQ BODY:", req.body);
//     console.log("REQ FILE:", req.file);

//     if (!req.file) {
//       return res.status(400).json({ error: "Image is required" });
//     }

//     const product = await Product.create({
//       productName: req.body.name,               // matches model
//       priceRange: req.body.priceRange,
//       minRentalPeriod: req.body.minRentalPeriod,
//       description: req.body.description,
//       imageUrl: req.file.filename, 
//       user_id: 1,
//     });

//     res.status(201).json({
//       message: "Product saved in MySQL successfully",
//       product,
//     });
//   } catch (err) {
//     console.error(" DB INSERT ERROR:", err);
//     res.status(500).json({ error: "Failed to save product" });
//   }
// });
// // GET PRODUCTS LENT BY A SPECIFIC USER
// router.get("/lent/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const products = await Product.findAll({
//       where: { user_id: 1 },
//       include: [
//         {
//           model: require("../models/User"),
//           attributes: ["id", "name"],

//           // model: User,
//           // attributes: ["user_id", "name"],
//         },
//       ],
//     });

//     res.json(products);
//   } catch (err) {
//     console.error("FETCH LENT PRODUCTS ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch lent products" });
//   }
// });



// // GET SINGLE PRODUCT BY ID
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.json(product);
//   } catch (err) {
//     console.error(" FETCH ONE ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch product" });
//   }
// });
// // router.get("/my-products", async (req, res) => {
// //   try {
// //     const userId = req.session.user?.user_id;

// //     if (!userId) {
// //       return res.status(401).json({ error: "Not logged in" });
// //     }

// //     const products = await Product.findAll({
// //       where: { user_id: 1 },
// //       include: [
// //         {
// //           model: User,
// //           attributes: ["user_id", "name"],
// //         },
// //       ],
// //     });

// //     res.json(products);
// //   } catch (err) {
// //     console.error("FETCH MY PRODUCTS ERROR:", err);
// //     res.status(500).json({ error: "Failed to fetch products" });
// //   }
// // });

//   //  GET ALL PRODUCTS
//   router.get("/", async (req, res) => {
//   try {
//     const products = await Product.findAll({
//       include: [
//         {
//           model: require("../models/User"),
//           attributes: ["id", "name"],

//           // model: User, 
//           // attributes: ["user_id", "name"], // make sure "name" matches your User column
//         },
//       ],
//     });

//     res.json(products);
//   } catch (err) {
//     console.error("FETCH ERROR:", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });





// module.exports = router;
