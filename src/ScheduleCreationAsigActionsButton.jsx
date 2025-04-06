import React from 'react';
import { Button } from 'semantic-ui-react';
import './ScheduleCreationAsigActionsButton.css';

const ScheduleCreationAsigActionsButton = ({ text, setStatusOnClick }) => {
  
    const handleClick = () => {
    setStatusOnClick(true);
  };

  return (
    <Button onClick={handleClick}>{text}</Button>
  );
};

export default ScheduleCreationAsigActionsButton;
