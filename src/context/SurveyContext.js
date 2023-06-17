import { createContext, useReducer } from "react"
import SurveyReducer from "./reducers/SurveyReducer"

const SurveyContext= createContext()

export const SurveyProvider = ({ children }) => {

    const initialState = {
        surveys: [],
        numberOfSurveys: null,
        questions:[],
        numberOfQuestions: null,
        evaluations: [],
        numberOfEvaluations: null        
    }

    const [state, dispatch] = useReducer(SurveyReducer, initialState)

    return <SurveyContext.Provider value={{ ...state, dispatch }}>
        {children}
    </SurveyContext.Provider>

}

export default SurveyContext