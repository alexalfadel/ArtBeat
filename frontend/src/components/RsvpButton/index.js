import React, { useEffect, useState } from 'react';
import './RsvpButton.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { addRsvpThunk, removeRsvpThunk } from '../../store/rsvp';
import { getAllShowsThunk } from '../../store/shows';
import { getAllArtistsThunk } from '../../store/artists';

function RsvpButton({show}) {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.session)
    const allShows = useSelector((state) => state.shows)
    const { user } = userData;
    const { address, date, description, id, location, name, price, time, userId, ShowImages, User, Rsvps } = show
    const userRsvp = Rsvps.filter((rsvp) => rsvp.userId === user.id)

    useEffect(() => {
        dispatch(getAllShowsThunk())
        // dispatch(getAllArtistsThunk())
    }, [dispatch, allShows.Rsvps])

    const rsvp = () => {
        dispatch(addRsvpThunk({
            userId: user.id,
            showId: id
        }))
    }

    const unRsvp = () => {
        dispatch(removeRsvpThunk(userRsvp[0].id))
    }
    
    if (userRsvp.length === 0) {
        return (
            <div className='rsvp-button-box'>
                <button className='rsvp-button' id='rsvp-button' onClick={rsvp}>RSVP</button>
            </div>
        )
    } 


    return (
        <div className='rsvp-button-box'>
            <p className='rsvp-button'>See you there!</p>
            <p id='unrsvp-p'>Can't make it? Click <span onClick={unRsvp}>here</span> to un-RSVP.</p>
        </div>
    )
}

export default RsvpButton