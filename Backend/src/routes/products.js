
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");

// CREATE PRODUCT (with image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
    const {
        name,
        description,
        priceRange,
        minRentalPeriod
    } = req.body;

    // const { title, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }

        const newProduct = await Product.create({
            title: name,                     // map name → title
            description,
            price: priceRange,               // map priceRange → price
            category: minRentalPeriod,       // TEMP mapping until category exists
            imageUrl: `/uploads/${req.file.filename}`
        });



    // const newProduct = await Product.create({
    //   title,
    //   description,
    //   price,
    //   category,
    //   imageUrl: `/uploads/${req.file.filename}`
    // });

    res.json(newProduct);

  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;







// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");

// // CREATE product
// router.post("/", async (req, res) => {
//   try {
//     const { title, description, price, imageUrl } = req.body;

//     if (!title || !description || !price || !imageUrl) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const product = await Product.create({
//       title,
//       description,
//       price,
//       imageUrl,
//     });

//     res.json({ message: "Product created", product });
//   } catch (err) {
//     console.error("Product creation error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET ALL products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.json(products);
//   } catch (err) {
//     console.error("Fetch products error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
