import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getAuthenticatedUser } from '../../actions/user';
import * as ActionTypes from '../../constants/ActionTypes';

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const page = useSelector(state => state.users.page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    dispatch(getAllUsers(page));
  }, [dispatch, page, user]);

  useEffect(() => {
    if (!user) return;
    dispatch(getAuthenticatedUser());

    return () => {
      dispatch({ type: ActionTypes.SET_PAGE_TO_DEFAULT });
      dispatch({ type: ActionTypes.CLEAR_USERS });
    };
  }, [dispatch, user]);

  return <Outlet />;
};

export default Layout;
