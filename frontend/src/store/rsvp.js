import { csrfFetch } from "./csrf";
import { getAllShowsThunk } from "./shows";
import { getAllArtistsThunk } from "./artists";

const ADD_RSVP = 'rsvp/add'
const REMOVE_RSVP = 'rsvp/remove'
const SET_ERROR = 'rsvp/setError'
const GET_RSVPS = 'rsvp/getRsvps'

const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    }
}

const getRsvps = (rsvps) => {
    return {
        type: GET_RSVPS,
        payload: rsvps
    }
}

export const addRsvpThunk = (data) => async (dispatch) => {
    const { userId, showId } = data;
    
    const response = await csrfFetch('/api/rsvp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, showId})
    })

    const res = await response.json()

    if (response.ok) {
        dispatch(getAllShowsThunk())
    } else {
        dispatch(setError(res))
    }
}

export const removeRsvpThunk = (rsvpId) => async (dispatch) => {
    const response = await csrfFetch(`/api/rsvp/${rsvpId}`, { method: 'DELETE'} )

    if (response.ok) {
        const res = await response.json()
        dispatch(getAllShowsThunk())
    } else {
        const error = await response.json()
        dispatch(setError(error))
        return error
    }
}

export const getAllRsvpsThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/rsvps`)

    if (response.ok) {
        const rsvps = await response.json()
        dispatch(getRsvps(rsvps))
    } else {
        const errors = await response.json()
        dispatch(setError(errors))
    }
}

let initialState = {}

function rsvpReducer (state=initialState, action) {
    let newState;
    switch (action.type) {
        case GET_RSVPS:
            newState = [action.payload]
            return newState
        default:
            return state
    }
}

export default rsvpReducer