import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './ScheduleCreationAsigActionsButton.css';

const ScheduleCreationAsigActionsButton = ({ text, setStatusOnClick, color, iconName }) => {
  
  const handleClick = () => {
    setStatusOnClick(true);
  };

  return (
    <Button 
    onClick={handleClick} 
    className= "asig-actions-button"
    style={{ backgroundColor: color, borderColor: color }}
    icon
    labelPosition='left'>
    {iconName && <Icon name={iconName} size='large' />}
    {text}</Button>
  );
};

export default ScheduleCreationAsigActionsButton;
