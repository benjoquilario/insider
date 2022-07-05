import React from 'react';

const UserLoading = () => {
  return (
    <div className="bg-gray-900 h-[64px] w-auto rounded space-y-3 mb-2">
      <div className="flex gap-2 animate-pulse justify-center items-center px-12 py-5">
        <div className="h-12 w-12 bg-gray-800 rounded-full"></div>
        <div className="flex-auto space-y-3">
          <div className="bg-gray-800 rounded h-4 w-full"></div>
          <div className="bg-gray-800 rounded h-3 w-2/4"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLoading;
