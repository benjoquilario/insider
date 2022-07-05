import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsPeopleFill } from 'react-icons/bs';
import { BiExit } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import classNames from 'classnames';
import * as TYPES from '../../../constants/ActionTypes';

const MobileNav = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();
  const { user } = useSelector(state => state.auth);

  const logout = () => {
    dispatch({ type: TYPES.LOGOUT });
    navigate('/auth', { replace: true });
  };

  return (
    <div className="fixed z-20 lg:hidden bottom-0 right-0 left-0 bg-[#0f1625] rounded-t-3xl shadow-md p-1">
      <ul className="text-white flex justify-around items-center gap-3">
        <li className="">
          <Link
            /*prettier-ignore */
            className={classNames(path === '/' || path === '/home' ? 'text-[#6a55fa]' : 'text-white', 'hover:bg-gray-800 flex justify-center items-center p-1 rounded-full')}
            to="/"
          >
            <AiFillHome aria-hidden="true" size={22} />
          </Link>
        </li>
        <li className="">
          <Link
            to="/followers"
            /*prettier-ignore */
            className={classNames(path.includes('/followers') ? 'text-[#6a55fa]': 'text-white', 'flex justify-center items-center p-1 hover:bg-gray-800 rounded-full')}
          >
            <BsPeopleFill aria-hidden="true" size={22} />
          </Link>
        </li>
        <li className="">
          <Link
            to={`profile/${user?._id}`}
            className="flex justify-center items-center p-1 hover:bg-gray-800 rounded-full"
          >
            <img
              src={user?.imageUrl}
              alt={user?.name}
              className="bg-gray-800 h-11 w-11 rounded-full object-cover object-center border-2 border-borderProfile cursor-pointer -mt-3"
            />
          </Link>
        </li>
        <li className="">
          <Link
            to="/following"
            /* prettier-ignore */
            className={classNames(path.includes('/following') ? 'text-[#6a55fa]': 'text-white', 'flex justify-center items-center p-1 hover:bg-gray-800 rounded-full')}
          >
            <IoIosPeople aria-hidden="true" size={22} />
          </Link>
        </li>
        <li className="">
          <button
            onClick={logout}
            className="hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-25 rounded-full p-2 transition ease-in duration-75"
          >
            <BiExit aria-hidden="true" size={22} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
