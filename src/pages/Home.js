import { useContext, useEffect } from "react"
import Overview from "../components/Overview"
import { getAllUsers, getAllSurveys, getAllQuestions, getEvaluationsNumber } from "../db/db-services"
import UserContext from "../context/UserContext"
import SurveyContext from "../context/SurveyContext"


function Home() {
  const { users, numberOfUsers, dispatch: userDispatch } = useContext(UserContext)
  const { surveys, numberOfSurveys, questions, numberOfQuestions, numberOfEvaluations, dispatch: surveyDispatch } = useContext(SurveyContext)



  useEffect(() => {

    const fetchUsers = async () => {
      const users = await getAllUsers()
      userDispatch({ type: 'SET_USERS', users })
    };

    const fetchSurveys = async () => {
      const surveys = await getAllSurveys()
      surveyDispatch({ type: 'SET_SURVEYS', surveys })
    };

    const fetchQuestions = async () => {
      const questions = await getAllQuestions()
      surveyDispatch({ type: 'SET_QUESTIONS', questions })
    };

    const fetchEvaluations = async () => {
      const evaluations = await getEvaluationsNumber()
      surveyDispatch({ type: 'SET_EVALUATIONS', evaluations: evaluations })
    };

    if (users.length === 0) fetchUsers()
    if (surveys.length === 0) fetchSurveys()
    if (questions.length === 0) fetchQuestions()
    if (!numberOfEvaluations) fetchEvaluations()

  }, [])


  return (
    <section className="home">

      <h2 className="heading-primary  mg-b-medium ">
        Interoperability Admin Dashboard
      </h2>
      <Overview users={numberOfUsers} surveys={numberOfSurveys} questions={numberOfQuestions} evaluations={numberOfEvaluations} />

    </section>
  )
}

export default Home