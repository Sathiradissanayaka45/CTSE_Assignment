const { Category, Product } = require('../models');
const { slugify, getPaginationData } = require('../utils/helpers');
const mongoose = require('mongoose');

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Private (Admin only)
 */
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Create a slug from the name
    const slug = slugify(name);
    
    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }
    
    // Create new category
    const category = await Category.create({
      name,
      description,
      slug
    });
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select('name description slug')
      .sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
const getCategoryById = async (req, res) => {
  try {
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID format'
      });
    }
    
    const category = await Category.findById(req.params.id)
      .select('name description slug');
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get products by category
 * @route   GET /api/categories/:id/products
 * @access  Public
 */
const getProductsByCategory = async (req, res) => {
  try {
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID format'
      });
    }
    
    // Check if category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Sorting
    const sortBy = req.query.sort || 'createdAt';
    const sortOrder = req.query.direction === 'asc' ? 1 : -1;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;
    
    // Query products
    const products = await Product.find({ 
      category: req.params.id,
      isActive: true
    })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const count = await Product.countDocuments({ 
      category: req.params.id,
      isActive: true
    });
    
    res.status(200).json({
      success: true,
      data: products,
      pagination: getPaginationData(count, page, limit)
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 * @access  Private (Admin only)
 */
const updateCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID format'
      });
    }
    
    // Find category
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Create update object
    const updateData = {};
    
    if (name !== undefined) {
      updateData.name = name;
      updateData.slug = slugify(name);
      
      // Check if slug will conflict with another category
      if (name !== category.name) {
        const existingCategory = await Category.findOne({ 
          slug: updateData.slug,
          _id: { $ne: category._id }
        });
        
        if (existingCategory) {
          return res.status(400).json({
            success: false,
            message: 'Category with this name already exists'
          });
        }
      }
    }
    
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    // Update category
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Private (Admin only)
 */
const deleteCategory = async (req, res) => {
  try {
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID format'
      });
    }
    
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Check if category has products
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with associated products. Remove or reassign products first.'
      });
    }
    
    await category.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getProductsByCategory,
  updateCategory,
  deleteCategory
};
