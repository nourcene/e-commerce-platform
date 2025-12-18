const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Category = require('../models/Category');

dotenv.config();

const seedCustomProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        // Get or create Electronics category
        let electronics = await Category.findOne({ name: 'Electronics' });
        if (!electronics) {
            electronics = await Category.create({
                name: 'Electronics',
                description: 'Electronic devices and accessories'
            });
        }

        // Clear existing products (optional - remove this if you want to keep demo products)
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Custom products with real data
        const customProducts = [
            {
                name: 'TV LG 43 Pouces LED Full HD Smart TV',
                description: `Téléviseur LED LG 43LM6370PVA
        
Caractéristiques:
• Taille: 43 Pouces
• Résolution: FULL HD (1920×1080 pixels)
• Smart TV avec Récepteur Intégré
• Haut-parleurs: 20 Watts
• Taux de refraîchissement: 50 Hz
• Connectivité: WiFi, Bluetooth
• Compatible: Clavier, Souris, Manette USB
• Connecteurs: 3x HDMI, 2x USB 2.0
• Modèle: LM6370PVA
• Couleur: Gris
• Garantie: 2 ans`,
                price: 1299.00,
                stock: 15,
                sku: 'LG-43LM6370PVA',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
                images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'],
                rating: 4.5,
                numReviews: 12,
                isFeatured: true,
                isActive: true
            },
            {
                name: 'Samsung Galaxy S23 Ultra 5G',
                description: `Smartphone Samsung Galaxy S23 Ultra
                
Caractéristiques:
• Écran: 6.8" Dynamic AMOLED 2X
• Processeur: Snapdragon 8 Gen 2
• RAM: 12GB
• Stockage: 256GB
• Caméra: 200MP + 12MP + 10MP + 10MP
• Batterie: 5000mAh
• 5G, WiFi 6E, Bluetooth 5.3
• S Pen intégré
• Garantie: 1 an`,
                price: 3899.00,
                stock: 8,
                sku: 'SAMSUNG-S23-ULTRA',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
                images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
                rating: 4.8,
                numReviews: 45,
                isFeatured: true,
                isActive: true
            },
            {
                name: 'MacBook Air M2 13 Pouces',
                description: `Apple MacBook Air avec puce M2
                
Caractéristiques:
• Écran: 13.6" Liquid Retina
• Processeur: Apple M2
• RAM: 8GB
• SSD: 256GB
• GPU: 8 cœurs
• Autonomie: jusqu'à 18h
• Touch ID
• Clavier rétroéclairé
• Garantie: 1 an`,
                price: 4299.00,
                stock: 5,
                sku: 'APPLE-MBA-M2',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
                images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
                rating: 4.9,
                numReviews: 67,
                isFeatured: true,
                isActive: true
            },
            {
                name: 'Sony WH-1000XM5 Casque Sans Fil',
                description: `Casque à réduction de bruit Sony WH-1000XM5
                
Caractéristiques:
• Réduction de bruit active premium
• Audio haute résolution
• Autonomie: 30 heures
• Charge rapide: 3 min = 3h
• Bluetooth 5.2
• Multipoint connection
• Commandes tactiles
• Microphones intégrés
• Garantie: 2 ans`,
                price: 1199.00,
                stock: 20,
                sku: 'SONY-WH1000XM5',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
                images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'],
                rating: 4.7,
                numReviews: 89,
                isFeatured: true,
                isActive: true
            },
            {
                name: 'iPad Pro 11 Pouces M2',
                description: `Apple iPad Pro 11" avec puce M2
                
Caractéristiques:
• Écran: 11" Liquid Retina
• Processeur: Apple M2
• Stockage: 128GB
• WiFi 6E
• Caméra: 12MP + 10MP
• Face ID
• Compatible Apple Pencil
• USB-C Thunderbolt
• Garantie: 1 an`,
                price: 3499.00,
                stock: 10,
                sku: 'APPLE-IPAD-PRO-11',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
                images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
                rating: 4.8,
                numReviews: 34,
                isFeatured: false,
                isActive: true
            },
            {
                name: 'Canon EOS R6 Mark II',
                description: `Appareil photo Canon EOS R6 Mark II
                
Caractéristiques:
• Capteur: 24.2MP Full Frame
• Vidéo: 4K 60fps
• Stabilisation: 8 stops
• Autofocus: Dual Pixel CMOS AF II
• Rafale: 40 fps
• Écran: 3.2" tactile orientable
• WiFi, Bluetooth
• Double slot carte SD
• Garantie: 2 ans`,
                price: 8999.00,
                stock: 3,
                sku: 'CANON-R6-MKII',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
                images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'],
                rating: 4.9,
                numReviews: 23,
                isFeatured: false,
                isActive: true
            },
            {
                name: 'Nintendo Switch OLED',
                description: `Console Nintendo Switch modèle OLED
                
Caractéristiques:
• Écran: 7" OLED
• Stockage: 64GB
• Mode portable/TV/sur table
• Manettes Joy-Con
• Support réglable
• Audio amélioré
• Port LAN intégré
• Autonomie: 4.5-9h
• Garantie: 1 an`,
                price: 1399.00,
                stock: 12,
                sku: 'NINTENDO-SWITCH-OLED',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
                images: ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500'],
                rating: 4.6,
                numReviews: 156,
                isFeatured: false,
                isActive: true
            },
            {
                name: 'Samsung 55" QLED 4K Smart TV',
                description: `Téléviseur Samsung QLED 55 Pouces
                
Caractéristiques:
• Taille: 55"
• Résolution: 4K UHD (3840x2160)
• Technologie: Quantum Dot
• HDR10+
• Taux: 120Hz
• Smart TV Tizen
• 4x HDMI 2.1
• WiFi, Bluetooth
• Alexa, Google Assistant
• Garantie: 2 ans`,
                price: 2499.00,
                stock: 7,
                sku: 'SAMSUNG-55-QLED',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
                images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'],
                rating: 4.7,
                numReviews: 78,
                isFeatured: true,
                isActive: true
            },
            {
                name: 'Apple AirPods Pro 2',
                description: `Écouteurs Apple AirPods Pro (2ème génération)
                
Caractéristiques:
• Réduction de bruit active
• Mode Transparence adaptatif
• Audio spatial personnalisé
• Puce H2
• Autonomie: 6h (30h avec boîtier)
• Résistance: IPX4
• Charge MagSafe, Lightning, Qi
• Contrôle tactile
• Garantie: 1 an`,
                price: 899.00,
                stock: 25,
                sku: 'APPLE-AIRPODS-PRO2',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
                images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500'],
                rating: 4.8,
                numReviews: 234,
                isFeatured: false,
                isActive: true
            },
            {
                name: 'Dell XPS 15 Laptop',
                description: `Ordinateur portable Dell XPS 15
                
Caractéristiques:
• Écran: 15.6" FHD+
• Processeur: Intel Core i7-13700H
• RAM: 16GB DDR5
• SSD: 512GB NVMe
• GPU: NVIDIA RTX 4050
• Webcam: 720p
• WiFi 6E, Bluetooth 5.2
• Clavier rétroéclairé
• Garantie: 1 an`,
                price: 5299.00,
                stock: 6,
                sku: 'DELL-XPS-15',
                category: electronics._id,
                imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
                images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'],
                rating: 4.6,
                numReviews: 42,
                isFeatured: false,
                isActive: true
            }
        ];

        const createdProducts = await Product.insertMany(customProducts);
        console.log(`✅ ${createdProducts.length} custom product(s) added successfully`);

        console.log('\nProducts added:');
        createdProducts.forEach(product => {
            console.log(`- ${product.name} (${product.sku}) - ${product.price} TND`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding custom products:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedCustomProducts();
}

module.exports = seedCustomProducts;
