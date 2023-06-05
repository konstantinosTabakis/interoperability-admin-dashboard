import { useContext } from "react"
import SurveyContext from "../context/SurveyContext"
import Survey from "../components/Survey"
import { useEffect } from "react"
import { getAllSurveys } from "../db/db-services"
import { motion, AnimatePresence } from 'framer-motion'


function Surveys() {
    const { surveys, dispatch } = useContext(SurveyContext)

    useEffect(() => {
        const fetchSurveys = async () => {
            const surveys = await getAllSurveys()
            dispatch({ type: 'SET_SURVEYS', surveys })
        };

        if (surveys.length === 0) fetchSurveys()

    }, [])

    return (
        <section className="surveys">
            <h4 className="heading-primary ">Surveys</h4>
            <p className="mg-b-medium">Total: {surveys.length}</p>
            <div>
                <AnimatePresence>
                    {surveys.map((el) => (
                        <motion.div  key={el.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }} >
                                <Survey  survey={el} />

                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Surveys