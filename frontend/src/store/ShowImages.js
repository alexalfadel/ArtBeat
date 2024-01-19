import { csrfFetch } from "./csrf";
import { getAllShowsThunk, setError } from "./shows";

const GET_PREVIEW_IMAGE = "images/get_preview";

const getImage = (image) => {
  return {
    type: GET_PREVIEW_IMAGE,
    payload: image.previewImage,
  };
};

export const getPreviewImageThunk = (showId) => async (dispatch) => {
  const response = await csrfFetch(`/api/shows/${showId}/preview`);

  if (response.ok) {
    const image = await response.json();
    dispatch(getImage(image));
  } else {
    const error = await response.json();
    dispatch(setError(error));
  }
};

export const addShowImage = (showImage) => async (dispatch) => {
  const response = await csrfFetch(`/api/images`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(showImage),
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(getAllShowsThunk());
  } else {
    const errors = await response.json();
    dispatch(getAllShowsThunk());
  }
};

const initialState = {};

function PreviewImageReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_PREVIEW_IMAGE:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export default PreviewImageReducer;
