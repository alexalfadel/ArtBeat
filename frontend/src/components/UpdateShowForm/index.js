import './UpdateShowForm.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from "react";
import { validProfilePic } from "../SignUpFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isValidAddress, formatTime } from '../AddShowForm';
import { getAllShowsThunk } from '../../store/shows';

const deconstructTime = (time) => {
    const splitTime = time.split(':')
    if (Number(splitTime[0]) <= 12) {
        if ( Number(splitTime[0]) === 12 && Number(splitTime[1]) === 0) return `${time} AM`
        else if (Number(splitTime[0]) === 12) return `${time} PM`
        else return `${time} AM`
    } else {
        const newTime = Number(splitTime[0]) - 12
        return `${newTime}:00 PM`
    }
}

function UpdateShowForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { showId } = useParams()
    const allShows = useSelector((state) => state.shows)
    // const show = allShows?.filter((show) => `${show.id}` === showId)[0]
    // const showImages = show?.ShowImages
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [amPm, setAmPm] = useState("am");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [previewImagePlaceholder, setPreviewImagePlaceholder] = useState(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [previewImageTitle, setPreviewImageTitle] = useState("");
    const [previewImageDescription, setPreviewImageDescription] = useState("");
    const [showImage1, setShowImage1] = useState("");
    const [showImage2, setShowImage2] = useState("");
    const [showImage3, setShowImage3] = useState("");
    const [showImage4, setShowImage4] = useState("");
    const [showImage5, setShowImage5] = useState("");
    const [imageCounter, setImageCounter] = useState(0);
    const [image1Placeholder, setImage1Placeholder] = useState(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    const [image2Placeholder, setImage2Placeholder] = useState(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    const [image3Placeholder, setImage3Placeholder] = useState(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    const [image4Placeholder, setImage4Placeholder] = useState(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    const [image5Placeholder, setImage5Placeholder] = useState(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    const [image1Title, setImage1Title] = useState("");
    const [image2Title, setImage2Title] = useState("");
    const [image3Title, setImage3Title] = useState("");
    const [image4Title, setImage4Title] = useState("");
    const [image5Title, setImage5Title] = useState("");
    const [image1Url, setImage1Url] = useState("");
    const [image2Url, setImage2Url] = useState("");
    const [image3Url, setImage3Url] = useState("");
    const [image4Url, setImage4Url] = useState("");
    const [image5Url, setImage5Url] = useState("");
    const [image1Description, setImage1Description] = useState("");
    const [image2Description, setImage2Description] = useState("");
    const [image3Description, setImage3Description] = useState("");
    const [image4Description, setImage4Description] = useState("");
    const [image5Description, setImage5Description] = useState("");


    useEffect(() => {
        dispatch(getAllShowsThunk())
    }, [dispatch])

    // if (!Object.keys(allShows).length) return <h1>Loading...</h1>

    useEffect(() => {
        if (Object.keys(allShows).length) {
            const show = allShows?.filter((show) => `${show.id}` === showId)[0]
            const showImages = show?.ShowImages
            const previewImage = showImages?.filter((image) => image.preview === true)[0]
            console.log(showImages, '----showImages')
            setName(show.name)
            setDescription(show.description)
            setAddress(show.address)
            setLocation(show.location)
            const formattedTime = deconstructTime(show.time)
            const splitTime = formattedTime.split(' ')
            if (splitTime[splitTime.length - 1] === 'AM') {
                setTime(splitTime[0])
                setAmPm('am')
            } else {
                setTime(splitTime[0])
                setAmPm('pm')
            }
            setDate(show.date)
            setPrice(show.price)
            setPreviewImageTitle(previewImage.title)
            setPreviewImageUrl(previewImage.url)
            setPreviewImageDescription(previewImage.description)
            if (showImages[0]) {
                setImage1Title(showImages[0].title)
                setImage1Description(showImages[0].description)
                setImage1Url(showImages[0].url)
                setShowImage1(true)
            }
            if (showImages[1]) {
                setImage2Title(showImages[1].title)
            }
        }
    }, [allShows])

    console.log(allShows, '----allShows')

    if (!Object.keys(allShows).length) return <h1>Loading...</h1>

    // const show = allShows?.filter((show) => `${show.id}` === showId)[0]

    // const showImages = show?.ShowImages


    console.log(allShows)
    
    return (
        <div>
            update show form
        </div>
    )
}

export default UpdateShowForm