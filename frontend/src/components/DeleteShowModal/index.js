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
        <div>
            <h2>Are you sure you'd like to delete your upcoming show?</h2>
            <button onClick={deleteShow}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
}

export default DeleteShowModal