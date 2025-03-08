import React from 'react';
import './IntroButton.css';

const IntroButton = ({text}) => {
  return (
    <button className="button-82-pushable" role="button">
      <span className="button-82-shadow"></span>
      <span className="button-82-edge"></span>
      <span className="button-82-front text">{text}</span>
    </button>
  );
};

export default IntroButton;
