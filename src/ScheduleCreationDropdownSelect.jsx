import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './ScheduleCreationDropdownSelect.css'

const ScheduleCreationDropdownSelect = ({ selectOptions, placeholder }) => {
    // Mapeamos selectOptions para asegurarnos de que sigue el formato esperado
    const formattedOptions = selectOptions.map((professor) => ({
      key: professor.key,
      text: professor.text,
      value: professor.value,
    }));
  
    return <Dropdown placeholder={placeholder} search selection options={formattedOptions} />;
  };
  
  export default ScheduleCreationDropdownSelect;