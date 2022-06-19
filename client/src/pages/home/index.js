import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWindowSize from '../../hooks/useWindowSize';
import Header from '../../components/Layout/Header';
import Main from '../../components/Layout/Main';
import Right from '../../components/Layout/Right';
import Backdrop from '../../components/Backdrop';
import Form from '../../components/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionType from '../../constants/ActionTypes';
import baseUrl from '../../constants/baseUrl';
import { RiCloseFill } from 'react-icons/ri';
import { useModalCloser } from '../../hooks/useModalOpen';
import { AnimatePresence } from 'framer-motion';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const modal = useSelector(state => state.modal);
  const [currentId, setCurrentId] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const { isOpen, setIsOpen, handleClickOutside, ref } =
    useModalCloser(setCurrentId);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/auth', location.search);
  }, [navigate, location, user]);

  useEffect(() => {
    dispatch({ type: ActionType.RESET_POSTS });
  }, [dispatch]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel;

    dispatch({ type: ActionType.POST_LOADING });
    axios
      .get(`${baseUrl}/posts?page=${page}`, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(({ data: { data, currentPage, numberOfPages } }) => {
        setHasMore(data.length > 0);
        dispatch({
          type: ActionType.FETCH_ALL,
          payload: { data, currentPage, numberOfPages },
        });
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request Canceled sa post!');
        } else {
          dispatch({ type: ActionType.ERR0R, payload: error });
          console.log(error);
          if (error.response?.status === 401) {
            dispatch({ type: ActionType.LOGOUT });
            navigate('/auth', location.search);
          }
        }
      });

    return () => cancel();
    // dispatch(getPosts(page, navigate, location));
  }, [currentId, dispatch, page, navigate, location, user?.token]);

  return (
    <AnimatePresence>
      <div className="grid grid-cols-12 gap-6 max-w-6xl w-full mx-auto bg-gray-900 h-full p-3 md:p-5">
        <Header />
        <Main
          hasMore={hasMore}
          currentId={currentId}
          setCurrentId={setCurrentId}
          setPage={setPage}
        >
          {modal && (
            <Backdrop handleClickOutside={handleClickOutside}>
              <div
                ref={ref}
                className="z-20 bg-gray-900 w-full md:w-2/4 max-w-screen-md m-4 h-auto shadow-md border border-gray-600 rounded-md"
              >
                <div className="p-2 flex justify-between items-center">
                  <h3 className="p-2 text-lg text-white">
                    {currentId ? 'Editing' : 'Creating'} Post
                  </h3>
                  <button
                    className="text-white rounded-full p-2 transition ease-in duration-75"
                    onClick={() => {
                      dispatch({
                        type: 'CREATE_MODAL',
                        payload: false,
                      });
                      setCurrentId(0);
                    }}
                  >
                    <RiCloseFill size={25} />
                  </button>
                </div>
                <Form
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                />
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
