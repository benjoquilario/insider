import React from 'react';
import Header from '../../components/Layout/Header';
import FollowingView from '../../components/FollowView/FollowingView';
import Right from '../../components/Layout/Right';

const Following = () => {
  return (
    <div className="grid grid-cols-12 gap-6 max-w-6xl w-full mx-auto bg-gray-900 h-full p-3 md:p-5">
      <Header />
      <FollowingView />
      <Right />
    </div>
  );
};

export default Following;
