import { csrfFetch } from "./csrf"

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ credential, password })
    })

    if (response.ok) {
        const data = await response.json()
        await dispatch(setUser(data.user))
    } else {
        const errors = await response.json()
        return errors
    }
} 

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    const { username, name, location, profilePic, bio, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        name,
        location,
        bio,
        profilePic,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

const initialState = { user: null }

function sessionReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case SET_USER:
            newState.user = action.payload
            return newState
        case REMOVE_USER:
            return { user: null }
        default:
            return state
    }
}

export default sessionReducer