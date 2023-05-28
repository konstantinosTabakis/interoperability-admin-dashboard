import { useContext } from "react"
import SurveyContext from "../context/SurveyContext"
import Survey from "../components/Survey"
import { useEffect } from "react"
import { getAllSurveys } from "../db/db-services"


function Surveys() {
    const { surveys, dispatch } = useContext(SurveyContext)

    useEffect(() => {
        const fetchSurveys = async () => {
            const surveys = await getAllSurveys()
            dispatch({ type: 'SET_SURVEYS', surveys })
        };

        if (surveys.length===0) fetchSurveys()

    }, [])

    return (
        <section className="surveys">
            <h4 className="heading-primary mg-b-medium">Surveys</h4>
            <div>
                {surveys.map((el) => (
                    <Survey key={el.id} survey={el} />
                ))}
            </div>
        </section>
    )
}

export default Surveys