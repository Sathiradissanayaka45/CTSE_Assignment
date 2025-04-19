import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

const Alert = ({ 
  type = 'info', 
  message, 
  className = '', 
  onClose,
  show = true 
}) => {
  if (!show) return null;
  
  const typeClasses = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };
  
  return (
    <div className={`rounded-md border p-4 ${typeClasses[type]} ${className}`}>
      <div className="flex">
        <div className="flex-grow">
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
        {onClose && (
          <div className="ml-3">
            <button
              type="button"
              className="inline-flex rounded-md bg-transparent text-current hover:bg-opacity-10 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
