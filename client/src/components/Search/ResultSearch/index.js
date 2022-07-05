import React from 'react';
import { useSelector } from 'react-redux';
import Search from '..';
import ResultCard from '../ResultCard';

const ResultSearch = ({ results }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="col-span-full lg:col-span-9 xl:col-span-6">
      <Search />
      <ul className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-2">
        {results?.map(result => {
          if (result._id === user?._id) return null;

          return <ResultCard result={result} />;
        })}
      </ul>
    </div>
  );
};

export default ResultSearch;
