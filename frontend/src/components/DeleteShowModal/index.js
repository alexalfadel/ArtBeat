import './DeleteShowModal.css'
import { useDispatch } from 'react-redux'
import { deleteShowThunk } from '../../store/shows'
import { useModal } from '../../context/Modal'

function DeleteShowModal({showId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleteShow = () => {
        dispatch(deleteShowThunk(showId))
        closeModal()
    }

    return (
        <div id='delete-show-modal'>
            <h2>Are you sure you'd like to delete your upcoming show?</h2>
            <div id='delete-show-buttons-holder'>
            <button className='delete-show-modal-buttons' onClick={deleteShow}>Yes</button>
            <button className='delete-show-modal-buttons' onClick={closeModal}>No</button>
            </div>
        </div>
    )
}

export default DeleteShowModal