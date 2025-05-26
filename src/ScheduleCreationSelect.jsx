import React from 'react'
import { Select } from 'semantic-ui-react'
import './ScheduleCreationSelect.css'


const ScheduleCreationSelect = ({ selectOptions, placeholder, className, setStatusOnChange, value }) => {
    const handleChange = (e, { value }) => {
      setStatusOnChange(value)
    }

    return (
      <Select 
        placeholder={placeholder}
        options={selectOptions}
        value={value ?? ""}
        onChange={handleChange}
        style={{ backgroundColor: value }}
      />
    )
  }

export default ScheduleCreationSelect;