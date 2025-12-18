const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Category = require('../models/Category');

dotenv.config();

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        // Get categories
        const categories = await Category.find({});

        if (categories.length === 0) {
            console.log('⚠️  No categories found. Please run seedCategories first.');
            process.exit(1);
        }

        const electronics = categories.find(c => c.name === 'Electronics');
        const clothing = categories.find(c => c.name === 'Clothing');
        const books = categories.find(c => c.name === 'Books');
        const homeGarden = categories.find(c => c.name === 'Home & Garden');
        const sports = categories.find(c => c.name === 'Sports');
        const toys = categories.find(c => c.name === 'Toys');

        const products = [
            // Electronics
            {
                name: 'Wireless Headphones',
                description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
                price: 299.99,
                stock: 50,
                sku: 'ELEC-WH-001',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
                images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
                rating: 4.5,
                numReviews: 128,
                isFeatured: true
            },
            {
                name: 'Smart Watch',
                description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
                price: 399.99,
                stock: 35,
                sku: 'ELEC-SW-002',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
                images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
                rating: 4.7,
                numReviews: 95,
                isFeatured: true
            },
            {
                name: 'Laptop Pro',
                description: '15-inch laptop with Intel i7, 16GB RAM, 512GB SSD',
                price: 1299.99,
                stock: 20,
                sku: 'ELEC-LP-003',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
                images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'],
                rating: 4.8,
                numReviews: 210,
                isFeatured: true
            },
            {
                name: 'Wireless Mouse',
                description: 'Ergonomic wireless mouse with precision tracking',
                price: 49.99,
                stock: 100,
                sku: 'ELEC-WM-004',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
                images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'],
                rating: 4.3,
                numReviews: 67
            },

            // Clothing
            {
                name: 'Classic T-Shirt',
                description: '100% cotton comfortable t-shirt in various colors',
                price: 24.99,
                stock: 200,
                sku: 'CLO-TS-001',
                category: clothing._id,
                imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
                images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
                rating: 4.4,
                numReviews: 156,
                isFeatured: true
            },
            {
                name: 'Denim Jeans',
                description: 'Classic fit denim jeans with stretch comfort',
                price: 79.99,
                stock: 80,
                sku: 'CLO-DJ-002',
                category: clothing._id,
                imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
                images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
                rating: 4.6,
                numReviews: 89
            },
            {
                name: 'Winter Jacket',
                description: 'Warm insulated jacket perfect for cold weather',
                price: 149.99,
                stock: 45,
                sku: 'CLO-WJ-003',
                category: clothing._id,
                imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
                images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'],
                rating: 4.7,
                numReviews: 134
            },

            // Books
            {
                name: 'The Great Novel',
                description: 'Bestselling fiction novel by renowned author',
                price: 19.99,
                stock: 150,
                sku: 'BOOK-FIC-001',
                category: books._id,
                imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
                images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
                rating: 4.8,
                numReviews: 342
            },
            {
                name: 'Programming Guide',
                description: 'Comprehensive guide to modern web development',
                price: 49.99,
                stock: 75,
                sku: 'BOOK-TECH-002',
                category: books._id,
                imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
                images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500'],
                rating: 4.9,
                numReviews: 178,
                isFeatured: true
            },

            // Home & Garden
            {
                name: 'Coffee Maker',
                description: 'Programmable coffee maker with thermal carafe',
                price: 89.99,
                stock: 60,
                sku: 'HOME-CM-001',
                category: homeGarden._id,
                imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
                images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'],
                rating: 4.5,
                numReviews: 92
            },
            {
                name: 'Plant Pot Set',
                description: 'Set of 3 ceramic plant pots with drainage',
                price: 34.99,
                stock: 120,
                sku: 'GARDEN-PP-002',
                category: homeGarden._id,
                imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
                images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500'],
                rating: 4.6,
                numReviews: 54
            },

            // Sports
            {
                name: 'Yoga Mat',
                description: 'Non-slip yoga mat with carrying strap',
                price: 39.99,
                stock: 90,
                sku: 'SPORT-YM-001',
                category: sports._id,
                imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
                images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
                rating: 4.7,
                numReviews: 112,
                isFeatured: true
            },
            {
                name: 'Dumbbell Set',
                description: 'Adjustable dumbbell set 5-25 lbs',
                price: 129.99,
                stock: 40,
                sku: 'SPORT-DB-002',
                category: sports._id,
                imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
                images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500'],
                rating: 4.8,
                numReviews: 87
            },

            // Toys
            {
                name: 'Building Blocks Set',
                description: '500-piece creative building blocks for kids',
                price: 44.99,
                stock: 110,
                sku: 'TOY-BB-001',
                category: toys._id,
                imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500',
                images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500'],
                rating: 4.9,
                numReviews: 203
            },
            {
                name: 'Board Game',
                description: 'Family-friendly strategy board game',
                price: 29.99,
                stock: 85,
                sku: 'TOY-BG-002',
                category: toys._id,
                imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500',
                images: ['https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500'],
                rating: 4.6,
                numReviews: 145
            }
        ];

        await Product.deleteMany({});
        console.log('Cleared existing products');

        const createdProducts = await Product.insertMany(products);
        console.log(`✅ ${createdProducts.length} products seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding products:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedProducts();
}

module.exports = seedProducts;
