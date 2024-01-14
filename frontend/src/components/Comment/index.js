import React, { useEffect, useState } from 'react';
import './Comment.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import { getAllShowsThunk } from '../../store/shows';
import RsvpButton from '../RsvpButton';
import { getAllArtistsThunk } from '../../store/artists';

function Comment({comment}) {
    const dispatch = useDispatch()
    const artists = useSelector((state) => state.artists)[0]
    const artist = artists.filter((artist) => artist.id === comment.userId)[0]
    // console.log(artists[0])
    // const { username, id } = artist
    // console.log(artist, 'artist')
    // console.log(artist, '----artist')

    useEffect(() => {
        dispatch(getAllArtistsThunk())
    }, [dispatch])

    return (
        <div>
            <p>{comment.text}</p>
            <Link to={`/artits/${artist.id}`}>--{artist.username}</Link>
        </div>
    )
}

export default Comment