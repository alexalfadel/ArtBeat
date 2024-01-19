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

    if (updatedCommentText.length > 5 && updatedCommentText.length < 256) {
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

  return (
    <div>
      {!update && !deleteComment && (
        <div>
          <p>{comment.text}</p>
          {commentOwner && (
            <div>
              <i
                onClick={() => setUpdate(true)}
                class="fa-regular fa-pen-to-square"
              ></i>
              <i
                onClick={() => setDeleteComment(true)}
                class="fa-solid fa-trash-can"
              ></i>
            </div>
          )}
          <Link to={`/artists/${artist.id}`}>--{artist.username}</Link>
        </div>
      )}
      {deleteComment && (
        <div>
          <p>Are you sure you want to delete this comment?</p>
          <button onClick={deleteCommentButton}>Yes</button>
          <button onClick={() => setDeleteComment(false)}>No</button>
        </div>
      )}
      {update && (
        <div>
          <form>
            <textarea
              maxLength="256"
              minLength="5"
              type="text"
              value={updatedCommentText}
              placeholder="Update your comment..."
              onChange={(e) => setUpdatedCommentText(e.target.value)}
            ></textarea>
            <button onClick={saveUpdatedComment}>Save</button>
            <button onClick={closeUpdateForm}>X</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Comment;
