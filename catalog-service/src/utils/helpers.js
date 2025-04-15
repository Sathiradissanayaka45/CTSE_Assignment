/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - The text to convert to a slug
 * @return {string} The slugified text
 */
const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-')   // Replace multiple - with single -
      .substring(0, 100);       // Trim to reasonable length
  };
  
  /**
   * Format pagination data for response
   * @param {number} count - Total count of items
   * @param {number} page - Current page
   * @param {number} limit - Items per page
   * @return {Object} Formatted pagination data
   */
  const getPaginationData = (count, page, limit) => {
    const totalPages = Math.ceil(count / limit);
    
    return {
      total: count,
      page: page,
      limit: limit,
      pages: totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  };
  
  module.exports = {
    slugify,
    getPaginationData
  };
  