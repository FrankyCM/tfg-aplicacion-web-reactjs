import React from 'react';
import './IntroButton.css';
import { useNavigate } from "react-router-dom";

const IntroButton = ({text}) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };
  
  return (
    <button className="button-82-pushable" role="button" onClick={handleClick}>
      <span className="button-82-shadow"></span>
      <span className="button-82-edge"></span>
      <span className="button-82-front text">{text}</span>
    </button>
  );
};

export default IntroButton;
