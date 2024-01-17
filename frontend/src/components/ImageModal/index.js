import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import './ImageModal.css'

function ImageModal({ imageAndArtist }) {
    const { image, artist, show } = imageAndArtist
    const { closeModal } = useModal()
    const artists = useSelector((state) => state.artists)
    const shows = useSelector((state) => state.shows)
    // const show = shows.filter((show) => show.id === image.showId)[0]
    // const artist = artists.filter((artist) => artist.id === show.userId)

    // console.log(imageAndArtist, '----imageModalProps')
    console.log(show, '----show')
    console.log(artist, '----artists')
    // console.log(User, '---artist')
    console.log(image, '----in image modal')
    return (
        <div>
            <p onClick={closeModal}>X</p>
            <div>
                <div>
                    <img className='image-modal-image' src={image.imageUrl} alt={image.title}></img>
                    <p>{image.title}</p>
                </div>
                <div>
                    {/* <p>hiiiii</p> */}
                    <img src={artist.profilePic}></img>
                    <p>{artist.name}</p>
                    <p>{artist.bio}</p>
                </div>
            </div>
            <div>
                <p>{image.description}</p>
            </div>
        </div>
    )
}

export default ImageModal