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

    return (
        <div className='card mg-b-medium survey' key={survey.id}>
            <div className="icon-area">
                <img src={surveyIcon} alt="" />

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
            {currentUserRole === 'admin' && (
                <button className="btn btn-delete mg-t-small" onClick={handleDelete}>Delete Survey</button>
            )}
        </div>
    )
}

export default Survey