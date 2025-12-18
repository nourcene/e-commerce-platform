const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');

dotenv.config();

const categories = [
    {
        name: 'Electronics',
        description: 'Electronic devices and accessories'
    },
    {
        name: 'Clothing',
        description: 'Fashion and apparel'
    },
    {
        name: 'Books',
        description: 'Books and literature'
    },
    {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies'
    },
    {
        name: 'Sports',
        description: 'Sports equipment and accessories'
    },
    {
        name: 'Toys',
        description: 'Toys and games for all ages'
    }
];

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        await Category.deleteMany({});
        console.log('Cleared existing categories');

        const createdCategories = await Category.insertMany(categories);
        console.log(`✅ ${createdCategories.length} categories seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding categories:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedCategories();
}

module.exports = seedCategories;
