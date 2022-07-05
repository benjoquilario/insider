import React from 'react';

const UsersLoading = () => {
  return (
    <div className="bg-gray-800 h-[64px] w-auto rounded space-y-3 mb-2">
      <div className="flex gap-2 animate-pulse items-center p-2">
        <div className="h-12 w-12 bg-gray-900 rounded-full"></div>
        <div className="flex-auto space-y-3 ">
          <div className="bg-gray-900 rounded h-4 w-3/4"></div>
          <div className="bg-gray-900 rounded h-3 w-2/4"></div>
        </div>
        <div className="h-[32px] w-[32px] bg-gray-900 rounded"></div>
      </div>
    </div>
  );
};

export default UsersLoading;
