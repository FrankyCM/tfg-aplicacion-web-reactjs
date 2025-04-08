import React from 'react'
import { Input } from 'semantic-ui-react'
import './ScheduleCreationInput.css'

const ScheduleCreationInput = ({placeholder, className, setStatusOnChange, value, type}) => {
    
    const handleInputChange = (e) => {
        const value = e.target.value
        console.log(value) // 👉 imprime el valor actual del input
        setStatusOnChange(value)    // 👉 actualiza el estado desde el componente padre
    }

    return(
        <Input placeholder = {placeholder}
        className={`${className}`}
        value={value ?? ""}
        onChange={handleInputChange}
        type={type}/>
    )
} 

export default ScheduleCreationInput;
