import React from 'react'
import { Select } from 'semantic-ui-react'
import './ScheduleCreationSelect.css'


const ScheduleCreationSelect = ({selectOptions, placeholder, className}) => (
  <Select placeholder={placeholder} options={selectOptions} className={className}/>
)

export default ScheduleCreationSelect;