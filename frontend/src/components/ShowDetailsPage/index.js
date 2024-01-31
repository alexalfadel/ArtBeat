import React, { useEffect, useState } from 'react';
import './ShowDetails.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams, useHistory } from 'react-router-dom'
import { getAllShowsThunk } from '../../store/shows';
import RsvpButton from '../RsvpButton';
import Comment from '../Comment';
import { getAllArtistsThunk } from '../../store/artists';
import AddCommentButton from '../AddCommentButton';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import ImageModal from '../ImageModal';
import { getPreviewImageThunk } from '../../store/ShowImages';
import { formatDate } from '../ShowCard';

const formatTime = (time) => {
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


function ShowDetails() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { showId } = useParams()
    const currentUser = useSelector((state) => state.session.user)
    const userData = useSelector((state) => state.session)
    const shows = useSelector((state) => state.shows)
    const previewImage = useSelector((state) => state.previewImage)[0]
    // let show = shows.filter((show) => `${show.id}` === showId)[0] 
    const { user } = userData;
    const [ currentImage, setCurrentImage ] = useState('')
    const [ currentImageId, setCurrentImageId ] = useState(null)

    useEffect(() => {
        dispatch(getAllShowsThunk())
        dispatch(getPreviewImageThunk(showId))
        // dispatch(getAllArtistsThunk())
    }, [dispatch])

    // useEffect(() => {}, [currentImage])


    if (!user) return <Redirect to="/" />
    if (!shows.length) return <h1>Loading...</h1>
    const show = shows.filter((show) => `${show.id}` === showId)[0]
    if (!show) history.push('/')
    if (!previewImage) return <h1>Loading...</h1>


    
    // const show = shows.filter((show) => `${show.id}` === showId)[0]
    // if (!show) history.push('/')
    const { address, date, description, id, location, name, price, time, userId, ShowImages, User, Rsvps, Comments } = show

    const isOwnShow = User.id === currentUser.id ? true : false;


    const commentProps = {
        showId: id,
        userId: user.id
    }

    
    const orderedComments = Comments.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1)

    const comments = orderedComments.map((comment) => {
        return <Comment comment={comment}/>
    })
    

    const firstName = User.name.split(' ')[0]

    const imageButtonsHolder = [<button className='image-carousel-button' onClick={(() => changeImage({ imageUrl: previewImage.imageUrl, imageId: previewImage.id}))} ><i class="fa-solid fa-circle"></i></button>]


    if (!currentImageId) {
        setCurrentImageId(previewImage.id)
     
    }


    const changeImage = ({ imageUrl, imageId }) => {
        setCurrentImage(imageUrl)
        setCurrentImageId(imageId)
    }

    for (let i = 0; i < ShowImages.length; i++) {
        if (ShowImages[i].id !== previewImage.id) {
            const imageButton = <button className='image-carousel-button' onClick={(() => {
                changeImage({ imageUrl: ShowImages[i].imageUrl, imageId: ShowImages[i].id})
            })} ><i class="fa-solid fa-circle"></i></button>
            imageButtonsHolder.push(imageButton)
        } 
    }

    const imageButtons = imageButtonsHolder.map((button) => button)

    const image = shows.length ? ShowImages.filter((image) => image.id === currentImageId)[0] : show.ShowImages[0]

    const imageModalProps = {
        image: image,
        artist: User,
        show: show
    }


    return (
        <div className='show-details-main-box'>
            <div className='show-details-top-box'>
                <div className='show-details-image-box'>
                    <img id='show-details-image' src={currentImage ? currentImage : previewImage.imageUrl}></img>
                    <div className='image-buttons-holder'>
                        <OpenModalButton id='see-more-button' buttonText='See more' modalComponent={<ImageModal imageAndArtist={imageModalProps}/>}/>
                        <div id='image-button-carousel-holder'>
                             {imageButtons}
                        </div>
                        
                    </div>
                    
                </div>
                <div className='show-details-info-box'>
                    <div className='show-details-info-text'>
                        <p className='show-details-info-p'>Hosted By: {User.name}</p>
                        <p className='show-details-info-p'>{description}</p>
                        <div>
                            <p className='show-details-info-p'>Location: {address}</p>
                            <p className='show-details-info-p'>Time: {formatTime(time)}</p>
                            <p className='show-details-info-p'>Date: {formatDate(date)}</p>
                            <p className='show-details-info-p'>Price: ${price}.00 at the door</p>
                        </div>
                        {!isOwnShow && <RsvpButton show={show} />}
                    </div>
                </div>
                
            </div>
            <div className='show-details-bottom-box'>
                    <h2>Thoughts or questions? Let {firstName} know!</h2>
                    <div id='all-comments-box'>
                        {comments}
                    </div>
                    <div>
                        <AddCommentButton commentProps={commentProps}/>
                    </div>  
                </div>
        </div>
        
    )
}

export default ShowDetails

