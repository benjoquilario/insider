import React from 'react';

const ProfileLoading = () => {
  return (
    <div className="w-full bg-gray-800 animate-pulse rounded-md">
      <div className="relative h-56 w-full bg-gray-900 opacity-80 rounded-t">
        <div className="absolute right-3 bottom-3 bg-gray-800 h-8 w-8 rounded-full"></div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 px-4 bg-primary rounded-b-md pt-2 p-6 z-10 sm:flex-row sm:justify-start">
        <div className="-mt-20 ">
          <div className="bg-gray-900 w-28 h-28 rounded-full"></div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-3">
            <div className="bg-gray-900 h-5 w-48 rounded"></div>
            <div className="bg-gray-900 h-4 w-36 rounded m-auto sm:m-0"></div>
            <div className="bg-gray-900 h-3 w-32 rounded m-auto sm:m-0"></div>
          </div>
          <div className="mt-2 md:mt-0 bg-gray-900 h-5 w-28 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
