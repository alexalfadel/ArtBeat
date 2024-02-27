import { useState, useEffect } from "react";
import { isValidImageFile } from "../AddShowForm";
import { addShowImageToAws } from "../../store/ShowImages";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getAllShowsThunk } from "../../store/shows";


function AddImageModal({showId}) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [imageFile, setImageFile] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imagePlaceholder, setImagePlaceholder] = useState("https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png")
    const [imageTitle, setImageTitle] = useState('')
    const [imageDescription, setImageDescription] = useState('')

    const [showImageError, setShowImageError] = useState(false)
    const [showErrors, setShowErrors] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        let errors = {}

        if (imageTitle.length < 5)
        errors.imageTitle = "Title must be at least 5 characters long";
        if (!isValidImageFile(imageFile))
        errors.imageFile = "Image must be .jpg, .jpeg, or .png";

        setErrors(errors)
    }, [
        imageTitle, imageFile
    ])

    const onSubmit = async (e) => {
        e.preventDefault()

        if (Object.keys(errors).length) {
            setShowErrors(true);
            console.log('we are in errors')
            console.log(errors, '---errors')
            return;
          } else {
            const image = {
                title: imageTitle,
                imageUrl: imageUrl,
                description: imageDescription,
                preview: false,
                showId: showId,
                imageFile: imageFile,
              }
            
              await dispatch(addShowImageToAws(image))

              reset()

          }
    }

    const reset = () => {
        setImageFile('')
        setImageTitle('')
        setImageDescription('')
        setImageUrl('')
        setImagePlaceholder('https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png')
        setErrors({})
        setShowErrors(false)
        setShowImageError(false)
        dispatch(getAllShowsThunk())
        closeModal()
        
    }

    return (
        <div>
            <div className="add-show-preview-image-container">
            <form>
              <div>
                <img
                  className="add-show-preview-image"
                  src={imageFile ? imageUrl : imagePlaceholder}
                  alt="Image Unavailable"
                ></img>
              </div>
              <div className="add-show-preview-image-inputs-container">
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="50"
                  placeholder="Image Title"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                ></input>
                {/* <p className="character-counter">{`${image1Title.length}/50`}</p> */}
                {showErrors && errors.imageTitle && (
                  <p className="add-show-errors-p">{errors.imageTitle}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImageFile(e.target.files[0]);
                      setImagePlaceholder(e.target.files[0]);
                      setImageUrl(URL.createObjectURL(e.target.files[0]));
                    } else {
                      setShowImageError(true);
                      setImageFile("");
                      setImagePlaceholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showImageError && (
                  <p className="add-show-errors-p">{errors.imageFile}</p>
                )}
                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                ></textarea>
                <p
                  className={`character-counter`}
                >{`${imageDescription.length}/256`}</p>
              </div>
              <div>
              <button onClick={onSubmit}>
                Add Image
              </button>
              <button onClick={reset}>X</button>
              </div>
              </form>
            </div>
        </div>
    )
}

export default AddImageModal