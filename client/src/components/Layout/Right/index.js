import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from 'react-icons/io';

import UserCard from '../../UserCard';
import UsersLoading from '../../UI/Loading/UsersLoading';
import Dropdown from '../../UI/Dropdown';
import * as TYPES from '../../../constants/ActionTypes';

const Right = () => {
  const { user } = useSelector(state => state.auth);
  const users = useSelector(state => state.users);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: TYPES.LOGOUT });
    navigate('/auth', { replace: true });
  };

  return (
    <div className="hidden xl:block xl:col-span-3">
      <div className="sticky top-0">
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => setDropdown(prev => !prev)}
              className="flex justify-center items-center h-9 w-9 rounded-full bg-gray-800 text-white"
              aria-label="list box"
              aria-expanded={dropdown}
            >
              <IoMdArrowDropdown size={20} />
            </button>
            {dropdown && <Dropdown user={user} logout={logout} />}
          </div>
        </div>
        <div className="mt-14">
          <div>
            <div className="flex flex-col justify-center w-full border-t border-gray-400 rounded-xl py-3">
              <p className="text-md font-bold text-center text-white">
                Who to follow
              </p>
              {users?.users?.length === 0 ? (
                Array.from(Array(5), (_, index) => <UsersLoading key={index} />)
              ) : (
                <ul className="mt-3 w-full max-h-96 overflow-y-auto space-y-2">
                  {users?.users?.map((profile, index) => {
                    if (profile._id === user?._id) return null;

                    return <UserCard key={index} profile={profile} />;
                  })}
                  {users?.loading ? (
                    <div>Loading...</div>
                  ) : (
                    <li className="flex justify-center items-center">
                      <button
                        onClick={() => dispatch({ type: TYPES.ADD_PAGE })}
                        className="text-white"
                      >
                        Load More
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
