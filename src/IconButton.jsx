import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import './IconButton.css'
const IconButton = ({name, setSave}) => {

    const handleClick = () =>{
        setSave(true);
    }

    return(
        <Button icon onClick={handleClick}>
            <Icon name={name} size='big'/>
        </Button>
    )
  
}

export default IconButton;