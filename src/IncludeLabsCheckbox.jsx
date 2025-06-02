import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import './IncludeLabsCheckbox.css';

const IncludeLabsCheckbox = ({text, includeLabs, setIncludeLabs}) =>{
    
    const handleClick = () => {
        setIncludeLabs(!includeLabs);
    }

    return (
        <div className = "contenido-checkbox-labs">
            <Checkbox slider onClick={handleClick} checked={includeLabs}/>
            <p>{text}</p>
        </div>
        
    )
} 

export default IncludeLabsCheckbox;

