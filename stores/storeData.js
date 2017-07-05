import { createStore, applyMiddleware } from 'redux';
import app from '../reducers/index';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger  from 'redux-logger';

export default function storeData() {
  const logger = createLogger();
  let store = createStore(app, applyMiddleware(thunk, promise, logger)) ;
  return store;
}