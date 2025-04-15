// Password strength validation
const validatePasswordStrength = (password) => {
    // At least 8 characters, uppercase, lowercase, number and special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!strongPasswordRegex.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
      };
    }
    
    return { isValid: true };
  };
  
  module.exports = {
    validatePasswordStrength
  };
  