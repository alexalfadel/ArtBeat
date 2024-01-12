import React, { useEffect, useState } from 'react';
import './ShowDetails.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import { getAllShowsThunk } from '../../store/shows';

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
    // const show = shows.filter((show) => `${show.id}` === showId)[0]
    // const { address, date, description, id, location, name, price, time, userId, ShowImages, User, Rsvps } = show
    // const { user } = userData;
    // const [ rsvpDisable, setRsvpDisable ] = useState(Rsvps.filter((rsvp) => `${rsvp.userId}` === user.id) ? true : false)

    useEffect(() => {
        dispatch(getAllShowsThunk())
    }, [dispatch])

    if (!user) return <Redirect to="/" />

    if (!shows.length) return <h1>Loading...</h1>

    const show = shows.filter((show) => `${show.id}` === showId)[0]
    const { address, date, description, id, location, name, price, time, userId, ShowImages, User, Rsvps } = show
    

    

    // const isRsvpd = Rsvps.filter((rsvp) => `${rsvp.userId}` === user.id) ? true : false
    
    // console.log(rsvpDisable)

    return (
        <div className='show-details-main-box'>
            <div className='show-details-top-box'>
                <div className='show-details-image-box'>
                    <img id='show-details-image' src={ShowImages[0].imageUrl}></img>
                </div>
                <div className='show-details-info-box'>
                    <div className='show-details-info-text'>
                        <p>Hosted By: {User.name}</p>
                        <p>{description}</p>
                        <div>
                            <p>Location: {location}</p>
                            <p>Time: {formatTime(time)}</p>
                            <p>Price: ${price}.00 at the door</p>
                        </div>
                        <button>RSVP</button>
                    </div>
                </div>
                <div>
                    Comments box
                </div>
            </div>

        </div>
        
    )
}

export default ShowDetails

