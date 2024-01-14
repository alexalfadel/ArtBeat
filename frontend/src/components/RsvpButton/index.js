import React, { useEffect, useState } from 'react';
import './RsvpButton.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { addRsvpThunk } from '../../store/rsvp';
import { getAllShowsThunk } from '../../store/shows';

function RsvpButton({show}) {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.session)
    const allShows = useSelector((state) => state.shows)
    const { user } = userData;
    const { address, date, description, id, location, name, price, time, userId, ShowImages, User, Rsvps } = show
    const userRsvp = Rsvps.filter((rsvp) => rsvp.userId === user.id)

    useEffect(() => {
        console.log('in use effect to dispatch getAllShows')
        dispatch(getAllShowsThunk())
    }, [dispatch, allShows])

    const rsvp = () => {
        console.log('right before dispatching addRsvpThunk')
        dispatch(addRsvpThunk({
            userId: user.id,
            showId: id
        }))
    }
    
    if (userRsvp.length === 0) {
        return (
            <div>
                <button onClick={rsvp}>RSVP</button>
            </div>
        )
    } 


    return (
        <div>
            <p>See you there!</p>
            <p>Can't make it? Click here to un-RSVP.</p>
        </div>
    )
}

export default RsvpButton