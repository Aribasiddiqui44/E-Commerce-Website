// src/CancelPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div>
      <h1>Cancel</h1>
      <p>Your action was cancelled.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default CancelPage;
