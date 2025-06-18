import { v4 as uuidv4 } from 'uuid';

// In-memory storage for products
let products = [];

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
    res.json({
        success: true,
        count: products.length,
        data: products
    });
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProduct = async (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    res.json({
        success: true,
        data: product
    });
};

// @desc    Create new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
    const { name, description, price, category } = req.body;
    
    // Validate required fields
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name and price'
        });
    }

    // Validate price
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({
            success: false,
            message: 'Price must be a positive number'
        });
    }

    // Create new product with UUID
    const newProduct = {
        id: uuidv4(),
        name,
        description: description || '',
        price: parsedPrice,
        category: category || 'uncategorized',
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        data: newProduct
    });
};

// @desc    Update product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
    const { name, description, price, category } = req.body;
    const productIndex = products.findIndex(p => p.id === req.params.id);
    
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    // Update product
    products[productIndex] = {
        ...products[productIndex],
        name: name || products[productIndex].name,
        description: description !== undefined ? description : products[productIndex].description,
        price: price ? parseFloat(price) : products[productIndex].price,
        category: category || products[productIndex].category,
        updatedAt: new Date().toISOString()
    };

    res.json({
        success: true,
        data: products[productIndex]
    });
};

// @desc    Delete product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    products.splice(productIndex, 1);

    res.json({
        success: true,
        message: 'Product deleted successfully'
    });
}; 