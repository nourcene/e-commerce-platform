const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        name: 'Test User',
        email: 'user@example.com',
        password: 'user123',
        role: 'user'
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
    }
];

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        await User.deleteMany({});
        console.log('Cleared existing users');

        const createdUsers = await User.insertMany(users);
        console.log(`✅ ${createdUsers.length} users seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding users:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedUsers();
}

module.exports = seedUsers;
