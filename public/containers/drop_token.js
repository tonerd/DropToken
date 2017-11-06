import { connect } from 'react-redux'
import { addToken, getMove, init, reset } from '../actions/drop_token'
import DropToken from '../components/drop_token/drop_token'

const mapStateToProps = state => {
  return {
    board: state.dropToken.board,
    boardData: state.dropToken.boardData,
    playerTurn: state.dropToken.playerTurn,
    result: state.dropToken.result,
    serviceError: state.dropToken.serviceError,
    size: state.dropToken.size,
    started: state.dropToken.started
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToken: index => dispatch(addToken(index)),
    getMove: board => dispatch(getMove(board)),
    init: playerTurn => dispatch(init(playerTurn)),
    reset: () => dispatch(reset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropToken);
