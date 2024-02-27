import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllShowsThunk } from "../../store/shows"
import { Redirect, useParams, useHistory, Link } from "react-router-dom/"

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
    console.log(ShowImages)

    const previewImage = ShowImages.find((image) => image.preview === true)

    console.log(previewImage)

    const previewImageElement = (
        <div>
            <img src={previewImage.imageUrl} alt='preview image'></img>
            <div>
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )

    let imageElements = ShowImages.forEach((image) => {
        return (
            <div>
                <img src={image.imageUrl}></img>
                <button>
                    Update
                </button>
                <button>
                    Delete
                </button>
            </div>
        )
    })


    return (
        <div>
            <h1>Update Images</h1>
            <div>
                {previewImageElement}
                {imageElements}
            </div>
        </div>
    )
}

export default UpdateImages