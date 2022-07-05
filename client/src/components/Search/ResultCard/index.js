import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Ripples from 'react-ripples';
import { useDispatch } from 'react-redux';
import { followUser } from '../../../actions/user';
import defaultImage from '../../../assets/images/default-image.png';

const ResultCard = ({ result }) => {
  const { user } = useSelector(state => state.auth);
  const isFollowing = result.following.some(follow => follow === user?._id);
  const dispatch = useDispatch();

  return (
    <li className="relative h-16 overflow-hidden rounded-md">
      <Link to={`/profile/${result._id}`} aria-label={result._id}>
        {result.coverPhoto && (
          <img
            className="object-cover w-full h-full opacity-30 object-center"
            src={result.coverPhoto}
            alt={result.name}
          />
        )}
        <div className="absolute inset-0 flex items-center overflow-hidden rounded-md border border-gray-700 border-solid">
          <div className="ml-2">
            <img
              className="w-10 h-10 md:h-11 md:w-11 rounded-full"
              src={result.imageUrl || defaultImage}
              alt={result.name}
            />
          </div>
          <div className="ml-2 flex-1">
            <h3 className="text-sm text-white font-semibold leading-tight capitalize">
              {result.name}
            </h3>
          </div>
        </div>
      </Link>
      {isFollowing ? (
        <div className="absolute top-4 right-3 ml-auto gap-1 flex justify-center items-center h-8 w-28 md:w-20 rounded-md text-white bg-[#6a55fa]">
          <BsFillCheckCircleFill aria-hidden="true" size={15} />
          <span className="text-xs">Following</span>
        </div>
      ) : (
        <div className="absolute top-4 right-3">
          <Ripples color="#ffffff80">
            <button
              onClick={() => dispatch(followUser(result?._id))}
              aria-label="follow user"
              className="ml-auto flex justify-center items-center gap-1 h-8 h-8 w-28 md:w-20 rounded-md text-white bg-[#6a55fa]"
            >
              <BsFillPersonPlusFill aria-hidden="true" size={15} />
              <span className="text-xs">Follow</span>
            </button>
          </Ripples>
        </div>
      )}
    </li>
  );
};

export default ResultCard;
