import React from 'react';
import { Link } from 'react-router-dom';
import { BiExit } from 'react-icons/bi';
import Button from '../Button/Button';
import defaultImage from '../../../assets/images/default-image.png';

const Dropdown = ({ user, logout }) => {
  return (
    <div className="absolute top-10 left-0 flex flex-col justify-center items-center w-48 bg-gray-800 px-4 rounded-md shadow-md z-10">
      <Button
        onClickHandler={logout}
        classes="rounded-xl flex items-center justify-center gap-1 text-white w-full py-2 px-3 hover:bg-gray-900 transition duration-75"
        ariaLabel="logout user"
      >
        <BiExit aria-hidden="true" size={18} />
        <span className="text-sm">Logout</span>
      </Button>
    </div>
  );
};

export default Dropdown;
