import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllShowsThunk } from "../../store/shows"
import { Redirect, useParams, useHistory, Link } from "react-router-dom/"
import OpenModalButton from "../OpenModalButton";
import DeleteImageModal from "../DeleteImageModal";
import './UpdateImages.css'

function UpdateImages() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { showId } = useParams();
    const shows = useSelector((state) => state.shows)
    const user = useSelector((state) => state.session.user);

    

    useEffect(() => {
        dispatch(getAllShowsThunk())
    }, [dispatch])

    if (!user) return <Redirect to="/" />;
    if (!shows.length) return <h1 className='loading-h1'>Loading...</h1>;
    const show = shows.filter((show) => `${show.id}` === showId)[0];
    if (!show) history.push("/");

    const { ShowImages } = show;
    // console.log(ShowImages)

    const previewImage = ShowImages.find((image) => image.preview === true)

    // console.log(previewImage)

    let imageElements = []

    const previewImageElement = (
        <div className='update-images-image-card'>
            <img className='update-image-card-image' src={previewImage.imageUrl} alt='preview image'></img>
            <div className='update-image-buttons'>
                <button className='update-delete-image-button'>Update</button>
            </div>
        </div>
    )

    imageElements.push(previewImageElement)
    // const imageElements = []

    for (let i = 0; i < ShowImages.length; i++) {
        let image = ShowImages[i]
        console.log(image.preview, '---image.preview')
        if (image.preview === false) {
            console.log(image, '----image in if statement')
            let imageElement = (
                <div className='update-images-image-card'>
                    <img className='update-image-card-image' src={image.imageUrl}></img>
                    <div className='update-image-buttons'>
                        <button className='update-delete-image-button'>
                            Update
                        </button>
                        <OpenModalButton id='update-delete-image-button' buttonText='Delete' modalComponent={<DeleteImageModal imageId={image.id}/>}/>

                    </div>
                </div>
            )
            imageElements.push(imageElement)
        }
        
    }
  




    return (
        <div className='update-images-page'>
            <div className='update-images-box'>
                <h1 id='update-images-page-title'>Update Images</h1>
                <div className='update-images-container'>
                    {imageElements}
                    {ShowImages.length < 6 && <p>Add Image</p>}
                </div>
            </div>
        </div>
    )
}

export default UpdateImages