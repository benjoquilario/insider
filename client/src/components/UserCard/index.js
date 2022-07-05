import React from 'react';
import Ripples from 'react-ripples';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/images/default-image.png';
import { BsFillPersonPlusFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { followUser } from '../../actions/user';

const Profile = ({ profile }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  return (
    <li className="relative h-16 overflow-hidden rounded-md">
      <Link to={`/profile/${profile._id}`} aria-label={profile._id}>
        {profile.coverPhoto && (
          <img
            className="object-cover w-full h-full opacity-30 object-center"
            src={profile.coverPhoto}
            alt=""
          />
        )}
        <div className="absolute inset-0 flex items-center overflow-hidden rounded-md border border-gray-700 border-solid">
          <div className="ml-3">
            <img
              className="h-12 w-12 rounded-full"
              src={profile.imageUrl || defaultImage}
              alt=""
            />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-sm text-white font-semibold leading-tight capitalize">
              {profile.name}
            </h3>
            <p className="text-gray-200 text-xs">
              {profile.followers?.length} Followers
            </p>
          </div>
        </div>
      </Link>
      {profile.followers?.some(follower => follower === user?.result?._id) ? (
        <div className="absolute top-4 right-0 ml-auto mr-3 flex justify-center items-center h-8 w-8 rounded-md text-white bg-[#6a55fa]">
          <BsFillCheckCircleFill aria-hidden="true" size={15} />
        </div>
      ) : (
        <div className="absolute top-4 right-0">
          <Ripples color="#ffffff80">
            <button
              onClick={() => dispatch(followUser(profile?._id))}
              aria-label="follow user"
              className="ml-auto mr-3 flex justify-center items-center h-8 w-8 rounded-md text-white bg-[#6a55fa]"
            >
              <BsFillPersonPlusFill aria-hidden="true" size={15} />
            </button>
          </Ripples>
        </div>
      )}
    </li>
  );
};

export default Profile;
