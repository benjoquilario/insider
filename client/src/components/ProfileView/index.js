import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search';
import { followUser, unFollowUser } from '../../actions/user';
import { AiFillCamera } from 'react-icons/ai';
import Post from '../Posts/post';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Backdrop from '../UI/Backdrop';
import ChangeProfile from '../ChangeProfile';
import defaultImage from '../../assets/images/default-image.png';
import PostLoading from '../UI/Loading/PostLoading';
import ProfileLoading from '../UI/Loading/ProfileLoading';

const ProfileView = ({ hasMore }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    changePhoto: '',
    changeCover: '',
  });
  const { posts, userPostsLoading } = useSelector(state => state.posts);
  const { user, loading } = useSelector(state => state.users);
  const currUser = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const isFollowing = user?.followers?.some(id => id === currUser?.user?._id);
  const observer = useRef();

  const clear = () => {
    setPostData({ changePhoto: '', changeCover: '' });
    setIsProfile(false);
  };

  const lastBookElementRef = useCallback(
    node => {
      if (userPostsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            dispatch({ type: 'USER_POSTS_PAGE' });
          }
        },
        { rootMargin: '-150px' }
      );
      if (node) observer.current.observe(node);
    },
    [userPostsLoading, hasMore, dispatch]
  );

  return (
    <div className="col-span-full lg:col-span-9 xl:col-span-6">
      <Search />
      {loading ? (
        <ProfileLoading />
      ) : (
        <div className="mt-1">
          <div className="w-full h-56 relative overflow-hidden ">
            <div className="w-full h-full">
              <div className="absolute inset-0 bg-[#0f1624] shadow-xl -z-10"></div>
              {user?.coverPhoto && (
                <img
                  src={user?.coverPhoto}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              )}
              {user?._id === currUser?.user?._id && (
                <button
                  onClick={() => {
                    setIsProfile(false);
                    setIsOpen(true);
                  }}
                  className="absolute bg-gray-100 right-3 bottom-3 shadow-md rounded-full h-8 w-8 flex justify-center items-center"
                >
                  <AiFillCamera size={20} />
                </button>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-center md:justify-between bg-gray-800">
              <div className="flex flex-col md:flex-row justify-center items-center gap-3 px-5 pt-2 pb-2 md:pb-5">
                <div className="-mt-20 flex-shrink-0 relative">
                  <img
                    className="rounded-full h-28 w-28 border-4 border-gray-800 object-cover relative bg-gray-900"
                    src={user?.imageUrl || defaultImage}
                    alt=""
                  />
                  {user?._id === currUser?.user?._id && (
                    <button
                      onClick={() => {
                        setIsProfile(true);
                        setIsOpen(true);
                      }}
                      className="absolute text-[#6a55fa] bg-gray-100 right-0 bottom-3 shadow-md rounded-full h-8 w-8 flex justify-center items-center"
                    >
                      <AiFillCamera size={20} />
                    </button>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <div>
                    <h1 className="text-white text-lg font-semibold capitalize">
                      {user?.name}
                    </h1>
                    <p className="text-sm text-gray-300">{user?.email}</p>
                    <span className="text-sm text-gray-300">
                      {user?.followers?.length} Followers
                    </span>
                  </div>
                </div>
              </div>
              {user?._id !== currUser?.user?._id && (
                <div className="p-3 flex items-start justify-center">
                  {isFollowing ? (
                    <button
                      onClick={() => dispatch(unFollowUser(user?._id))}
                      className="bg-[#6a55fa] hover:bg-opacity-100 active:bg-opacity-80 transition  ease-out duration-100 text-sm font-light px-6 py-1 rounded-full flex gap-2 items-center justify-center text-white"
                    >
                      <div className="flex-shrink-0">
                        <BsFillPersonPlusFill aria-hidden="true" size={15} />
                      </div>
                      <span>Unfollow</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(followUser(user?._id))}
                      className="bg-[#6a55fa] hover:bg-opacity-100 active:bg-opacity-80 transition  ease-out duration-100 text-sm font-light px-6 py-1 rounded-full flex gap-2 items-center justify-center text-white"
                    >
                      <div className="flex-shrink-0">
                        <BsFillPersonPlusFill aria-hidden="true" size={15} />
                      </div>
                      <span>Follow</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mt-3">
        <div>
          <ul className="mt-4 flex flex-col gap-4">
            {posts?.map((post, index) => {
              if (posts?.length === index + 1) {
                return (
                  <li ref={lastBookElementRef} className="relative" key={index}>
                    <Post post={post} />
                  </li>
                );
              } else if (post === 0) {
                return null;
              } else {
                return (
                  <li className="relative" key={index}>
                    <Post post={post} />
                  </li>
                );
              }
            })}
          </ul>
          {userPostsLoading && <PostLoading />}
          {!hasMore && !userPostsLoading && (
            <p className="text-center text-sm text-gray-300">
              There are no more posts to show right now
            </p>
          )}
        </div>
      </div>
      {isOpen && (
        <Backdrop>
          <ChangeProfile
            isProfile={isProfile}
            postData={postData}
            setPostData={setPostData}
            setIsOpen={setIsOpen}
            clear={clear}
          />
        </Backdrop>
      )}
    </div>
  );
};

export default ProfileView;
