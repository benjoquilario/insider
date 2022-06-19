import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import capitalizeName from '../../../utilities/capitalizeName';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { BiExit } from 'react-icons/bi';

const Right = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="hidden xl:block xl:col-span-3">
      <div className="sticky top-0">
        <div className="flex justify-between items-center">
          <div className="flex py-2 px-3 rounded-full overflow-hidden hover:bg-gray-800">
            <Link
              to={`profile/${user?.result?._id}`}
              className="flex justify-center items-center"
            >
              <div>
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://res.cloudinary.com/securing-future/image/upload/v1634784867/lrbkmns3lttmmtdn22y4.jpg"
                  alt="name"
                />
              </div>
              <div className="flex flex-col justify-center ml-2">
                <h2 className="text-white text-sm font-semibold">
                  {capitalizeName(user?.result?.name)}
                </h2>
              </div>
            </Link>
          </div>
          <div>
            <button
              onClick={() => setDropdown(prev => !prev)}
              className="flex justify-center items-center h-9 w-9 rounded-full bg-gray-800 text-white"
            >
              <IoMdArrowDropdown size={20} />
            </button>
            {dropdown && (
              <div className="absolute top-14 right-0 flex flex-col justify-center items-center w-48 bg-gray-800 py-3 px-4 rounded-md shadow-md z-10">
                <Link to="/profile" className="flex items-center gap-2">
                  <div>
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src="https://res.cloudinary.com/securing-future/image/upload/v1634784867/lrbkmns3lttmmtdn22y4.jpg"
                      alt="name"
                    />
                  </div>
                  <div className="flex flex-col ml-1">
                    <h3 className="text-sm text-white">Benjo Quilario</h3>
                    <p className="text-xs text-gray-400">My Profile</p>
                  </div>
                </Link>
                <button className="border-t border-gray-400 rounded-xl mt-4 flex items-center justify-center gap-1 text-white w-full py-2 px-3 hover:bg-gray-900 transition duration-75">
                  <BiExit size={18} />
                  <span className="text-sm">Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          <div>
            <div className="flex flex-col justify-center w-full border-t border-gray-400 rounded-xl py-3">
              <p className="text-md font-bold text-center text-white">
                Who to follow
              </p>
              <ul className="mt-3 w-full max-h-96 overflow-y-auto space-y-2">
                <li className="relative h-16 overflow-hidden rounded-md">
                  <Link to="profile">
                    <img
                      className="object-cover w-full h-full opacity-30 object-center"
                      src="https://res.cloudinary.com/securing-future/image/upload/v1655122268/w0luocz79lomub3hjj1j.jpg"
                      alt=""
                    />
                    <div className="absolute inset-0 flex items-center overflow-hidden">
                      <div className="ml-3">
                        <img
                          className="h-12 w-12 rounded-full"
                          src="https://res.cloudinary.com/securing-future/image/upload/v1655122317/dcz9vemzk4be34heot7d.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm text-white font-semibold leading-tight">
                          Benjo Quilario
                        </h3>
                        <p className="text-gray-200 text-xs">0 Followers</p>
                      </div>
                      <button className="ml-auto mr-3 flex justify-center items-center h-8 w-8 rounded-md text-white bg-[#6a55fa]">
                        <BsFillPersonPlusFill size={15} />
                      </button>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;

/**
 *  <span className="relative px-[6px] flex items-center ">
              <button className="md:w-14 md:h-6 w-12 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer">
                <div
                  className={`bg-[#6a55fa] md:w-5 md:h-5 h-4 w-4 rounded-full shadow-md transform${
                    toggle ? null : toggleClass
                  }`}
                ></div>
              </button>
            </span>
 */
