import { useState, useEffect } from 'react';
import { getAllProducts } from '../../api/productService';
import ProductCard from './ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import Alert from '../ui/Alert';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0
  });

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getAllProducts(page, pagination.limit);
      setProducts(response.data || []);
      setPagination({
        ...pagination,
        page,
        total: response.pagination?.total || 0,
        pages: response.pagination?.pages || 0
      });
      setError('');
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchProducts(newPage);
    }
  };

  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {error && (
        <Alert 
          type="error" 
          message={error} 
          className="mb-6"
        />
      )}
      
      {!loading && products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">There are no products available at the moment.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          {pagination.pages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`px-3 py-1 rounded ${pagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded ${pagination.page === pageNum ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className={`px-3 py-1 rounded ${pagination.page === pagination.pages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
      
      {loading && products.length > 0 && <LoadingSpinner />}
    </div>
  );
};

export default ProductList;
