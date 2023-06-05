import { useContext } from 'react'
import surveyIcon from '../assets/img/survey.png'
import SurveyContext from '../context/SurveyContext'
import UserContext from '../context/UserContext'
import { deleteSurvey } from '../db/db-services'

function Survey({ survey }) {
    const { dispatch } = useContext(SurveyContext)
    const { currentUserRole } = useContext(UserContext)

    const handleDelete = async () => {
        dispatch({ type: 'DELETE_SURVEY', id: survey.id })
        await deleteSurvey(survey.id)
    }

    const downloadJSON = () => {
        const json = JSON.stringify(survey);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = survey.name;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className='card mg-b-medium survey' key={survey.id}>
            <div className="icon-area">
                <img src={surveyIcon} alt="" />
                {survey.label && (
                    <span> {survey.label} </span>
                )}
            </div>
            <h4 className="heading-secondary mg-b-tiny">
                {survey.name}
            </h4>
            <p> {survey.description}  </p>
            <input type="checkbox" id={survey.id} />
            <label htmlFor={survey.id}>Show Questions</label>
            <div className="survey__questions mg-t-tiny">
                <ol>
                    {survey.questions && survey.questions.map((el) => (
                        <li key={el.id}>
                            {el.question}
                        </li>

                    ))}
                </ol>
            </div>
            <div className='btn-wrapper mg-t-small'>

                {currentUserRole === 'admin' && (
                    <button className="btn btn-delete " onClick={handleDelete}>Delete Survey</button>
                )}

                <button className='btn-download' onClick={downloadJSON}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3580/3580085.png" alt="download icon" />
                </button>
            </div>




        </div>
    )
}

export default Survey