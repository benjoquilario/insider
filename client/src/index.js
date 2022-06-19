import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';

import { reducers } from './reducers';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(reducers, compose(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
