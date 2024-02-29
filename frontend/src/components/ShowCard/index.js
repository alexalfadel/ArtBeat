import React, { useEffect, useState } from 'react';
import './ShowCard.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

export const formatDate = (date) => {
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }
    const splitOne = date.split('-')
    const year = splitOne[0]
    const month = splitOne[1]
    let day = splitOne[2]
    day = day.split('T')[0]
    return `${months[month]} ${day}, ${year}`
}

function ShowCard ({show}) {
    const { address, date, description, id, location, name, price, time, userId, ShowImages, User, Rsvps } = show
    const previewImage = ShowImages.filter((image) => image.preview === true)[0]
    const rsvpCount = Rsvps.length

    if (!ShowImages) return <h1 className='loading'>Loading...</h1>
    if (!previewImage) return <h1 className='loading'>Loading...</h1>
    // const previewImage = ShowImages.filter((image) => image.preview === true)[0]

   


    return (
        <Link className='show-card-link' id={`show-${id}-link`} to={`/shows/${id}`}>
        <div className='show-card-box'>
            <div>
                <img className='show-card-image' src={previewImage.imageUrl} alt={previewImage.title}></img>
            </div>
            <div id='show-card-text-box'>
                <div className='show-card-upper-text-box'>
                    <p className='show-card-text'>{name}</p>
                    <p className='show-card-text'>{location}</p>
                    <p className='show-card-text'>{formatDate(date)}</p>
                </div>
                <div>
                    <p className='show-card-text'>{rsvpCount} RSVP's</p>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default ShowCard