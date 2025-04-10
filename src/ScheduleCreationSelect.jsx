import React from 'react'
import { Select } from 'semantic-ui-react'
import './ScheduleCreationSelect.css'


const ScheduleCreationSelect = ({ selectOptions, placeholder, className, setStatusOnChange, value }) => {
    const handleChange = (e, { value }) => {
      console.log("valor en el select", value) // 👉 imprime el valor seleccionado
      setStatusOnChange(value) // 👉 actualiza el estado pasado por parámetro
    }
    console.log("valor select ", className, value);
    return (
      <Select
        placeholder={placeholder}
        options={selectOptions}
        className={className}
        value={value ?? ""}
        onChange={handleChange}
      />
    )
  }

export default ScheduleCreationSelect;