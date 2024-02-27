import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isValidImageFile } from "../AddShowForm";
import { updateShowImageThunk } from "../../store/ShowImages";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getAllShowsThunk } from "../../store/shows";
import "./UpdateImageModal.css";

function UpdateImageModal({ image }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [imageUrl, setImageUrl] = useState(image.imageUrl);
  const [newFile, setNewFile] = useState("");
  const [placeholder, setPlaceholder] = useState(image.imageUrl);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let errors = {};
    if (title.length < 5)
      errors.title = "Title must be at least 5 characters long";
    if (newFile && !isValidImageFile(newFile))
      errors.file = "Image must be.jpg, .jpeg, or .png";

    setErrors(errors);
  }, [title, newFile]);

  const reset = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setNewFile("");
    setPlaceholder("");
    setUpdatingImage(false);
    setShowErrors(false);
    setErrors("");

    closeModal();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length) {
      setShowErrors(true);
    } else {
      const updatedImage = {
        title: title,
        imageUrl: updatingImage ? null : imageUrl,
        description: description,
        preview: image.preview,
        showId: image.showId,
        imageFile: updatingImage ? newFile : null,
        id: image.id,
      };

      await dispatch(updateShowImageThunk(updatedImage));

      await dispatch(getAllShowsThunk());

      reset();
    }
  };

  return (
    <div className="update-image-modal-container">
      <form className="update-image-modal-form">
        <div className='update-image-form-top'>
          <div>
            <img
              className="add-show-preview-image"
              src={newFile ? imageUrl : placeholder}
              alt="Image Unavailable"
            ></img>
          </div>
          <div className="add-show-preview-image-inputs-container">
            <input
              className="add-show-preview-image-inputs"
              type="text"
              maxLength="50"
              placeholder="Image Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            {showErrors && errors.title && (
              <p className="add-show-errors-p">{errors.titleitle}</p>
            )}
            <input
              className="add-show-preview-image-inputs"
              type="file"
              onChange={(e) => {
                if (isValidImageFile(e.target.files[0])) {
                  setPlaceholder(e.target.files[0]);
                  setImageUrl(URL.createObjectURL(e.target.files[0]));
                  setNewFile(e.target.files[0]);
                  setUpdatingImage(true);
                } else {
                  setShowErrors(true);
                  setNewFile("");
                  setPlaceholder(
                    "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                  );
                }
              }}
            ></input>
            {showErrors && <p className="add-show-errors-p">{errors.file}</p>}

            <textarea
              className="add-show-preview-image-description-input"
              placeholder="Image Description"
              maxLength="256"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p className={`character-counter`}>{`${description.length}/256`}</p>
          </div>
        </div>
        <div className='update-image-modal-buttons'>
          <button className='update-image-submit-cancel' onClick={onSubmit}>Save</button>
          <button className='update-image-submit-cancel'onClick={reset}>X</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateImageModal;
