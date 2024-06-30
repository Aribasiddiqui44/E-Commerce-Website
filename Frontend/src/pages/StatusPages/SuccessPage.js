
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div>
      <h1>Success</h1>
      <p>Your action was successful!</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default SuccessPage;
