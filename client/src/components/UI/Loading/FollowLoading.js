import React from 'react';

const FollowLoading = () => {
  return (
    <div className="bg-gray-800 animate-pulse w-full rounded-md">
      <div className="h-[60px] w-full flex items-center justify-between px-2">
        <div className="flex items-center gap-2 ">
          <div className="bg-gray-900 w-11 h-11 md:h-12 md:w-12 rounded-full"></div>
          <div className="bg-gray-900 h-5 w-16 rounded-md"></div>
        </div>
        <div className="bg-gray-900 h-8 w-22 rounded-md"></div>
      </div>
    </div>
  );
};

export default FollowLoading;
