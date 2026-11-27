import React from 'react';
import { X } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="mb-4 rounded-md bg-error-soft p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <X className="h-5 w-5 text-error" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:items-center md:justify-between">
          <p className="text-sm font-medium text-error-dark">{message}</p>
          {onClose && (
            <button
              type="button"
              className="ml-3 inline-flex rounded-md bg-error-soft p-1.5 text-error hover:bg-error-soft focus:outline-none focus:ring-2 focus:ring-error-dark focus:ring-offset-2 focus:ring-offset-red-50"
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
