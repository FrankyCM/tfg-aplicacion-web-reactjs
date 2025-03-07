import React from 'react'
import { Image } from 'semantic-ui-react'

const ImageContainer = ({picturePath, size}) => (
  <Image src={picturePath} size={size} circular/>
)

export default ImageContainer