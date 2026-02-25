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
      
      // New Change here from 26-28
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      if (!req.file) { 
        return res.status(400).json({ error: "Image is required" }); 
      } 
      const product = await Product.create({ 
        productName: req.body.name, // matches model 
        priceRange: req.body.priceRange, 
        minRentalPeriod: req.body.minRentalPeriod, 
        description: req.body.description, 
        imageUrl: req.file.filename, 
        user_id: req.session.userId,
        // user_id: req.user.user_id,
        // user_id: 1, 
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
            //changing for now 
            as: "User",
            attributes: ["user_id", "name"], 
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
  router.get("/my-products", async (req, res) => {
  try {
    const products = await Product.findAll({
       where: { user_id: req.session.userId },
      // where: { user_id: req.user.user_id },
      include: [
        {
          model: User,
          //changing for now 
          as: "User",
          attributes: ["user_id", "name"],
        },
      ],
    });

    res.json(products);
  } catch (err) {
    console.error("FETCH MY PRODUCTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


module.exports = router;
