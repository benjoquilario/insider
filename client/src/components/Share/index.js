import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import defaultImage from '../../assets/images/default-image.png';
import capitalizeName from '../../utilities/capitalizeName';
import Button from '../Utilities/Button';

const Share = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  return (
    <div className="mt-4 relative h-20 bg-gray-800 flex justify-start items-center rounded p-2 px-1 md:px-3 gap-1 overflow-hidden">
      <div className="min-h-6 w-20 max-w-20">
        <Link
          aria-label={user?.result?.name}
          to={`profile/${user?.result?._id}`}
          tabIndex={0}
        >
          <img
            className="w-11 h-11 rounded-full object-cover m-auto"
            src={defaultImage}
            alt="avatar"
          />
        </Link>
      </div>
      <Button
        onClickHandler={() =>
          dispatch({
            type: 'CREATE_MODAL',
            payload: true,
          })
        }
        classes="w-full h-11 text-gray-400 flex items-center justify-start bg-gray-900 mr-1 p-3 rounded-full shadow-[0_0_12px_-5px_rgba(0,0,0,0.2)] hover:bg-gray-700"
        ariaLabel="create a post"
      >
        <span className="ml-2 text-xs md:text-sm">
          What's on your mind,
          {capitalizeName(user?.result?.name.split(' ')[0])}?
        </span>
      </Button>
    </div>
  );
};

export default Share;
