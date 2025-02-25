import React from 'react'
import { Button } from 'semantic-ui-react'
import './FiltersButton.css';

const FiltersButton = ({content, onClick, isSelected}) => <Button onClick = {onClick} className={`filters-button ${isSelected ? 'selected' : ''}`}>{content}</Button>

export default FiltersButton