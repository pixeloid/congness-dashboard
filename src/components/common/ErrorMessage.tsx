import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-red-500/10 text-red-500 p-4 rounded-lg flex items-center gap-3">
        <ExclamationTriangleIcon className="h-6 w-6 flex-shrink-0" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;