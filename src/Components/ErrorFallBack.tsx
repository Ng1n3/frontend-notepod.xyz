import React from 'react';

const ErrorFallBack: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div>
      <h1>Oops! Something went Wrong.</h1>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};

export default ErrorFallBack;
