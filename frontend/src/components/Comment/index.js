import React, { useEffect, useState } from 'react';
import './Comment.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import { getAllShowsThunk } from '../../store/shows';
import RsvpButton from '../RsvpButton';
import { getAllArtistsThunk } from '../../store/artists';

function Comment({comment}) {
    const dispatch = useDispatch()
    const artistsObj = useSelector((state) => state.artists)
    const shows = useSelector((state) => state.shows)
    const show = shows.filter((show) => show.id === comment.showId)
    const artists = artistsObj[0]
    console.log(shows)
    // if (!artists) return <h1>Loading...</h1>
    // const artist = artists.filter((artist) => artist.id === comment.userId)[0]
    // console.log(artists[0])
    // const { username, id } = artist
    // console.log(artist, 'artist')
    // console.log(artist, '----artist')

    useEffect(() => {
        dispatch(getAllArtistsThunk())
        }, [dispatch, show.Rsvps])

    if (!artists) return <h1>Loading...</h1>
    const artist = artists.filter((artist) => artist.id === comment.userId)[0]

    return (
        <div>
            <p>{comment.text}</p>
            <Link to={`/artits/${artist.id}`}>--{artist.username}</Link>
        </div>
    )
}

export default Comment