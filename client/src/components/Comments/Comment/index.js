import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import capitalizeName from '../../../utilities/capitalizeName';

const Comment = ({ comment }) => {
  return (
    <div className="flex items-start pl-5 pr-3 mt-3">
      <div
        style={{
          position: 'fixed',
          zIndex: '9999',
          inset: '16px',
          pointerEvents: 'none',
        }}
      ></div>
      <img
        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
        className="object-cover h-11 w-11 rounded-full mr-2"
        alt="profile"
      />
      <div className="flex items-center flex-shrink">
        <div className="bg-gray-700 rounded-3xl items-center py-2.5 px-4">
          <div className="flex space-x-1">
            <Link to="profile">
              <h3 className="font-semibold -mt-0.5 text-sm text-gray-100">
                {capitalizeName(comment.user[0].name)} ·{' '}
              </h3>
            </Link>
            <span className="text-gray-200 font-light text-sm no-underline">
              {/* {moment(comment.createdAt)} */}
            </span>
          </div>
          <p className="text-gray-300 font-light">{comment.comment}</p>
        </div>
        <div style={{ width: '3rem', marginLeft: '0.2rem' }}>
          <div
            className="CommentComponent__ThreeDotsDiv-sc-12j1abr-2 dEfgTX"
            style={{ visibility: 'hidden' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
