import React, { useEffect, useState } from "react";
import "./Comment.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { getAllShowsThunk } from "../../store/shows";
import RsvpButton from "../RsvpButton";
import { getAllArtistsThunk } from "../../store/artists";
import { deleteCommentThunk } from "../../store/comments";
import { updateCommentThunk } from "../../store/comments";

function Comment({ comment }) {
  const dispatch = useDispatch();
  const artistsObj = useSelector((state) => state.artists);
  const user = useSelector((state) => state.session).user;
  const shows = useSelector((state) => state.shows);
  const show = shows.filter((show) => show.id === comment.showId);
  const artists = artistsObj[0];
  const [update, setUpdate] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);
  const [updatedCommentText, setUpdatedCommentText] = useState(comment.text);

  // useEffect(() => {
  //     dispatch(getAllArtistsThunk())
  //     }, [dispatch, show.Rsvps])

  if (!artists) return <h1>Loading...</h1>;
  const artist = artists.filter((artist) => artist.id === comment.userId)[0];

  const commentOwner = artist.id === user.id ? true : false;

  const deleteCommentButton = () => {
    dispatch(deleteCommentThunk(comment.id));
    setDeleteComment(false);
  };

  const saveUpdatedComment = (e) => {
    e.preventDefault();

    if (updatedCommentText.length > 5 && updatedCommentText.length <= 256) {
      const updatedComment = {
        id: comment.id,
        userId: user.id,
        text: updatedCommentText,
      };

      dispatch(updateCommentThunk(updatedComment));
      setUpdate(false);
      // setUpdatedCommentText(comment.text)
    }
  };

  const closeUpdateForm = (e) => {
    e.preventDefault();
    setUpdate(false);
    setUpdatedCommentText(comment.text);
  };

  const closeDelete = (e) => {
    e.preventDefault()
    setDeleteComment(false)
  }

  return (
    <div>
      {!update && !deleteComment && (
        <div className='individual-comment-box'>
          <div className='comment-text-and-buttons'>
          <p className='comment-text' >{comment.text}</p>
          {commentOwner && (
            <div id='comment-update-delete-buttons'>
              <i id='update-comment-button'
                onClick={() => setUpdate(true)}
                class="fa-regular fa-pen-to-square"
              ></i>
              <i id='delete-comment-button'
                onClick={() => setDeleteComment(true)}
                class="fa-solid fa-trash-can"
              ></i>
            </div>
          )}
          </div>
          <Link id='comment-box-artist-link' to={`/artists/${artist.id}`}>--{artist.username}</Link>
        </div>
      )}
      {deleteComment && (
        <div className='individual-comment-box'>
          <p id='delete-comment-text'>Are you sure you want to delete this comment?</p>
          <div id='delete-comment-buttons-box'>
            <button id='confirm-delete-comment' onClick={deleteCommentButton}>Yes</button>
            <button id='cancel-delete-comment' onClick={closeDelete}>No</button>
          </div>
        </div>
      )}
      {update && (
        <div className='individual-comment-box'>
          <form className='update-comment-form'>
            <textarea id='update-comment-textarea'
              maxLength="256"
              minLength="5"
              type="text"
              value={updatedCommentText}
              placeholder="Update your comment..."
              onChange={(e) => setUpdatedCommentText(e.target.value)}
            ></textarea>
            <div id='update-comment-form-buttons'>
              <button id='save-updated-comment' onClick={saveUpdatedComment}>Save</button>
              <button id='cancel-updated-comment' onClick={closeUpdateForm}>X</button>
            </div>
            
          </form>
        </div>
      )}
    </div>
  );
}

export default Comment;
