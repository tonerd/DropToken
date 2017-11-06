import * as types from '../constants/action_types';
import { DROP_TOKEN_BOARD_SIZE } from '../constants/constants';
import Fetch from '../utils/fetch';
import ThirdParty from '../utils/third_party';

const fetch = new Fetch();
const thirdParty = new ThirdParty();

export const addToken = (board) => dispatch => {
  dispatch({ type: types.DROP_TOKEN_ADD_TOKEN, board, playerTurn: false });
}

export const getMove = (board) => {
  return dispatch => {
    let boardString = board ? board.toString() : '';
    fetch.get(thirdParty.urls.NinetyEightPointSix.DropToken + '[' + boardString + ']')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw true;
      })
      .then(board => dispatch({ type: types.DROP_TOKEN_ADD_TOKEN, board, playerTurn: true }))
      .catch(() => dispatch({ type: types.DROP_TOKEN_SERVICE_ERROR }));
    };
}

export const init = playerTurn => dispatch => {
  dispatch({ type: types.DROP_TOKEN_INIT, playerTurn, size: DROP_TOKEN_BOARD_SIZE });
}

export const reset = () => dispatch => {
  dispatch({ type: types.DROP_TOKEN_RESET });
}
