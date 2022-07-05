import React, { useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Right from '../../components/Layout/Right';
import ProfileView from '../../components/ProfileView';
import { useDispatch, useSelector } from 'react-redux';
import * as TYPES from '../../constants/ActionTypes';
import { useParams } from 'react-router-dom';
import { getUserWithPost, getUser } from '../../actions/user';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(false);
  const page = useSelector(state => state.posts.postPage);

  useEffect(() => {
    return () => dispatch({ type: TYPES.USER_POST_DEFAULT_PAGE });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: TYPES.RESET_POSTS });

    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUserWithPost(id, page, setHasMore));
  }, [dispatch, id, page]);

  return (
    <div className="grid grid-cols-12 gap-6 max-w-6xl w-full mx-auto bg-gray-900 h-full p-3 md:p-5">
      <Header />
      <ProfileView hasMore={hasMore} />
      <Right />
    </div>
  );
};

export default Profile;
