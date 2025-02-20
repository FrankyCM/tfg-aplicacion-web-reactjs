import React from 'react'
import { Button } from 'semantic-ui-react'
import './FiltersButton.css';

const FiltersButton = ({content, onClick}) => <Button onClick = {onClick} className="filters-button">{content}</Button>

export default FiltersButton