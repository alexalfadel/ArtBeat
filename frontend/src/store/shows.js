import { csrfFetch } from "./csrf";
import { getAllArtistsThunk } from "./artists";

const GET_ALL_SHOWS = 'shows/getAllShows'
const SET_ERROR = 'shows/setError'

export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    }
}

const getAllShows = (shows) => {
    return {
        type: GET_ALL_SHOWS,
        payload: shows
    }
}

export const getAllShowsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/shows')
    if (response.ok) {
        const shows = await response.json()
        dispatch(getAllShows(shows))
        dispatch(getAllArtistsThunk())
    } else {
        const error = await response.json()
        dispatch(setError(error))
    }
}

export const deleteShowThunk = (showId) => async (dispatch) => {
    const response = await csrfFetch(`/api/shows/${showId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const message = await response.json()
        dispatch(getAllShowsThunk())
    } else {
        const error = await response.json()
        dispatch(setError(error))
    }
}

export const addShowThunk = (show) => async (dispatch) => {
    console.log(show, '---in addShowThunk')

    console.log(show, '---show that will be added in the thunk')
    const response = await csrfFetch('/api/shows/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(show)
    })

    if (response.ok) {
        const show = await response.json()
        console.log(show, '----show, in res.ok')
        return show
    } else {
        const error = await response.json()
        console.log(error, '----error, in thunk')
        dispatch(setError(error))
        return error
    }
}

const initialState = {}

function showsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_SHOWS:
            newState = action.payload
            return newState
        default:
            return state
    }
}

export default showsReducer