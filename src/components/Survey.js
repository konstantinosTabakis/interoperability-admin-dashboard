import { useContext, useState } from 'react'
import surveyIcon from '../assets/img/survey.png'
import UserContext from '../context/UserContext'
import downloadIcon from '../assets/img/download.png'
import DeleteModal from './DeleteModal'
import { motion, AnimatePresence } from 'framer-motion'
import { jsonWriter } from '../utils/writers'


function Survey({ survey }) {
    const { currentUserRole, dispatch } = useContext(UserContext)
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        dispatch({ type: 'TOGGLE_TRANSPARENT' })
        setDeleting(!deleting)
    }

    const downloadJSON = () => {
        jsonWriter(survey, survey.name)
    }

    return (
        <>

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
                        <button className="btn btn-primary " onClick={handleDelete}>Delete Survey</button>
                    )}

                    <button className='btn-download' onClick={downloadJSON}>
                        <img src={downloadIcon} alt="download icon" />
                    </button>
                </div>

            </div>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} >
                    {deleting && (
                        <DeleteModal handleDelete={handleDelete} survey={survey} />
                    )}
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default Survey