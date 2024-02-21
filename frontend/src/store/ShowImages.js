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

export const addShowImageToAws = (imageData) => async (req, res) => {
  const { title, description, preview, showId, imageFile} = imageData

  
  const formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)
  formData.append('preview', preview)
  formData.append('showId', showId)
  formData.append('image', imageFile)

  const response = await csrfFetch('/api/images/upload', {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    const imageUrl = await response.json()
  } else {
    const err = await response.json()
  }
}

export const addShowImage = (showImage) => async (dispatch) => {
  const response = await csrfFetch(`/api/images`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: showImage,
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(getAllShowsThunk());
  } else {
    const errors = await response.json();
    dispatch(getAllShowsThunk());
  }
};

export const updateShowImageThunk = (imageData) => async (dispatch) => {
  let { title, description, preview, showId, imageFile, imageUrl, id} = imageData
  console.log(imageData, '----imageData')

  // let newImageUrl;
  if (imageFile) {
    console.log('----we have an image file')
    const updateImageFormData = new FormData()
    updateImageFormData.append('image', imageFile)
    updateImageFormData.append('id', id)

    const response = await csrfFetch(`/api/images/${id}/url`, {
      method: 'PUT',
      body: updateImageFormData
    })

    if (response.ok) {
     imageUrl = await response.json()
    } else {
      const error = await response.json()
      dispatch(setError(error))
    }
  }

  console.log(imageUrl, '---imageUrl')

  // const formData = new FormData()
  // formData.append('title', title)
  // formData.append('description', description)
  // formData.append('preview', preview)
  // formData.append('showId', showId)
  // // formData.append('image', imageFile)
  // formData.append('imageUrl', imageUrl)
  // formData.append('id', id)

  const response = await csrfFetch(`/api/images/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      description: description,
      preview: preview,
      showId: showId,
      imageUrl: imageUrl,
      id: id
    })
  })

  if (response.ok) {
    const updatedImage = await response.json()
    return updatedImage
  } else {
    const error = await response.json()
    dispatch(setError(error))
  }
}

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
