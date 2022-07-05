import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as ActionTypes from '../../constants/ActionTypes';
import { RiCloseFill } from 'react-icons/ri';
import { useModalCloser } from '../../hooks/useModalOpen';
import { AnimatePresence } from 'framer-motion';
import { getPosts } from '../../actions/posts';
import Header from '../../components/Layout/Header';
import Main from '../../components/Layout/Main';
import Right from '../../components/Layout/Right';
import Backdrop from '../../components/UI/Backdrop';
import Form from '../../components/Form';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const modal = useSelector(state => state.modal);
  const page = useSelector(state => state.posts.page);
  const { currentPostId, currentCommentId } = useSelector(state => state.posts);
  const [hasMore, setHasMore] = useState(false);
  const { handleClickOutside, ref } = useModalCloser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/auth');
  }, [navigate, user]);

  useEffect(() => {
    dispatch({ type: ActionTypes.RESET_POSTS });
    dispatch({ type: 'PAGE_DEFAULT_NUMBER' });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: ActionTypes.POST_LOADING });

    dispatch(getPosts(page, navigate, setHasMore));
  }, [currentPostId, dispatch, page, navigate]);

  return (
    <AnimatePresence>
      <div className="grid grid-cols-12 gap-6 max-w-6xl w-full mx-auto bg-gray-900 h-full p-3 md:p-5">
        <Header />
        <Main hasMore={hasMore}>
          {modal && (
            <Backdrop handleClickOutside={handleClickOutside}>
              <div
                ref={ref}
                className="z-20 bg-gray-900 w-full md:w-2/4 max-w-screen-md m-4 h-auto shadow-md border border-gray-600 rounded-md"
              >
                <div className="p-2 flex justify-between items-center">
                  <h3 className="p-2 text-base md:text-lg text-white">
                    {currentPostId ? 'Editing' : 'Creating'} Post
                  </h3>
                  <button
                    className="text-white rounded-full p-2 transition ease-in duration-75"
                    onClick={() => {
                      dispatch({
                        type: 'CREATE_MODAL',
                        payload: false,
                      });
                      dispatch({ type: 'CURRENT_ID', payload: 0 });
                    }}
                  >
                    <RiCloseFill size={25} />
                  </button>
                </div>
                <Form />
              </div>
            </Backdrop>
          )}
        </Main>
        <Right />
      </div>
    </AnimatePresence>
  );
};

export default Home;
