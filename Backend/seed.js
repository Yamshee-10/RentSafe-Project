const sequelize = require("./src/config/db");
const Product = require("./src/models/Product");
const User = require("./src/models/User");

const products = [
  {
    productName: "BlackBoard",
    priceRange: "120",
    minRentalPeriod: 3,
    description: "Sleek blackboard for smooth writing",
    imageUrl: "1771579116376.png",
    user_id: 1
  },
  {
    productName: "Sunglasses",
    priceRange: "500",
    minRentalPeriod: 5,
    description: "Xara Sunglasses - UV protection, stylish",
    imageUrl: "1771579369009.png",
    user_id: 1
  },
  {
    productName: "Black Screen",
    priceRange: "500",
    minRentalPeriod: 1,
    description: "High quality portable display screen",
    imageUrl: "1771580056430.png",
    user_id: 1
  },
  {
    productName: "Professional DSLR Camera",
    priceRange: "2500",
    minRentalPeriod: 2,
    description: "Canon EOS with lenses, memory cards, tripod",
    imageUrl: "1771580000001.png",
    user_id: 1
  },
  {
    productName: "Mountain Bike",
    priceRange: "300",
    minRentalPeriod: 1,
    description: "Trek all-terrain bike with suspension",
    imageUrl: "1771580000002.png",
    user_id: 1
  },
  {
    productName: "Camping Tent",
    priceRange: "250",
    minRentalPeriod: 2,
    description: "Coleman 4-Person waterproof camping tent",
    imageUrl: "1771580000003.png",
    user_id: 1
  },
  {
    productName: "Portable Projector",
    priceRange: "800",
    minRentalPeriod: 1,
    description: "Full HD projector with screen mount",
    imageUrl: "1771580000004.png",
    user_id: 1
  },
  {
    productName: "Electric Drill Kit",
    priceRange: "350",
    minRentalPeriod: 1,
    description: "Cordless drill with complete bit set",
    imageUrl: "1771580000005.png",
    user_id: 1
  },
  {
    productName: "Gaming Laptop",
    priceRange: "2000",
    minRentalPeriod: 3,
    description: "RTX graphics, 16GB RAM, SSD storage",
    imageUrl: "1771580000006.png",
    user_id: 1
  },
  {
    productName: "Yoga Mat & Blocks",
    priceRange: "100",
    minRentalPeriod: 1,
    description: "Premium yoga mat with non-slip surface",
    imageUrl: "1771580000007.png",
    user_id: 1
  },
  {
    productName: "Pressure Washer",
    priceRange: "400",
    minRentalPeriod: 1,
    description: "High-pressure water cleaning machine",
    imageUrl: "1771580000008.png",
    user_id: 1
  },
  {
    productName: "Drone with 4K Camera",
    priceRange: "3000",
    minRentalPeriod: 2,
    description: "DJI drone with 4K camera and extra batteries",
    imageUrl: "1771580000009.png",
    user_id: 1
  }
];

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");
    
    // Connect to database
    await sequelize.authenticate();
    console.log("✅ Connected to Railway MySQL");

    // Sync models
    await sequelize.sync();
    console.log("✅ Database synced");

    // Check if products exist
    const count = await Product.count();
    if (count > 0) {
      console.log(`⚠️  Found ${count} existing products. Clearing...`);
      await Product.destroy({ where: {} });
    }

    // Verify user exists
    let user = await User.findOne({ where: { user_id: 1 } });
    if (!user) {
      console.log("👤 Creating default user...");
      user = await User.create({
        user_id: 1,
        name: "Demo User",
        email: "demo@rentsafe.com",
        phone: "9999999999",
        gender: "Other",
        age: 30,
        address: JSON.stringify({ city: "Delhi" }),
        aadhar: "000000000000",
        password_hash: "demo"
      });
      console.log("✅ User created");
    }

    // Create products
    console.log("📦 Adding 12 products to Railway...");
    const created = await Product.bulkCreate(products);
    
    console.log("\n✅ SUCCESS! Seeded products:\n");
    created.forEach((p, i) => {
      console.log(`${i + 1}. ${p.productName} - ₹${p.priceRange}/month (ID: ${p.id})`);
    });

    console.log(`\n🎉 Total: ${created.length} products in Railway database`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

seed();
