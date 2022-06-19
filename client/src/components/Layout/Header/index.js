import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import capitalizeName from '../../../utilities/capitalizeName';
import Logo from '../../../assets/images/icon.png';
import { BsPeopleFill, BsFillPersonFill } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Button from '../../Utilities/Button';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  return (
    <div className="hidden lg:block col-span-3">
      <div className="sticky top-0">
        <Link to="/">
          <div className="text-2xl flex gap-3 justify-center items-center h-14 w-full font-light text-white">
            <img src={Logo} alt="Insider Home" className="h-11 w-11" />
            <span className="uppercase">Insider</span>
          </div>
        </Link>
        <div className="px-2 py-5 rounded">
          <div className="flex justify-center">
            <Link to={`profile/${user?.result?._id}`}>
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://res.cloudinary.com/securing-future/image/upload/v1634784867/lrbkmns3lttmmtdn22y4.jpg"
                alt="name"
              />
            </Link>
            <div className="flex flex-col justify-center ml-2">
              <Link
                to={`profile/${user?.result?._id}`}
                className="text-white text-base font-semibold"
              >
                {capitalizeName(user?.result?.name)}
              </Link>
              <span className="text-gray-200 text-xs">
                {user?.result?.followers.length} Followers
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <nav className="w-full">
            <ul className="flex flex-col items-start gap-1">
              <li className="w-full flex-1 flex items-start">
                <Link
                  className={`${
                    path.includes('/' || '/home')
                      ? 'bg-gray-800 text-[#6a55fa]'
                      : 'text-white'
                  } w-full hover:bg-gray-800 flex items-center gap-4  font-semibold py-[12px] px-[50px] rounded-xl transition`}
                  to="/"
                >
                  <AiFillHome size={29} />
                  <span className="text-md text-white text-left">Home</span>
                </Link>
              </li>
              <li className="w-full flex-1 flex items-start">
                <Link
                  className="w-full hover:bg-gray-800 flex items-center gap-4 text-white font-semibold py-[12px] px-[50px] rounded-xl transition"
                  to="/followers"
                >
                  <BsPeopleFill size={29} />
                  <span className="text-md text-white text-left">
                    Followers
                  </span>
                </Link>
              </li>
              <li className="w-full flex-1 flex items-start">
                <Link
                  className="w-full hover:bg-gray-800 flex items-start gap-4 text-white font-semibold py-[12px] px-[50px] rounded-xl transition"
                  to="/following"
                >
                  <IoIosPeople size={29} />
                  <span className="text-md text-white text-left">
                    Following
                  </span>
                </Link>
              </li>
              <li className="w-full flex-1 flex items-start">
                <Link
                  className="w-full hover:bg-gray-800 flex items-start gap-4 text-white font-semibold py-[12px] px-[50px] rounded-xl transition"
                  to="/following"
                >
                  <BsFillPersonFill size={29} />
                  <span className="text-md text-white text-left">Profile</span>
                </Link>
              </li>
              <li className="w-full flex-1 flex items-center justify-center">
                <Button
                  onClickHandler={() =>
                    dispatch({
                      type: 'CREATE_MODAL',
                      payload: true,
                    })
                  }
                  classes="mt-4 bg-[#6a55fa] flex items-center justify-center text-white h-12 w-full rounded-full hover:bg-[#8371f8] transition duration-75"
                >
                  Create Post
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
/**
 * 
 * 
  <ul className="rounded-xl">
          <li className="h-[16rem] md:col-span-3 mt-3 overflow-auto">
            <div>
              <div className="flex flex-col justify-center w-full border-t border-gray-400 rounded-xl py-3">
                <p className="text-md font-bold text-center text-white">
                  Followers
                </p>
                {/* <p className="text-sm font-semibold text-center mt-2 text-slate-300">
                  You don't have any followers.
                </p> 
                <ul className="flex flex-col gap-1">
                  <li className="relative h-14 overflow-hidden">
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
                          <h3 className="text-white font-semibold leading-tight">
                            Benjo Quilario
                          </h3>
                          <p className="text-gray-200 text-sm">0 Followers</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="relative h-14 overflow-hidden">
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
                          <h3 className="text-white font-semibold leading-tight">
                            Joben Quilario
                          </h3>
                          <p className="text-gray-200 text-sm">99 Followers</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="relative h-14 overflow-hidden">
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
                          <h3 className="text-white font-semibold leading-tight">
                            Joben Quilario
                          </h3>
                          <p className="text-gray-200 text-sm">99 Followers</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="h-[16rem] md:col-span-3 mt-3 overflow-auto">
            <div>
              <div className="flex flex-col justify-center w-full border-t border-gray-400 rounded-xl py-3">
                <p className="text-md font-bold text-center text-white">
                  Following
                </p>
                 <p className="text-sm font-semibold text-center mt-2 text-slate-300">
                  0 following.
                </p> 
                <ul className="flex flex-col gap-1">
                  <li className="relative h-14 overflow-hidden">
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
                          <p className="text-gray-200 text-sm">0 Followers</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="relative h-14 overflow-hidden">
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
                            Joben Quilario
                          </h3>
                          <p className="text-gray-200 text-sm">99 Followers</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="relative h-14 overflow-hidden">
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
                          <h3 className="text-white font-semibold leading-tight">
                            Joben Quilario
                          </h3>
                          <p className="text-gray-200 text-sm">99 Followers</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
 */
