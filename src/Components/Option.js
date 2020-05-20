import React from 'react';

class Option extends React.Component {
  render() {
    const {
      id = '',
      name = '',
      bold = false,
      textContent = '',
      handleClick = () => {}
    } = this.props;

    return (
      <button
        id={id ? id : null}
        name={id && name ? `${name}-${id}` : null}
        type="button"
        className={`tracking-wider hover:underline ${bold ? 'font-bold' : ''}`}
        onClick={handleClick}
      >
        {textContent}
      </button>
    );
  }
}

export default Option;
