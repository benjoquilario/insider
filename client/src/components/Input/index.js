import React from 'react';

const Input = ({ label, name, placeholder, type, handleChange }) => (
  <div className="flex flex-col items-start w-full">
    <label className="font-normal text-sm mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      onChange={handleChange}
      type={type}
      name={name}
      placeholder={placeholder}
      className="bg-white border-2 border-gray-300 rounded text-[#9FADBD] text-sm font-semibold leading-[40px] h-[40px] mb-[8px] px-[15px] w-full outline-none hover:border-gray-900 focus:border-blue-500"
      aria-required="true"
      aria-describedby={name}
    />
  </div>
);

export default Input;
