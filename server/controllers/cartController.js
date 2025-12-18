const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        // Convert to object to ensure subdocument IDs are included
        const cartObj = cart.toObject();
        res.json(cartObj);
    } catch (error) {
        next(error);
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        // Check if item already in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            });
        }

        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Update cart item
// @route   PUT /api/cart/:itemId
// @access  Private
exports.updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.id(req.params.itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (quantity <= 0) {
            // Use pull instead of remove
            cart.items.pull(req.params.itemId);
        } else {
            item.quantity = quantity;
        }

        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Use pull instead of remove (deprecated)
        cart.items.pull(req.params.itemId);

        await cart.save();
        await cart.populate('items.product');

        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();

        res.json(cart);
    } catch (error) {
        next(error);
    }
};
