const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    index: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    index: true 
  },
  imageUrl: { 
    type: String 
  },
  inStock: { 
    type: Boolean, 
    default: true 
  },
  quantity: { 
    type: Number, 
    default: 0 
  },
  attributes: { 
    type: Map, 
    of: String 
  },
}, { 
  timestamps: true 
});

// Create text index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);