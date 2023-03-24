import { combineReducers } from "redux";
import game from './game/reducer'

const appReducer = combineReducers({ game });

export default (state, action) => {
  return appReducer(state, action);
};