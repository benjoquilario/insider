import React from 'react';
import { ImSpinner3 } from 'react-icons/im';

const Spinner = () => {
  return (
    <div className="absolute top-[50%] left-[50%] text-white flex justify-center items-center">
      <ImSpinner3 className="animate-spin" size={22} />
    </div>
  );
};

export default Spinner;
