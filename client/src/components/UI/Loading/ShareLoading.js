import React from 'react';

const ShareLoading = () => {
  return (
    <div className="mt-4 relative h-20 bg-gray-800 flex justify-center items-center rounded px-2 gap-1 overflow-hidden">
      <div className="animate-pulse flex justify-start items-center flex-1	">
        <div className="mx-2">
          <div className="w-11 h-11 bg-gray-900 bg-opacity-80 rounded-full"></div>
        </div>
        <div className="flex-auto">
          <div className="w-full h-11 rounded-full bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default ShareLoading;
