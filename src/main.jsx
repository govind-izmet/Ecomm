import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './App/store'; // Import the Redux store
import { Provider } from 'react-redux'; // Import Redux Provider

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
