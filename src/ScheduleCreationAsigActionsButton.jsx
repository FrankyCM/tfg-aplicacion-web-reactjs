import React from 'react';
import { Button } from 'semantic-ui-react';
import './ScheduleCreationAsigActionsButton.css';

const ScheduleCreationAsigActionsButton = ({ text, setStatusOnClick, color }) => {
  
    const handleClick = () => {
    setStatusOnClick(true);
  };

  return (
    <Button 
    onClick={handleClick} 
    className= "asig-actions-button"
    style={{ backgroundColor: color, borderColor: color }}>{text}</Button>
  );
};

export default ScheduleCreationAsigActionsButton;
