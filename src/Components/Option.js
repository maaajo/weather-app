import React from 'react';

class Option extends React.Component {
  render() {
    return (
      <button
        id={this.props.id}
        name={`${this.props.name}-${this.props.id}`}
        type="button"
        className={`tracking-wider hover:underline ${
          this.props.bold ? 'font-bold' : null
        }`}
        onClick={this.props.handleClick}
      >
        {this.props.textContent}
      </button>
    );
  }
}

export default Option;
