import React from 'react'
import { Image } from 'semantic-ui-react'
import './ImageContainer.css'

const ImageContainer = ({bgColor, picturePath, size, isCircular}) => (
  <div className="image-container" style={{ backgroundColor: bgColor }}>
    <Image src={picturePath} size={size} circular={isCircular} />
  </div>
)

export default ImageContainer