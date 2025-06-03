import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import './IconButton.css'

const IconButton = ({name, size, handleClick}) => {
    return(
        <Button icon onClick={handleClick}>
            <Icon name={name} size={size}/>
        </Button>
    )
  
}

export default IconButton;