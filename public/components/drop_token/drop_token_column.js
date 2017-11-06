import React, {Component} from 'react';

class DropTokenColumn extends Component {
  constructor() {
    super();

    this.onColumnClick = this.onColumnClick.bind(this);
  }

  onColumnClick() {
    if(this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <div onClick={this.onColumnClick}>
        {
          this.props.data && this.props.data.map((item, index) => (
            <div key={'dropTokenSquare' + index} className='square'>
              <div className={'circle ' + (item > -1 ? (item === 1 ? 'red' : 'blue') : '')}></div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default DropTokenColumn
