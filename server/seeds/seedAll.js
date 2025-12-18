const seedCategories = require('./seedCategories');
const seedUsers = require('./seedUsers');
const seedProducts = require('./seedProducts');

const seedAll = async () => {
    try {
        console.log('🌱 Starting database seeding...\n');

        await seedCategories();
        console.log('');

        await seedUsers();
        console.log('');

        await seedProducts();
        console.log('');

        console.log('✅ All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error in seeding process:', error);
        process.exit(1);
    }
};

seedAll();
