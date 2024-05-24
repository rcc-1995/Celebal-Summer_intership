// src/components/withNavigation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
