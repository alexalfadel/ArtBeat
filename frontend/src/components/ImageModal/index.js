import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import "./ImageModal.css";

function ImageModal({ imageAndArtist }) {
  const { image, artist, show } = imageAndArtist;
  const { closeModal } = useModal();
  const artists = useSelector((state) => state.artists);
  const shows = useSelector((state) => state.shows);
  const previewImageDetails = show.ShowImages.filter(
    (showImage) => showImage.preview === true
  )[0];

  if (!image) {
    return (
      <div id="image-modal">
        <p id="leave-image-modal" onClick={closeModal}>
          X
        </p>
        <div className="image-modal-image-info-box">
          <div id="image-modal-image-box">
            <img
              className="image-modal-image"
              src={previewImageDetails.imageUrl}
              alt={previewImageDetails.title}
            ></img>
            <p id="image-modal-image-title">{previewImageDetails.title}</p>
          </div>
          <div id="image-modal-artist-box">
            {/* <p>hiiiii</p> */}
            <img id="image-modal-artist-pic" src={artist.profilePic}></img>
            <p>{artist.name}</p>
            <p>{artist.bio}</p>
          </div>
        </div>
        <div id="image-modal-image-description-box">
          <p>{previewImageDetails.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div id="image-modal">
      <p id="leave-image-modal" onClick={closeModal}>
        X
      </p>
      <div className="image-modal-image-info-box">
        <div id="image-modal-image-box">
          <img
            className="image-modal-image"
            src={image.imageUrl}
            alt={image.title}
          ></img>
          <p id="image-modal-image-title">{image.title}</p>
        </div>
        <div id="image-modal-artist-box">
          {/* <p>hiiiii</p> */}
          <img id="image-modal-artist-pic" src={artist.profilePic}></img>
          <p>{artist.name}</p>
          <p>{artist.bio}</p>
        </div>
      </div>
      <div id="image-modal-image-description-box">
        <p>{image.description}</p>
      </div>
    </div>
  );
}

export default ImageModal;
