import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all hover:shadow-lg">
      <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-gray-400 text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm truncate mt-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        </div>
        <Link 
          to={`/products/${product._id}`} 
          className="mt-4 block text-center py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
