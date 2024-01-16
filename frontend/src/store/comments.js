import { csrfFetch } from "./csrf"
import { getAllShowsThunk } from "./shows"
import { getAllArtistsThunk } from "./artists"
import { setError } from "./shows"

const ADD_COMMENT = 'comments/add'
const DELETE_COMMENT = 'comments/delete'
const EDIT_COMMENT = 'comments/edit'
const SET_ERROR = 'comments/error'

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}


export const addCommentThunk = (comment) => async (dispatch) => {
    const response = await csrfFetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(getAllShowsThunk())
    } else {
        const error = await response.json()
        dispatch(setError(error))
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const response = await res.json()
        dispatch(getAllShowsThunk())
    } else {
        const error = await res.json()
        dispatch(setError(error))
    }
}

export const updateCommentThunk = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const response = await res.json()
        dispatch(getAllShowsThunk())
    } else {
        const error = await res.json()
        dispatch(setError(error))
    }
}