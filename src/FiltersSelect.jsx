import React from 'react'
import { Select } from 'semantic-ui-react'
import './FiltersSelect.css'


const FiltersSelect = ({ text, options, onChange, value }) => {
    // Encuentra la opción seleccionada basándote en el valor
    const selectedOption = options.find(option => option.value === value);
    
    // Extrae el color de fondo (suponiendo que 'style' contiene un objeto con 'backgroundColor')
    const backgroundColor = selectedOption?.style?.backgroundColor?.replace('#', '');

    // Crea el nombre de clase combinado con el color de fondo
    const combinedClassName = `selected-asig-${backgroundColor ?? ''}`;
  
    return (
      <Select
        placeholder={text}
        options={options}
        onChange={(event, data) => onChange(event, data)}
        value={value}
        className={combinedClassName}
      />
    );
  };
  
  export default FiltersSelect;