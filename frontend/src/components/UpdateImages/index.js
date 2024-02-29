import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllShowsThunk } from "../../store/shows"
import { Redirect, useParams, useHistory, Link } from "react-router-dom/"
import OpenModalButton from "../OpenModalButton";
import DeleteImageModal from "../DeleteImageModal";
import AddImageModal from "../AddImageModal";
import UpdateImageModal from "../UpdateImageModal";
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
  

    const previewImage = ShowImages.find((image) => image.preview === true)



    let imageElements = []

    const previewImageElement = (
        <div className='update-images-image-card'>
            <img className='update-image-card-image' src={previewImage.imageUrl} alt='preview image'></img>
            <div className='update-image-buttons'>
            <OpenModalButton id='update-delete-image-button' buttonText='Update' modalComponent={<UpdateImageModal image={previewImage}/>}/>

            </div>
        </div>
    )

    imageElements.push(previewImageElement)
    // const imageElements = []

    for (let i = 0; i < ShowImages.length; i++) {
        let image = ShowImages[i]
  
        if (image.preview === false) {

            let imageElement = (
                <div className='update-images-image-card'>
                    <img className='update-image-card-image' src={image.imageUrl}></img>
                    <div className='update-image-buttons'>
                    <OpenModalButton id='update-delete-image-button' buttonText='Update' modalComponent={<UpdateImageModal image={image}/>}/>

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
                    {ShowImages.length < 6 && <OpenModalButton id='add-image-modal-button' buttonText='Add Image+' modalComponent={<AddImageModal showId={showId}/>}/>}
                </div>
            </div>
        </div>
    )
}

export default UpdateImages