import React from 'react'
import { Select } from 'semantic-ui-react'



const FiltersSelect = ({ text, options, onChange, value }) => (
    <Select placeholder={text} options={options} onChange={(event, data) => onChange(event, data)} value={value} />
);
  

export default FiltersSelect