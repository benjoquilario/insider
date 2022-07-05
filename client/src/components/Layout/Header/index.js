import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsPeopleFill, BsFillPersonFill } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import Logo from '../../../assets/images/icon.png';
import Button from '../../UI/Button/Button';
import defaultImage from '../../../assets/images/default-image.png';
import UserLoading from '../../UI/Loading/UserLoading';
import capitalizeName from '../../../utilities/capitalizeName';
import * as TYPES from '../../../constants/ActionTypes';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const { user, userLoading } = useSelector(state => state.auth);

  return (
    <div className="hidden lg:block col-span-3">
      <div className="sticky top-0">
        <Link to="/" aria-label="home - insider">
          <div className="text-2xl flex gap-3 justify-center items-center h-14 w-full font-light text-white">
            <img src={Logo} alt="Insider - Home" className="h-11 w-11" />
            <span className="uppercase">Insider</span>
          </div>
        </Link>
        {userLoading ? (
          <UserLoading />
        ) : (
          <div className="px-2 py-5 rounded">
            <div className="flex justify-center">
              <Link to={`profile/${user?._id}`} aria-label="profile link">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={user?.imageUrl || defaultImage}
                  alt={user?.name}
                />
              </Link>
              <div className="flex flex-col justify-center ml-2">
                <Link
                  to={`profile/${user?._id}`}
                  className="text-white text-base font-semibold"
                >
                  {capitalizeName(user?.name)}
                </Link>
                <span className="text-gray-200 text-xs">
                  {user?.followers?.length} Followers
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3">
          <nav className="w-full">
            <ul className="flex flex-col items-start gap-1">
              <li className="w-full flex-1 flex items-start">
                <Link
                  aria-label="home"
                  /* prettier-ignore */
                  className={classNames( path === '/' || path === '/home' ? 'bg-gray-800 text-[#6a55fa]': 'text-white', 'hover:bg-gray-800 navLink')}
                  to="/"
                >
                  <AiFillHome aria-hidden="true" size={29} />
                  <span className="text-base text-white text-left">Home</span>
                </Link>
              </li>
              <li className="w-full flex-1 flex items-start">
                <Link
                  aria-label="followers"
                  /* prettier-ignore */
                  className={classNames(path.includes('/followers') ? 'bg-gray-800 text-[#6a55fa]': 'text-white', 'hover:bg-gray-800 navLink')}
                  to="/followers"
                >
                  <BsPeopleFill aria-hidden="true" size={29} />
                  <span className="text-base text-white text-left">
                    Followers
                  </span>
                </Link>
              </li>
              <li className="w-full flex-1 flex items-start">
                <Link
                  aria-label="following"
                  /* prettier-ignore */
                  className={classNames(path.includes('/following') ? 'bg-gray-800 text-[#6a55fa]': 'text-white' , 'hover:bg-gray-800 navLink')}
                  to="/following"
                >
                  <IoIosPeople aria-hidden="true" size={29} />
                  <span className="text-base text-white text-left">
                    Following
                  </span>
                </Link>
              </li>
              <li className="w-full flex-1 flex items-start">
                <Link
                  aria-label="profile"
                  /* prettier-ignore */
                  className={classNames(path.includes('profile') ? 'bg-gray-800 text-[#6a55fa]': 'text-white', 'hover:bg-gray-800 navLink')}
                  to={`/profile/${user?._id}`}
                >
                  <BsFillPersonFill aria-hidden="true" size={29} />
                  <span className="text-base text-white text-left">
                    Profile
                  </span>
                </Link>
              </li>
              <li className="w-full flex-1 mt-3">
                <div className="w-full flex items-center justify-center">
                  <Button
                    onClickHandler={() =>
                      dispatch({
                        type: TYPES.CREATE_MODAL,
                        payload: true,
                      })
                    }
                    ariaLabel="Create post"
                    classes="text-base bg-[#6a55fa] flex items-center justify-center text-white h-12 w-full rounded-full hover:bg-[#8371f8] transition duration-75"
                  >
                    Create Post
                  </Button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
