import './ImageGallery.css'
import { useState } from 'react'

function ImageGallery(ShowImages) {
    console.log(ShowImages)
    const [currentImage, setCurrentImage] = useState(0)

    const images = []

    for (let i = 0; i < ShowImages.images.length; i++) {
        const image = ShowImages.images[i]
        const imageDiv = <div className='gallery-image-box'>
        <p>{image.title}</p>
        <img src={image.imageUrl}></img>
        <p>{image.description}</p>
        </div>

        images.push(imageDiv)
    }

    console.log(images, '----images')
   

    const moveImageToRight = () => {
        setCurrentImage(currentImage + 1)
    }

    const moveImageToLeft = () => {
        setCurrentImage(currentImage - 1)
    }

    const leftArrow = <i onClick={moveImageToLeft} class="fa-solid fa-arrow-left"></i>
    const rightArrow = <i onClick={moveImageToRight} class="fa-solid fa-arrow-right"></i>

    return (
        <div>
            <h1>Gallery</h1>
            {images[currentImage]}
            <div className='gallery-buttons'>
                {currentImage <= ShowImages.images.length  && currentImage > 0 && leftArrow}
                {currentImage >= 0 && currentImage < ShowImages.images.length - 1 && rightArrow}
            </div>
        </div>
        
    )
}

export default ImageGallery