import { csrfFetch } from "./csrf"
import { restoreUser } from "./session"

const GET_ARTIST = 'artists/get'
const GET_ALL_ARTISTS = 'artists/get_all'
const SET_ERROR = 'artists/error'

const get_artist = (user) => {
    return {
        type: GET_ARTIST,
        payload: user
    }
}

const get_all_artists = (artists) => {
    return {
        type: GET_ALL_ARTISTS,
        payload: artists
    }
}

const set_error = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    }
} 

export const getArtistThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`)

    if (response.ok) {
        const user = await response.json()
        dispatch(get_artist(user.user))
    } else {
        const error = await response.json()
        dispatch(set_error(error))
    }
}

export const getAllArtistsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/users')

    if (response.ok) {
        const artists = await response.json()
        dispatch(get_all_artists(artists.artists))
    } else {
        const error = await response.json()
        dispatch(set_error(error))
    }
}

export const updateArtistThunk = (artist) => async (dispatch) => {
    let {id, username, bio, location, profilePic} = artist

    let newProfilePic;

    if (profilePic) {
        const profilePicFormData = new FormData()
        profilePicFormData.append('image', profilePic)

        const profilePicUrlResponse = await csrfFetch(`/api/images/addProfilePic`, {
            method: "POST",
            body: profilePicFormData
        })

        newProfilePic = await profilePicUrlResponse.json()
    }

    


    const response = await csrfFetch(`/api/users/${artist.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            username,
            bio,
            location,
            profilePic: newProfilePic
        })
    })

    if (response.ok) {
        const res = await response.json()
        dispatch(restoreUser())
        // dispatch(getAllArtistsThunk())
    } else {
        const errors = await response.json()
        dispatch(set_error(errors))
    }
}

const initialState = {}

function artistsReducer(state=initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ARTIST:
            newState = [action.payload]
            return newState
        case GET_ALL_ARTISTS:
            newState = [action.payload]
            return newState
        case SET_ERROR:
            newState = [action.error]
            return newState
        default:
            return state
    }

}

export default artistsReducer