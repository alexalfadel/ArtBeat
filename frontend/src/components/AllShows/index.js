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
    const [ locationFilter, setLocationFilter ] = useState('')
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

    const locations = shows.map((show) => show.location)

    
    const locationButtons = locations.map((location) => {
        return (
            <button className='show-location-button' id={locationFilter === location ? 'location-active' : 'location-inactive'} onClick={(() => setLocationFilter(location))}>{location}</button>
        )
    })

    const createCards = (location) => {
        if (!location) {
            return shows?.map((show) => {
                return (
                <li key={show.id}>
                    <ShowCard show={show}/>
                </li>
                )
            })
        } else {
            return shows.map((show) => {
                if (show.location === location) {
                    return (
                        <li key={show.id}>
                            <ShowCard show={show}/>
                        </li>
                        )
                }
            })
        }
    }


    return (
        <div>
            <h1>All Shows</h1>
            <div>
                {locationButtons}
                <button id={locationFilter === '' ? 'location-active' : 'location-inactive'} onClick={() => setLocationFilter('')}>All</button>
            </div>
            <ul>
                {createCards(locationFilter)}
            </ul>
        </div>
    )
}

export default AllShows