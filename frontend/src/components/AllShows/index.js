import React, { useEffect, useState } from 'react';
import './AllShows.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getAllShowsThunk } from '../../store/shows';
import ShowCard from '../ShowCard';


function AllShows () {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.session)
    const shows = useSelector((state) => state.shows)
    const { user } = userData;

    useEffect(() => {
        dispatch(getAllShowsThunk())
    }, [dispatch])

    if (!user) return <Redirect to="/" />

    if (!shows.length) return <h1>Loading...</h1>

    const showCards = shows?.map((show) => {
        return (
        <li key={show.id}>
            <ShowCard show={show}/>
        </li>
        )
    })

    // console.log(shows)
    // console.log(showCards)

    return (
        <div>
            <h1>All Shows</h1>
            <ul>
                {showCards}
            </ul>
        </div>
    )
}

export default AllShows