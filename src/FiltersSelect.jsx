import React from 'react'
import { Select } from 'semantic-ui-react'
import './FiltersSelect.css'


const FiltersSelect = ({ text, options, onChange, value }) => (
    <Select placeholder={text} options={options} onChange={(event, data) => onChange(event, data)} value={value} className="filters-select"/>
);
  

export default FiltersSelect