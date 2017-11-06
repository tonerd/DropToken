import * as types from '../constants/action_types'

const PLAYER_WIN = 'YOU WIN';
const COMPUTER_WIN = 'YOU LOSE';
const TIE = 'TIE';

export default function dropToken(state = { board: [], started: false }, action) {
  switch (action.type) {
    case types.DROP_TOKEN_INIT:
      let data = [];

      for(let i = 0; i < action.size; i++) {
        let column = [];
        for(let j = 0; j < action.size; j++) {
          column.push(-1);
        }
        data.push(column);
      }

      return Object.assign({}, state, {
        boardData: data,
        playerTurn: action.playerTurn,
        size: action.size,
        started: true
      });
    case types.DROP_TOKEN_RESULT:
      return Object.assign({}, state, {
        result: action.result
      });
    case types.DROP_TOKEN_RESET:
      return { board: [], started: false};
    case types.DROP_TOKEN_SERVICE_ERROR:
      return Object.assign({}, state, {
        serviceError: true
      });
    case types.DROP_TOKEN_ADD_TOKEN:
      if(!state.result) {
        let boardData = state.boardData;
        let index = action.board[action.board.length - 1];
        for(let i = state.size - 1; i > -1; i--) {
          if(boardData[index][i] === -1) {
            boardData[index][i] = action.playerTurn ? 1 : 0;
            break;
          }
        }

        let result = checkBoard(boardData);

        return Object.assign({}, state, {
          board: action.board,
          boardData: boardData,
          playerTurn: action.playerTurn,
          result: result ? result : action.board.length === (state.size * state.size) ? TIE : null,
          serviceError: false
        });
      }
    default:
      return state;
  }
}

function checkBoard(boardData) {
  let size = boardData.length;
  let winner = null;

  for(let i = 0; i < size; i++) {
    if(checkRow(i, boardData, size)) {
      return boardData[0][i] === 1 ? COMPUTER_WIN : PLAYER_WIN;
    }

    if(checkColumn(i, boardData, size)) {
      return boardData[i][0] === 1 ? COMPUTER_WIN : PLAYER_WIN;
    }
  }

  return checkVerticals(boardData);
}

function checkRow(row, boardData) {
  for(let i = 0; i < boardData.length - 1; i++) {
    if(boardData[i][row] === -1 || boardData[i][row] !== boardData[i + 1][row]) {
      return false;
    }
  }
  return true;
}

function checkColumn(column, boardData) {
  for(let i = 0; i < boardData.length - 1; i++) {
    if(boardData[column][i] === -1 || boardData[column][i] !== boardData[column][i + 1]) {
      return false;
    }
  }
  return true;
}

function checkVerticals(boardData) {
  let size = boardData.length;
  let first = true;
  let second = true;

  for(let i = 0; i < size - 1; i++) {
    if(boardData[i][i] === -1 || boardData[i][i] !== boardData[i + 1][i + 1]) {
      first = false;
      break;
    }
  }

  if(first) {
    return boardData[0][0] === 1 ? COMPUTER_WIN : PLAYER_WIN;
  }

  for(let i = 0; i < size - 1; i++) {
    if(boardData[i][size - i - 1] === -1 || boardData[i][size - i - 1] !== boardData[i + 1][size - i - 2]) {
      second = false;
      break;
    }
  }

  if(second) {
    return boardData[0][size - 1] === 1 ? COMPUTER_WIN : PLAYER_WIN;
  }

  return null;
}
