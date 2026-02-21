# RentSafe - Item Rental Platform

A full-stack web application for peer-to-peer item rental management. Users can browse, rent, and manage rental requests for various items in their community.

## Features

- **User Authentication**: Secure login/signup with bcrypt password hashing
- **Product Browsing**: Browse and search rental items with versatile filtering capabilities
- **Shopping Cart**: Add items to cart with dynamic pricing based on rental duration
- **Minimum Rental Period**: Each item enforces customizable minimum rental duration (1-5 months)
- **Dynamic Pricing**: Calculates rental costs based on monthly rate and duration (price per month ÷ 30 × rental days)
- **Payment Gateway**: Razorpay integration for secure online transactions
- **Order Tracking**: Monitor rental orders and payment status in real-time
- **User Dashboard**: View rental history and active bookings
- **Lender Dashboard**: Manage items you are lending to others
- **Session Management**: Persistent user sessions with MySQL session store
- **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile devices

## System Architecture

### Technology Stack

**Backend:**
- Node.js + Express.js
- MySQL (via Sequelize ORM)
- Railway Cloud Database
- Razorpay Payment Gateway
- Express Session + Sequelize Store

**Frontend:**
- React.js
- React Router
- Axios (API client)
- CSS3 (Flexbox/Grid)
- Context API for state management

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│                          RentSafe Architecture                               │
│                                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  CLIENT LAYER (Port 3000)                                                    │
│  ┌───────────────────────────────────────────────────────────────────┐      │
│  │                     React.js Frontend                             │      │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │      │
│  │  │   Browse     │  │    Cart      │  │  Checkout    │            │      │
│  │  │   Products   │  │  Management  │  │   Payment    │            │      │
│  │  └──────────────┘  └──────────────┘  └──────────────┘            │      │
│  │         │                │                    │                   │      │
│  │         └────────────────┼────────────────────┘                   │      │
│  │                          │                                        │      │
│  │                    UserContext API                               │      │
│  │                  (State Management)                              │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                              │                                               │
│                        Axios HTTP Client                                    │
│                              │                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                              │                                               │
│  API LAYER (Port 5000)       │                                               │
│  ┌───────────────────────────┴─────────────────────────────────────┐       │
│  │                    Express.js Backend                           │       │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │       │
│  │  │ Auth Routes  │  │ Product API  │  │ Payment API  │          │       │
│  │  │ /api/auth    │  │ /api/products│  │ /api/payments│          │       │
│  │  └──────────────┘  └──────────────┘  └──────────────┘          │       │
│  │  ┌──────────────┐  ┌──────────────┐                            │       │
│  │  │  Cart API    │  │ Your Items   │                            │       │
│  │  │ /api/cart    │  │ /api/products/lent                        │       │
│  │  └──────────────┘  └──────────────┘                            │       │
│  │         │                │                    │                │       │
│  │         └────────────────┼────────────────────┘                │       │
│  │                          │                                      │       │
│  │                Sequelize ORM Layer                             │       │
│  └───────────────────────────────────────────────────────────────┘       │
│                              │                                               │
│                     Express Session Store                                   │
│                              │                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                              │                                               │
│  DATABASE & SERVICES LAYER                                                  │
│  ┌───────────────────────────┴─────────────────────────────────────┐       │
│  │                                                                  │       │
│  │  ┌─────────────────────┐  ┌──────────────────────┐             │       │
│  │  │  Railway MySQL DB   │  │ Razorpay Gateway    │             │       │
│  │  │                     │  │                      │             │       │
│  │  │ - Users Table       │  │ - Order Creation    │             │       │
│  │  │ - Products Table    │  │ - Payment Verification             │       │
│  │  │ - Carts Table       │  │ - Signature Validation            │       │
│  │  │ - Payments Table    │  │                      │             │       │
│  │  │ - Sessions Table    │  │                      │             │       │
│  │  └─────────────────────┘  └──────────────────────┘             │       │
│  │                                                                  │       │
│  │  ┌─────────────────────┐                                        │       │
│  │  │  File Storage       │                                        │       │
│  │  │  /Backend/uploads   │                                        │       │
│  │  │  (Product Images)   │                                        │       │
│  │  └─────────────────────┘                                        │       │
│  │                                                                  │       │
│  └───────────────────────────────────────────────────────────────┘       │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow

