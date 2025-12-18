const Product = require('../models/Product');
const { paginate, getPaginationMeta } = require('../utils/helpers');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 12, category, search, minPrice, maxPrice, sort = '-createdAt' } = req.query;

        // Build query
        const query = { isActive: true };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Pagination
        const { skip, limit: limitNum, page: pageNum } = paginate(page, limit);

        // Execute query
        const products = await Product.find(query)
            .populate('category', 'name')
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        const total = await Product.countDocuments(query);

        res.json({
            products,
            pagination: getPaginationMeta(total, pageNum, limitNum)
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Soft delete
        product.isActive = false;
        await product.save();

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ isActive: true, isFeatured: true })
            .populate('category', 'name')
            .limit(8);

        res.json(products);
    } catch (error) {
        next(error);
    }
};
