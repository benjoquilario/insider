import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './post';
import PostLoading from '../UI/Loading/PostLoading';

const Posts = ({ hasMore }) => {
  const { isLoading, posts } = useSelector(state => state.posts);
  const observer = useRef();
  const dispatch = useDispatch();

  const lastBookElementRef = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            dispatch({ type: 'ADD_POST_PAGE' });
          }
        },
        { rootMargin: '-150px' }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, dispatch]
  );

  return (
    <>
      {posts?.length === 0 ? (
        <PostLoading />
      ) : (
        <ul className="flex flex-col gap-4">
          {posts?.map((post, index) => {
            if (posts?.length === index + 1) {
              return (
                <li className="relative" ref={lastBookElementRef} key={index}>
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
          {!hasMore && !isLoading && (
            <p className="text-center text-sm">
              There are no more posts to show right now
            </p>
          )}
          {isLoading && <PostLoading />}
        </ul>
      )}
    </>
  );
};

export default Posts;