User Interaction:
1. User browses products on React frontend (Port 3000)
2. Frontend calls Express API endpoints (Port 3000 → Port 5000)
3. Backend validates and processes requests with Sequelize models
4. Data persisted in Railway MySQL database
5. For payments: Backend communicates with Razorpay gateway
6. Sessions managed via Express Session Store (linked to MySQL)
7. Response sent back to frontend, UI updated via React Context

## Project Structure

```
RentSafe-Project/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Database configuration
│   │   ├── controllers/            # Business logic
│   │   ├── models/
│   │   │   ├── User.js            # User model
│   │   │   ├── Product.js         # Product/Item model
│   │   │   ├── Cart.js            # Shopping cart model
│   │   │   ├── Payment.js         # Payment records
│   │   │   └── index.js           # Model associations
│   │   ├── middleware/             # Authentication, validation
│   │   ├── routes/
│   │   │   ├── auth.js            # Auth endpoints
│   │   │   ├── products.js        # Product CRUD
│   │   │   ├── cart.js            # Cart operations
│   │   │   ├── payments.js        # Payment processing
│   │   │   └── yourproducts.js    # User's items
│   │   ├── .env                   # Environment variables
│   │   ├── server.js              # Main server file
│   │   ├── seedDatabase.js        # Database seeding
│   │   └── seed.js                # Seed script
│   ├── package.json
│   └── uploads/                   # Product images
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── hero.js            # Hero section
│   │   │   ├── browse.jsx         # Browse/search page
│   │   │   ├── item-details.jsx   # Item details page
│   │   │   ├── Cart.jsx           # Shopping cart
│   │   │   ├── PaymentDialog.jsx  # Payment modal
│   │   │   ├── SearchResults.jsx  # Search results
│   │   │   ├── FeaturedProducts.jsx # Featured products grid
│   │   │   └── ...other components
│   │   ├── context/
│   │   │   └── UserContext.js     # Global user state
│   │   ├── api/
│   │   │   └── axios.js           # API client setup
│   │   ├── views/
│   │   │   └── home.js            # Home page
│   │   └── index.js               # App entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── locales/                   # i18n translations
│
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** database (or use Railway)
- **Git**

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Yamshee-10/RentSafe-Project.git
cd RentSafe-Project
```

#### 2. Setup Backend

```bash
cd Backend

# Install dependencies
npm install

# Create .env file with these variables:
DB_NAME=railway
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=your_railway_host
DB_PORT=33538
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
SUBSCRIPTION_AMOUNT=9900

# Start the backend
npm start
```

Backend will run on `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd Frontend

# Install dependencies
npm install

# Start the frontend
npm start
```

Frontend will run on `http://localhost:3000`

## Database Setup

### Option 1: Using Railway (Recommended)

1. Create a Railway account at https://railway.app
2. Create a new MySQL database
3. Get connection details
4. Update `.env` file with:
   ```
   DB_HOST=your-railway-host.proxy.rlwy.net
   DB_PORT=your_port
   DB_NAME=railway
   DB_USER=root
   DB_PASSWORD=your_password
   ```

### Option 2: Local MySQL

1. Install MySQL locally
2. Create database and user:
   ```sql
   CREATE DATABASE rentsafe;
   CREATE USER 'rentsafe_user'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON rentsafe.* TO 'rentsafe_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
3. Update `.env` with local credentials

### Seed Sample Data

After backend starts, seed 12 sample products:

**Method 1: Browser Console**
```javascript
fetch('http://localhost:5000/api/seed', { method: 'POST' })
  .then(r => r.json())
  .then(d => {
    console.log('✅ Seeded:', d);
    alert(`Added ${d.count} products!`);
    location.reload();
  })
  .catch(e => console.error('Error:', e));
