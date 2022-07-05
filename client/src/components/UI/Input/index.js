import React from 'react';

const Input = ({ label, name, placeholder, type, handleChange, classes }) => (
  <>
    <label className="font-normal text-sm mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      onChange={handleChange}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`bg-white rounded text-gray-700 text-sm font-normal leading-[40px] h-[40px] px-[15px] w-full outline-none ${classes}`}
      aria-required="true"
      aria-describedby={name}
    />
  </>
);

export default Input;
