import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../../assets/images/default-image.png';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const FollowCard = ({ follower }) => {
  return (
    <Link
      to={`profile/${follower._id}`}
      className="flex items-center justify-between p-2 rounded-lg bg-gray-800"
    >
      <div className="flex items-center gap-2">
        <img
          src={follower.imageUrl || defaultImage}
          className="w-11 h-11 md:w-12 md:h-12 object-cover rounded-full"
          alt=""
        />
        <h2 className="capitalize text-white text-sm">{follower.name}</h2>
      </div>
      <div className="h-auto bg-[#6a55fa] rounded-md flex text-white p-2 text-xs">
        <BsFillCheckCircleFill aria-hidden="true" size={15} />
        <span className="ml-1">Following</span>
      </div>
    </Link>
  );
};

export default FollowCard;
