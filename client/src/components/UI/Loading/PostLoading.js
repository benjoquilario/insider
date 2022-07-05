import React from 'react';

const PostLoading = () => {
  return (
    <>
      <div className="mb-4 bg-gray-800 shadow rounded-md p-3 w-full mx-auto">
        <div className="animate-pulse flex flex-col space-y-5">
          <div className="flex space-x-4 items-center">
            <div className="rounded-full bg-gray-900 bg-opacity-80 h-11 w-11"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-900 rounded w-28"></div>
              <div className="h-3 bg-gray-900 rounded w-20"></div>
            </div>
          </div>
          <div>
            <div className="h-4 bg-gray-900 rounded w-full"></div>
          </div>
          <div>
            <div className="h-40 bg-gray-900 rounded w-full"></div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="h-6 bg-gray-900 rounded w-full"></div>
            <div className="h-6 bg-gray-900 rounded w-full"></div>
            <div className="h-6 bg-gray-900 rounded w-full"></div>
          </div>
        </div>
      </div>
      <div className="mb-4 bg-gray-800 shadow rounded-md p-3 w-full mx-auto">
        <div className="animate-pulse flex flex-col space-y-5">
          <div className="flex  space-x-4 items-center">
            <div className="rounded-full bg-gray-900 bg-opacity-80 h-11 w-11"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-900 rounded w-28"></div>
              <div className="h-3 bg-gray-900 rounded w-20"></div>
            </div>
          </div>
          <div>
            <div className="h-4 bg-gray-900 rounded w-full"></div>
          </div>
          <div>
            <div className="h-40 bg-gray-900 rounded w-full"></div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="h-6 bg-gray-900 rounded w-full"></div>
            <div className="h-6 bg-gray-900 rounded w-full"></div>
            <div className="h-6 bg-gray-900 rounded w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLoading;
