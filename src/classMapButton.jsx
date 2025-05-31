import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './classMapButton.css';

const ClassMapButton = ({ text, onClick, iconName }) => {
  return (
    <Button
      className="cuadro-evento-boton-mostrar-mapa-aulas"
      onClick={onClick}
      icon
      labelPosition="left"
    >
        {iconName && <Icon name={iconName} size='large' />}
        {text}
    </Button>
  );
};

export default ClassMapButton;