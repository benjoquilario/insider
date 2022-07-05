import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import defaultImage from '../../assets/images/default-image.png';
import capitalizeName from '../../utilities/capitalizeName';
import Button from '../UI/Button/Button';
import { CREATE_MODAL } from '../../constants/ActionTypes';

const Share = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="my-4 relative h-20 bg-gray-800 flex justify-start items-center rounded p-2 px-1 md:px-3 gap-2 overflow-hidden">
      <div className="min-h-6 w-12 max-w-20">
        <Link aria-label={user?.name} to={`profile/${user?._id}`} tabIndex={0}>
          <figure className="relative w-full h-full overflow-hidden before:absolute before:w-full before:bg-gray-900 before:top-0 before:left-0 before:h-full before:rounded-full before:-z-10">
            <img
              className="w-11 h-11 rounded-full object-cover m-auto"
              src={user?.imageUrl || defaultImage}
              alt="avatar"
            />
          </figure>
        </Link>
      </div>
      <Button
        onClickHandler={() =>
          dispatch({
            type: CREATE_MODAL,
            payload: true,
          })
        }
        classes="w-full h-11 text-gray-400 flex items-center justify-start bg-gray-900 mr-1 p-3 rounded-full shadow-[0_0_12px_-5px_rgba(0,0,0,0.2)] hover:bg-gray-700"
        ariaLabel="create a post"
      >
        <span className="ml-2 text-xs md:text-sm">
          What's on your mind,
          {capitalizeName(user?.name?.split(' ')[0])}?
        </span>
      </Button>
    </div>
  );
};

export default Share;
