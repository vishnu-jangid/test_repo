import * as types from './types';
import {API}  from '../../services/api';

 function gamesAction(params) {
  return {
    type: types.GAMES,
    payload: API.gamesFetch(params),
  }
}

export {gamesAction}