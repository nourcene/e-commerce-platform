const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Get product reviews
// @route   GET /api/reviews/product/:productId
// @access  Public
exports.getProductReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId,
            isApproved: true
        })
            .populate('user', 'name')
            .sort('-createdAt');

        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
    try {
        const { product, rating, comment } = req.body;

        // Check if product exists
        const productExists = await Product.findById(product);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user already reviewed
        const existingReview = await Review.findOne({
            product,
            user: req.user._id
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        // Create review
        const review = await Review.create({
            product,
            user: req.user._id,
            rating,
            comment
        });

        // Update product rating
        const reviews = await Review.find({ product, isApproved: true });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        productExists.rating = avgRating;
        productExists.numReviews = reviews.length;
        await productExists.save();

        await review.populate('user', 'name');

        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user owns review or is admin
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        const productId = review.product;
        await review.deleteOne();

        // Update product rating
        const reviews = await Review.find({ product: productId, isApproved: true });
        const product = await Product.findById(productId);

        if (reviews.length > 0) {
            const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
            product.rating = avgRating;
            product.numReviews = reviews.length;
        } else {
            product.rating = 0;
            product.numReviews = 0;
        }

        await product.save();

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        next(error);
    }
};
