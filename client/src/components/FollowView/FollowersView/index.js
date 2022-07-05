import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowersById } from '../../../actions/user';
import FollowLoading from '../../UI/Loading/FollowLoading';
import FollowCard from '../FollowCard';

const FollowersView = () => {
  const { user } = useSelector(state => state.auth);
  const { followers } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowersById(user?._id));
  }, [dispatch, user?._id]);

  return (
    <div className="col-span-full lg:col-span-9 xl:col-span-6">
      <div className="relative">
        <h3 className="text-lg text-white">
          Followers ·{' '}
          <span>{followers?.length !== 0 && followers?.length}</span>
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-2">
          {followers?.length === 0
            ? Array.from(Array(6), (_, index) => <FollowLoading key={index} />)
            : followers?.map((follower, index) => (
                <FollowCard key={index} follower={follower} />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowersView;
