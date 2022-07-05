import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FollowCard from '../FollowCard';
import FollowLoading from '../../UI/Loading/FollowLoading';
import { getFollowingById } from '../../../actions/user';

const FollowingView = () => {
  const { user } = useSelector(state => state.auth);
  const { following } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowingById(user?._id));
  }, [dispatch, user?._id]);

  return (
    <div className="col-span-full lg:col-span-9 xl:col-span-6">
      <div className="relative">
        <h3 className="text-lg text-white">
          Following ·{' '}
          <span>{following?.length !== 0 && following?.length}</span>
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-2">
          {following?.length === 0
            ? Array.from(Array(6), (_, index) => <FollowLoading key={index} />)
            : following?.map((follower, index) => (
                <FollowCard key={index} follower={follower} />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowingView;
