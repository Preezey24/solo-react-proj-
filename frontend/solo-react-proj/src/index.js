import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom'; 
import configureStore from './store'; 
import { restoreCSRF, fetch } from './store/csrf'; 
import * as sessionActions from './store/session'; 

const store = configureStore(); 

if (process.env.NODE_ENV !== 'production') {
    restoreCSRF(); 

    window.csrfFetch = fetch; 
    window.store = store; 
    window.sessionActions = sessionActions; 
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store; 
}

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
