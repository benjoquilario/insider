import React from 'react';
import FollowersView from '../../components/FollowView/FollowersView';
import Header from '../../components/Layout/Header';
import Right from '../../components/Layout/Right';

const Followers = () => {
  return (
    <div className="grid grid-cols-12 gap-6 max-w-6xl w-full mx-auto bg-gray-900 h-full p-3 md:p-5">
      <Header />
      <FollowersView />
      <Right />
    </div>
  );
};

export default Followers;
