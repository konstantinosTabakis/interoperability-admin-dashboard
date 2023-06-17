import { useContext } from 'react';
import exitIcon from '../assets/img/exit.png'
import SurveyContext from '../context/SurveyContext';
import { deleteSurvey } from '../db/db-services';
import deleteIcon from '../assets/img/delete.png'

function DeleteModal({ handleDelete, survey }) {

    const { dispatch } = useContext(SurveyContext)

    const closeModal = () => {
        handleDelete();
    };

    const handleConfirm = async () => {
        dispatch({ type: 'DELETE_SURVEY', id: survey.id })
        await deleteSurvey(survey.id)
        closeModal()
    }
    return (
        <div className='card modal'>
            <div className="btn-area">
                <button>
                    <img src={exitIcon} onClick={closeModal} alt="exit icon" />
                </button>
            </div>
            <div className="centered">
                <img src={deleteIcon} className='deleteIcon mg-b-small' alt="delete icon" />
            </div>
            <p className='centered '>You are about to delete <span className="bold">{survey.name}</span>,</p>
            <p className='centered mg-b-small'>Are you sure?</p>
            <button className="btn btn-delete w-100" onClick={handleConfirm}>Confirm</button>

        </div>
    )
}

export default DeleteModal