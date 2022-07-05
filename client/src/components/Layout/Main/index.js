import React from 'react';
import Posts from '../../Posts';
import Search from '../../Search';
import Share from '../../Share';

const Main = ({ hasMore, children }) => (
  <div className="col-span-full lg:col-span-9 xl:col-span-6">
    <Search />
    <Share />
    <Posts hasMore={hasMore} />
    {children}
  </div>
);

export default Main;
