import { csrfFetch } from "./csrf";
import { getAllShowsThunk } from "./shows";

const ADD_RSVP = 'rsvp/add'
const REMOVE_RSVP = 'rsvp/remove'
const SET_ERROR = 'shows/setError'

const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    }
}

export const addRsvpThunk = (data) => async (dispatch) => {
    console.log('-------in addRsvpThunk-----')
    const { userId, showId } = data;
    
    const response = await csrfFetch('/api/rsvp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, showId})
    })

    if (response.ok) {
        console.log('----response.ok in addRSVPThunk----')
        const data = await response.json()
        dispatch(getAllShowsThunk())
    } else {
        console.log('----error in addRSVPThunk----')
        const error = await response.json()
        dispatch(setError(error))
    }
}