```

**Method 2: Terminal**
```bash
cd Backend
node seed.js
```

## Sample Products

The app comes with 12 pre-configured sample products:

| Product | Price/Month | Min Period |
|---------|------------|-----------|
| BlackBoard | ₹120 | 3 months |
| Sunglasses | ₹500 | 5 months |
| Black Screen | ₹500 | 1 month |
| DSLR Camera | ₹2500 | 2 months |
| Mountain Bike | ₹300 | 1 month |
| Camping Tent | ₹250 | 2 months |
| Projector | ₹800 | 1 month |
| Electric Drill | ₹350 | 1 month |
| Gaming Laptop | ₹2000 | 3 months |
| Yoga Mat | ₹100 | 1 month |
| Pressure Washer | ₹400 | 1 month |
| Drone 4K | ₹3000 | 2 months |

## Key Features and Implementation

### Dynamic Pricing

Each item calculates cost based on monthly rate and rental duration:
```
Total Cost = (Monthly Price × Rental Days) / 30
```

Example: Rent BlackBoard (₹120/month) for 90 days:
```
Cost = (120 × 90) / 30 = ₹360
```

### Minimum Rental Period

Each item enforces a minimum rental period in months. Users cannot select less than this duration.

Example: BlackBoard requires minimum 3 months (90 days)

### Cart System

- Add multiple items with different rental durations
- Edit rental periods in cart
- Real-time total calculation
- Session-based persistence (localStorage)

### Payment Processing

- Razorpay integration for secure payments
- Order creation and verification
- Payment signature validation
- Order tracking

## Environment Configuration

### Backend (.env)

```env
# Database Configuration
DB_NAME=railway
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=your_host
DB_PORT=3306

# Server Configuration
PORT=5000

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
SUBSCRIPTION_AMOUNT=9900
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (with image upload)
- `GET /api/products/lent/:userId` - Get user's products

### Cart
- `GET /api/cart/:userId` - Get cart items
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:cartId` - Remove from cart

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

### Database
- `POST /api/seed` - Seed sample products

## UI/UX Design

- Clean, modern design with smooth animations
- Responsive layout for all devices
- Real-time validation and error messages
- Intuitive cart management
- Clear pricing breakdown
- Product image support
- Search and filter capabilities

## Testing the Application

1. **Browse Items**
   - Go to `/browse-items`
   - Search for products
   - View detailed information

2. **Add to Cart**
   - Click "View Details" on any product
   - Adjust rental duration (respects minimum)
   - Click "Add to Cart"

3. **Checkout**
   - Go to cart
   - Review items and pricing
   - Proceed to checkout
   - Complete Razorpay payment

4. **View Orders**
   - Check order history
   - Track rental status

## Troubleshooting Guide

### Backend Connection Issues
- Verify Railway database credentials in `.env`
- Check if backend is running on port 5000
- Clear browser cache and restart frontend

### Payment Errors
- Verify Razorpay credentials
- Check if backend is running
- Use Razorpay test mode keys

### Cart Shows NaN
- Refresh the page
- Clear localStorage: `localStorage.clear()`
- Restart frontend

### Minimum Rental Not Working
- Ensure product has `minRentalPeriod` set
- Verify in item details page
- Check database for correct values

## Technology Stack Summary

- **Frontend**: React, Axios, React Router, CSS3
- **Backend**: Node.js, Express, Sequelize ORM
- **Database**: MySQL (Sequelize)
- **Payments**: Razorpay API
- **Hosting**: Railway (Database), Local/Vercel (Frontend)
- **Authentication**: Session-based with MySQL store

## Data Flow and Processing

```
User Login
    ↓
Browse Items (from Railway DB)
    ↓
Add to Cart (localStorage + context)
    ↓
Adjust Rental Duration
    ↓
Checkout → Razorpay Payment
    ↓
Payment Verification
    ↓
Order Created (in Database)
    ↓
Success Confirmation
```

## Future Enhancements

- [ ] Advanced search filters
- [ ] User ratings and reviews
- [ ] Notification system
- [ ] Email confirmations
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Subscription plans
- [ ] Social sharing
- [ ] Wishlist feature
- [ ] Admin panel

## Credits

- **Developer**: Lavanya / Yamshee-10

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support and Issues

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Repository**: https://github.com/Yamshee-10/RentSafe-Project

Built by the RentSafe Team

