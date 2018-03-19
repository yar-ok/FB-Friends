import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import ListReducer from './ListReducer';

const AppReducer = combineReducers({
  nav: NavReducer,
  listReducer: ListReducer,
});

export default AppReducer;
