import React from 'react'
import { Button } from 'semantic-ui-react'

const FiltersButton = ({content, onClick}) => <Button onClick = {onClick}>{content}</Button>

export default FiltersButton