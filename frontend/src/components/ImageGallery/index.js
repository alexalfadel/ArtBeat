import './ImageGallery.css'
import { useState } from 'react'
import { useModal } from "../../context/Modal";



function ImageGallery(ShowImages) {
    const { closeModal } = useModal();
    const [currentImage, setCurrentImage] = useState(0)

    const images = []

    for (let i = 0; i < ShowImages.images.length; i++) {
        const image = ShowImages.images[i]
        const imageDiv = <div className='gallery-image-box'>
        <p className='gallery-image-title'>{image.title}</p>
        <img className='gallery-image-image' src={image.imageUrl}></img>
        <p className='gallery-image-description'>{image.description}</p>
        </div>

        images.push(imageDiv)
    }
   

    const moveImageToRight = () => {
        setCurrentImage(currentImage + 1)
    }

    const moveImageToLeft = () => {
        setCurrentImage(currentImage - 1)
    }

    const leftArrow = <i onClick={moveImageToLeft} class="fa-solid fa-arrow-left arrow"></i>
    const rightArrow = <i onClick={moveImageToRight} class="fa-solid fa-arrow-right arrow"></i>

    return (
        <div className='image-gallery-modal'>
            <p onClick={(() => closeModal())} id='leave-gallery'>X</p>
            {images[currentImage]}
            <div className='gallery-buttons'>
                {currentImage <= ShowImages.images.length  && currentImage > 0 && leftArrow}
                {currentImage >= 0 && currentImage < ShowImages.images.length - 1 && rightArrow}
            </div>
        </div>
        
    )
}

export default ImageGallery