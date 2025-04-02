import React from 'react'
import { Input } from 'semantic-ui-react'
import './ScheduleCreationInput.css'

const ScheduleCreationInput = ({className}) => {
    return(
        <Input placeholder = '' className={`ScheduleCreationInput ${className}`}/>
    )
} 

export default ScheduleCreationInput;
