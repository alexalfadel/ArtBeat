import React, { useEffect, useState } from 'react';
import './AddCommentButton.css';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { addRsvpThunk, removeRsvpThunk } from '../../store/rsvp';
import { getAllShowsThunk } from '../../store/shows';
import { getAllArtistsThunk } from '../../store/artists';
import { addCommentThunk } from '../../store/comments';

function AddCommentButton({ commentProps }) {
    const dispatch = useDispatch()
    const [ showForm, setShowForm ] = useState(false)
    const [ commentText, setCommentText ] = useState('')
    const [ disabled, setDisabled ] = useState(true)
    const { showId, userId } = commentProps


    useEffect(() => {
        if (commentText.length < 5 || commentText.length > 256) setDisabled(true)
        else setDisabled(false)
    }, [commentText])


    const addCommentButton = <button id='add-comment-button' onClick={() => setShowForm(true)}>Add a Comment+</button>

    const onSubmit = async (e) => {
        e.preventDefault()

        if (commentText.length >= 5 && commentText.length <= 256 && showId && userId) {
            const newComment = {
                text: commentText,
                showId: showId,
                userId: userId
            }
            
            dispatch(addCommentThunk(newComment))

            setShowForm(false)
            setCommentText('')
            setDisabled(true)
        }
    }

    const closeAddComment = (e) => {
        e.preventDefault()
        setShowForm(!showForm)
    }



    return (
        <div>
            {!showForm && addCommentButton}
            {showForm && <form id='add-comment-form'> 
                <textarea id='comment-form-text-area' maxLength='256' minLength='5' type='text' value={commentText} placeholder='Add a comment!' onChange={((e) => setCommentText(e.target.value))}></textarea>
                <div id='comment-form-buttons-box'>
                    <button id='comment-submit' disabled={disabled} onClick={onSubmit}>Add Comment+</button>
                    <button id='comment-cancel' onClick={(closeAddComment)}>X</button>
                </div>
                </form>}
        </div>
    )
}

export default AddCommentButton