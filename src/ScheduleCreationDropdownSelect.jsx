import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './ScheduleCreationDropdownSelect.css'

const ScheduleCreationDropdownSelect = ({ selectOptions, placeholder, setStatusOnChange, value }) => {
  // Aseguramos el formato correcto de las opciones
  const formattedOptions = selectOptions.map((field) => ({
    key: field.key,
    text: field.text,
    value: field.value,
  }));

  // Manejar el cambio de selección
  const handleChange = (e, { value }) => {
    console.log(value) // 👉 imprime el valor seleccionado
    setStatusOnChange(value) // 👉 actualiza el estado recibido
  };

  return (
    <Dropdown
      placeholder={placeholder}
      search
      selection
      options={formattedOptions}
      value={value ?? ""}
      onChange={handleChange}
    />
  );
};

export default ScheduleCreationDropdownSelect;