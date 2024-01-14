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

    const res = await response.json()

    if (response.ok) {
        console.log(data, '----response.ok in addRSVPThunk----')
        dispatch(getAllShowsThunk())
    } else {
        console.log(res, '----error in addRSVPThunk----')
        dispatch(setError(res))
    }
}

export const removeRsvpThunk = (rsvpId) => async (dispatch) => {
    console.log(rsvpId, '------in removeRsvpThunk')
    const response = await csrfFetch(`/api/rsvp/${rsvpId}`, { method: 'DELETE'} )

    if (response.ok) {
        const res = response.json()
        dispatch(getAllShowsThunk())
    } else {
        const error = response.json()
        dispatch(setError(error))
        return error
    }
}