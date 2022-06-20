import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import Post from './post';

const Posts = ({ hasMore, currentId, setCurrentId, setPage }) => {
  const { isLoading, posts } = useSelector(state => state.posts);
  const observer = useRef();

  const lastBookElementRef = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevPageNumber => prevPageNumber + 1);
          }
        },
        { rootMargin: '-150px' }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPage]
  );

  return (
    <>
      {posts?.length === 0 ? (
        <div>Loading</div>
      ) : (
        <ul className="mt-4 flex flex-col gap-4">
          {posts?.map((post, index) => {
            if (posts?.length === index + 1) {
              return (
                <li className="relative" ref={lastBookElementRef} key={index}>
                  <Post
                    post={post}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                </li>
              );
            } else if (post === 0) {
              return null;
            } else {
              return (
                <li className="relative" key={index}>
                  <Post
                    post={post}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                </li>
              );
            }
          })}
        </ul>
      )}
      {!hasMore && !isLoading && (
        <p className="text-center text-sm">
          There are no more posts to show right now
        </p>
      )}
    </>
  );
};

export default Posts;
