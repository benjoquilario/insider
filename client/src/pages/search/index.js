import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchUser } from '../../actions/user';
import Header from '../../components/Layout/Header';
import ResultSearch from '../../components/Search/ResultSearch';

const Search = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const data = query.get('user');
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.users.searchResults);

  console.log(searchResults);

  useEffect(() => {
    dispatch(getSearchUser(data));
  }, [dispatch, data]);

  return (
    <div className="grid grid-cols-12 gap-6 max-w-6xl w-full mx-auto bg-gray-900 h-full p-3 md:p-5">
      <Header />
      <ResultSearch results={searchResults} />
    </div>
  );
};

export default Search;
