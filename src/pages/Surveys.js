import { useContext, useState } from "react"
import SurveyContext from "../context/SurveyContext"
import UserContext from "../context/UserContext"
import Survey from "../components/Survey"
import { useEffect } from "react"
import { getAllSurveys } from "../db/db-services"
import { motion, AnimatePresence } from 'framer-motion'


function Surveys() {
    const { surveys, dispatch } = useContext(SurveyContext)
    const { currentUserEmail } = useContext(UserContext)
    const [displayedSurveys, setDisplayedSurveys] = useState(surveys)
    const [selected, setSelected] = useState('all')

    useEffect(() => {
        const fetchSurveys = async () => {
            const surveys = await getAllSurveys()
            dispatch({ type: 'SET_SURVEYS', surveys })
            setDisplayedSurveys(surveys)
        };

        if (surveys.length === 0) fetchSurveys()

    }, [])

    const handleChange = (e) =>{
        setSelected(e.target.value)
        setDisplayedSurveys(e.target.value === 'all'? surveys: surveys.filter(el =>  el.created_from === currentUserEmail))
    }

    const deleteSurvey = (id) =>{
        setDisplayedSurveys(displayedSurveys.filter(survey => survey.id != id))
    }

    return (
        <section className="surveys">
            <h4 className="heading-primary ">Surveys</h4>
            <p className="mg-b-medium">Total: {displayedSurveys.length}</p>
            <div className="mg-b-small" >
                <ul className="mg-b-small surveys__filter-container">
                    <li>
                        <input type="radio" className="surveys__filter" name={`surveys__filter`} id="surveys__filter-all"  value='all' checked={selected === 'all'} onChange={handleChange} />
                        <label htmlFor={`surveys__filter-all`}>All</label>
                    </li>
                    <li>
                        <input type="radio" className="surveys__filter" name={`surveys__filter`} id="surveys__filter-mine"  value='mine' checked={selected === 'mine'}  onChange={handleChange} />
                        <label htmlFor={`surveys__filter-mine`}>My Surveys</label>
                    </li>
                </ul>

            </div>

            <div>
                <AnimatePresence>
                    {displayedSurveys.map((el) => (
                        <motion.div key={el.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }} >
                            <Survey survey={el} deleteSurvey={deleteSurvey} />

                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Surveys