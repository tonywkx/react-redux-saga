import React from 'react';
import ReactDOM from 'react-dom/client';
import {applyMiddleware, compose, createStore} from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import App from './App';
import { rootReducer } from './components/redux/rootReducer';
import { forbiddenWordsMidleware } from './components/redux/middleware';
import { sagaWatcher } from './components/redux/sagas';

const saga = createSagaMiddleware()

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk, forbiddenWordsMidleware, saga
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

saga.run(sagaWatcher)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
    
);


