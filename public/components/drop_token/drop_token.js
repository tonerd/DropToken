import React, {Component} from 'react';
import DropTokenColumn from './drop_token_column';

class DropToken extends Component {
  constructor() {
    super();
    this.state = {};
  }

  addToken(index) {
    if(!this.props.result && this.props.playerTurn && !this.state.busy) {
      this.setState({ busy: true });
      let boardData = this.props.boardData;
      let canAdd = false;
      for(let i = this.props.size - 1; i > -1; i--) {
        if(boardData[index][i] === -1) {
          canAdd = true;
          break;
        }
      }

      if(canAdd) {
        let board = this.props.board;
        board.push(index);
        this.props.addToken(board);
        if(board.length < (this.props.size * this.props.size)) {
          this.props.getMove(board);
        }
      }
      this.setState({ busy: false, userError: !canAdd });
    }
  }

  render() {
    return (
      <div id='dropToken'>
        <div className='container'>
          <div className='row'>
            <h1 className='col-sm-12'>Drop Token</h1>
          </div>
          {
            !this.props.started &&
              <div className='row'>
                <div className='col-sm-12'>
                  <p>Would you like to go first? <input type='button' className='btn btn-primary' onClick={() => this.props.init(true)} value='Yes'/><input type='button' className='btn btn-primary' onClick={() => {this.props.init(false); this.props.getMove(); }} value='No'/></p>
                </div>
              </div>
          }
          {
            this.props.started &&
              <div>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input type='button' className='btn btn-primary' onClick={() => this.props.reset()} value='New Game'/>
                  </div>
                </div>
                <div className='row' id='dropTokenGameBoard'>
                  <div className={this.props.result ? 'dropTokenFinished' : 'dropTokenPlaying'}>
                    {
                      this.props.boardData.map((column, index) => (
                        <div className='col-xs-3 dropTokenColumn' key={'dropTokenColumn' + index}>
                          <DropTokenColumn data={column} onClick={() => this.addToken(index) }/>
                        </div>
                      ))
                    }
                  </div>
                  <div id='dropTokenResult'>{this.props.result}</div>
                </div>
              </div>
          }
          <div id='dropTokenError'>
            {
              this.state.userError &&
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='alert alert-danger'>A token cannot be placed in that column.</div>
                  </div>
                </div>
            }
            {
              !this.props.result && this.props.serviceError &&
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='alert alert-danger'>There was a problem with Drop Token service, please refresh the page and try again.</div>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DropToken
