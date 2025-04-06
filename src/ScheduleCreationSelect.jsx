import React from 'react'
import { Select } from 'semantic-ui-react'
import './ScheduleCreationSelect.css'


const ScheduleCreationSelect = ({ selectOptions, placeholder, className, setStatusOnChange }) => {
    const handleChange = (e, { value }) => {
      console.log(value) // 👉 imprime el valor seleccionado
      setStatusOnChange(value) // 👉 actualiza el estado pasado por parámetro
    }
  
    return (
      <Select
        placeholder={placeholder}
        options={selectOptions}
        className={className}
        onChange={handleChange}
      />
    )
  }

export default ScheduleCreationSelect;