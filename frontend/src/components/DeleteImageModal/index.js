import './DeleteImageModal.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteShowImageThunk } from '../../store/ShowImages'

function DeleteImageModal({imageId}) {
    console.log(imageId, '---imageId')
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleteImage = () => {
        dispatch(deleteShowImageThunk(imageId))
        closeModal()
    }

    return (
        <div id='delete-show-modal'>
            <h2>Are you sure you'd like to delete this image?</h2>
            <div id='delete-show-buttons-holder'>
            <button className='delete-show-modal-buttons' onClick={deleteImage}>Yes</button>
            <button className='delete-show-modal-buttons' onClick={closeModal}>No</button>
            </div>
        </div>
    )
}

export default DeleteImageModal