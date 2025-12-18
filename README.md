# 🛍️ E-Commerce Platform

A full-stack e-commerce platform built with MongoDB, Express, React, and Node.js.

## ✨ Features

### Customer Features
- 🔐 User authentication (register, login, JWT)
- 🛒 Shopping cart management
- 📦 Product browsing with search and filters
- ⭐ Product reviews and ratings
- 📋 Order history and tracking
- 👤 User profile management

### Admin Features
- 📊 Admin dashboard with statistics
- ➕ Product management (CRUD operations)
- 📦 Order management and status updates
- 🏷️ Category management
- 👥 User management

### Technical Features
- 🔒 JWT authentication
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🌙 Dark/Light theme support
- ⚡ Fast performance with Vite
- 🔄 Real-time cart updates
- 🎯 Protected routes
- 🛡️ Error handling and validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm 

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dream-shop
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create `.env` files in both `server/` and `client/` directories:
   
   **server/.env**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```
   
   **client/.env**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Run the application**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend dev server on http://localhost:5173

## 📁 Project Structure

```
ecommerce-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   └── utils/         # Utilities
│   └── package.json
│
├── server/                # Node.js backend
│   ├── config/           # Configuration
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utilities
│   └── seeds/            # Database seeders
│
└── package.json          # Root package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `DELETE /api/reviews/:id` - Delete review

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

## 🛠️ Technologies

### Frontend
- React 18
- React Router v6
- Axios
- Tailwind CSS
- Lucide React (icons)
- Vite

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Express Validator

## 👥 Default Users

After seeding, you can login with:

**Admin Account**
- Email: admin@example.com
- Password: admin123

**Test User**
- Email: user@example.com
- Password: user123

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
"# e-commerce-platform" 
