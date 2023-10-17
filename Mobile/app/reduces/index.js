import { combineReducers } from 'redux';
import auth from './auth';
import connection from './system.connection';
import info from './system.info';
import user from './user';
import products from './products';

export default combineReducers({
  auth,
  connection,
  info,
  user,
  products,
});