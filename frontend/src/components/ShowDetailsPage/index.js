import React, { useEffect, useState } from 'react';
import './ShowDetails.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import { getAllShowsThunk } from '../../store/shows';
import RsvpButton from '../RsvpButton';
import Comment from '../Comment';
import { getAllArtistsThunk } from '../../store/artists';
import AddCommentButton from '../AddCommentButton';

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
    const { showId } = useParams()
    const userData = useSelector((state) => state.session)
    const shows = useSelector((state) => state.shows)
    const { user } = userData;
    const [ currentImage, setCurrentImage ] = useState('')
    const [ currentImageId, setCurrentImageId ] = useState(0)
    // const show = shows.filter((show) => `${show.id}` === showId)[0]
    // const { address, date, description, id, location, name, price, time, userId, ShowImages, User, Rsvps } = show
    // const { user } = userData;
    // const [ rsvpDisable, setRsvpDisable ] = useState(Rsvps.filter((rsvp) => `${rsvp.userId}` === user.id) ? true : false)

    useEffect(() => {
        dispatch(getAllShowsThunk())
        // dispatch(getAllArtistsThunk())
    }, [dispatch])

    if (!user) return <Redirect to="/" />

    if (!shows.length) return <h1>Loading...</h1>

    const show = shows.filter((show) => `${show.id}` === showId)[0]
    const { address, date, description, id, location, name, price, time, userId, ShowImages, User, Rsvps, Comments } = show


    const commentProps = {
        showId: id,
        userId: user.id
    }

    console.log(commentProps, '---commentProps')
    
    const orderedComments = Comments.sort((a1, a2) => 
        (a1.updatedAt < a2.updatedAt) ? -1 : (a1.price > a2.price) ? 1 : 0)
    

    const comments = orderedComments.map((comment) => {
        return <Comment comment={comment}/>
    })
    

    const firstName = User.name.split(' ')[0]

    const imageButtonsHolder = []

    const changeImage = ({ imageUrl, imageId }) => {
        setCurrentImage(imageUrl)
        setCurrentImageId(imageId)
    }

    for (let i = 0; i < ShowImages.length; i++) {
        const imageButton = <button onClick={(() => changeImage({ imageUrl: ShowImages[i].imageUrl, imageId: ShowImages[i].id}))} ><i class="fa-solid fa-circle"></i></button>
        imageButtonsHolder.push(imageButton)
    }

    const imageButtons = imageButtonsHolder.map((button) => button)


    return (
        <div className='show-details-main-box'>
            <div className='show-details-top-box'>
                <div className='show-details-image-box'>
                    {!currentImage && <Link to={`/images/${ShowImages[0].id}`}>
                        <img id='show-details-image' src={ShowImages[0].imageUrl}></img>
                    </Link>}
                    <Link to={`/images/${currentImageId}`}>
                        <img id='show-details-image' src={currentImage}></img>
                    </Link>
                    {imageButtons}
                </div>
                <div className='show-details-info-box'>
                    <div className='show-details-info-text'>
                        <p>Hosted By: {User.name}</p>
                        <p>{description}</p>
                        <div>
                            <p>Location: {address}</p>
                            <p>Time: {formatTime(time)}</p>
                            <p>Price: ${price}.00 at the door</p>
                        </div>
                        <RsvpButton show={show} />
                    </div>
                </div>
                <div>
                    <h2>Thoughts or questions? Let {firstName} know!</h2>
                    <div>
                        {comments}
                    </div>
                    <div>
                        <AddCommentButton commentProps={commentProps}/>
                    </div>  
                </div>
            </div>

        </div>
        
    )
}

export default ShowDetails

