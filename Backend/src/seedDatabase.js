const sequelize = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");

const sequelize = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");

const sampleProducts = [
  // Already in database - keep them
  {
    productName: "BlackBoard",
    priceRange: "120",
    minRentalPeriod: 3,
    description: "Sleek blackboard for smooth writing - perfect for office or classroom",
    imageUrl: "1771579116376.png",
    user_id: 1
  },
  {
    productName: "Sunglasses",
    priceRange: "500",
    minRentalPeriod: 5,
    description: "Xara Sunglasses - UV protection, stylish and premium quality",
    imageUrl: "1771579369009.png",
    user_id: 1
  },
  {
    productName: "Black Screen",
    priceRange: "500",
    minRentalPeriod: 1,
    description: "For having dark bg - high quality portable display screen",
    imageUrl: "1771580056430.png",
    user_id: 1
  },
  // Additional mock products
  {
    productName: "Professional DSLR Camera",
    priceRange: "2500",
    minRentalPeriod: 2,
    description: "Canon EOS 5D Mark IV - High-quality DSLR camera perfect for photography and videography. Includes lenses, memory cards, and tripod.",
    imageUrl: "1771580000001.png",
    user_id: 1
  },
  {
    productName: "Mountain Bike",
    priceRange: "300",
    minRentalPeriod: 1,
    description: "Trek X-Caliber all-terrain mountain bike. Suspension, durable. Includes helmet and lock for safe outdoor exploration.",
    imageUrl: "1771580000002.png",
    user_id: 1
  },
  {
    productName: "Camping Tent",
    priceRange: "250",
    minRentalPeriod: 2,
    description: "Coleman 4-Person waterproof camping tent. Durable, easy setup. Includes carrying bag. Perfect for weekend camping trips.",
    imageUrl: "1771580000003.png",
    user_id: 1
  },
  {
    productName: "Portable Projector",
    priceRange: "800",
    minRentalPeriod: 1,
    description: "High brightness projector - perfect for movie nights, presentations. Full HD, includes screen mount and cables.",
    imageUrl: "1771580000004.png",
    user_id: 1
  },
  {
    productName: "Electric Drill Kit",
    priceRange: "350",
    minRentalPeriod: 1,
    description: "Cordless electric drill with complete bit set. Powerful, lightweight. Perfect for DIY projects and home repairs.",
    imageUrl: "1771580000005.png",
    user_id: 1
  },
  {
    productName: "Gaming Laptop",
    priceRange: "2000",
    minRentalPeriod: 3,
    description: "High-performance gaming laptop with RTX graphics card. 16GB RAM, SSD. Great for gaming and creative work.",
    imageUrl: "1771580000006.png",
    user_id: 1
  },
  {
    productName: "Yoga Mat & Blocks",
    priceRange: "100",
    minRentalPeriod: 1,
    description: "Premium yoga mat with non-slip surface and foam blocks. Perfect for yoga practice at home or studio.",
    imageUrl: "1771580000007.png",
    user_id: 1
  },
  {
    productName: "Pressure Washer",
    priceRange: "400",
    minRentalPeriod: 1,
    description: "High-pressure water cleaning machine. Perfect for cleaning driveways, patios, and vehicles. Includes accessories.",
    imageUrl: "1771580000008.png",
    user_id: 1
  },
  {
    productName: "Drone with 4K Camera",
    priceRange: "3000",
    minRentalPeriod: 2,
    description: "DJI drone with 4K camera, 30-minute flight time. Great for aerial photography and videography. Includes extra batteries.",
    imageUrl: "1771580000009.png",
    user_id: 1
  }
];

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Sync database schema
    console.log("🔄 Syncing database schema...");
    await sequelize.sync({ alter: true });
    console.log("✅ Database schema synced");

    // For PostgreSQL, disable triggers instead of foreign keys
    try {
      await sequelize.query('ALTER TABLE carts DISABLE TRIGGER ALL');
    } catch (e) {
      // Triggers might not exist, continue
    }

    // Delete existing products and carts
    await Product.destroy({ where: {}, force: true });
    console.log("🗑️ Old products cleared");

    // Re-enable triggers
    try {
      await sequelize.query('ALTER TABLE carts ENABLE TRIGGER ALL');
    } catch (e) {
      // Triggers might not exist, continue
    }

    // Create default admin user if doesn't exist
    let adminUser = await User.findOne({ where: { user_id: 1 } });
    if (!adminUser) {
      adminUser = await User.create({
        user_id: 1,
        name: "RentSafe Admin",
        email: "admin@rentsafe.com",
        phone: "9999999999",
        gender: "Other",
        age: 30,
        address: JSON.stringify({ city: "Delhi", state: "Delhi", country: "India" }),
        aadhar: "000000000000",
        password_hash: "hashed_password_here"
      });
      console.log("✅ Created default admin user");
    }

    // Add sample products
    const inserted = await Product.bulkCreate(sampleProducts);
    console.log(`✅ Added ${inserted.length} sample products:`);

    inserted.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.productName}`);
      console.log(`     Price: ${product.priceRange}`);
      console.log(`     Min Period: ${product.minRentalPeriod} month(s)`);
      console.log(`     ID: ${product.id}\n`);
    });

    await sequelize.close();
    console.log("✅ Database ready for testing!");
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
}

seedDatabase();
