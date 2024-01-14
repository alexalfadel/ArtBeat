import { csrfFetch } from "./csrf";

const GET_ALL_SHOWS = 'shows/getAllShows'
const SET_ERROR = 'shows/setError'

const setError = (error) => {
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
    } else {
        const error = await response.json()
        dispatch(setError(error))
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