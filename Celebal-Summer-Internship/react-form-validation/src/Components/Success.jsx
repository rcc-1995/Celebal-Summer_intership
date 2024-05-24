import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { state } = location;
  const { formData } = state || {};

  if (!formData) {
    return <div>No data submitted</div>;
  }

  return (
    <div>
      <h1>Form Submission Successful</h1>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default Success;