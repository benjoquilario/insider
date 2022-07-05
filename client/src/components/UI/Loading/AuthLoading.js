import React from 'react';
import { ImSpinner3 } from 'react-icons/im';

const AuthLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner3 className="animate-spin" size={22} />
      <span className="ml-2">Checking Credentials...</span>
    </div>
  );
};

export default AuthLoading;
