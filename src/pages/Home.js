import { useContext, useEffect, useState } from "react"
import Overview from "../components/Overview"
import { getAllUsers, getAllSurveys, getAllQuestions } from "../db/db-services"
import UserContext from "../context/UserContext"
import SurveyContext from "../context/SurveyContext"


function Home() {
  const { users, numberOfUsers, currentUserEmail, dispatch: userDispatch } = useContext(UserContext)
  const { surveys, numberOfSurveys, questions, numberOfQuestions, dispatch: surveyDispatch } = useContext(SurveyContext)

   

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

    if (users.length ===0) fetchUsers()
    if (surveys.length === 0) fetchSurveys()
    if (questions.length === 0) fetchQuestions()

  }, [])


  return (
    <section className="home">

      <h2 className="heading-primary  mg-b-medium ">
        Interoperability Admin Dashboard
      </h2>
      {/* <p className="mg-b-medium">Logged in as {currentUserEmail}! </p> */}
      <Overview users={numberOfUsers} surveys={numberOfSurveys} questions={numberOfQuestions} />

      {/* {numberOfUsers > 0 && numberOfSurveys > 0 && numberOfQuestions > 0 && (
        <div className="chart card" style={{minHeight:'400px'}}>
          <VerticalBar data={chartData} />
        </div>
      )} */}

      {/* <div className="card">
        <h4 className="heading-secondary mg-b-small">
          Surveys
        </h4>
      </div> */}
    </section>
  )
}

export default Home