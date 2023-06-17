const SurveyReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SURVEYS':
            return {
                ...state,
                surveys: action.surveys,
                numberOfSurveys: action.surveys.length
            }
        case 'CREATE_SURVEY':
            return {
                ...state,
                surveys: [...state.surveys, action.survey],
                numberOfSurveys: state.numberOfSurveys + 1
            }
        case 'DELETE_SURVEY':
            return {
                ...state,
                surveys: [...state.surveys.filter(el => el.id != action.id)],
                numberOfSurveys: state.numberOfSurveys - 1
            }
        case 'SET_QUESTIONS':
            return {
                ...state,
                questions: action.questions,
                numberOfQuestions: action.questions.length
            }
        case 'CREATE_QUESTIONS':
            return {
                ...state,
                numberOfQuestions: action.questions.length + state.numberOfQuestions,
                questions: [...state.questions, ...action.questions]
            }
        case 'SET_EVALUATIONS':
            return {
                ...state,
                evaluations: action.evaluations,
                numberOfEvaluations: action.evaluations.length
            }
        // case 'SET_CURRENT_USER':
        //     return {
        //         ...state,
        //         currentUserId: action.id ,
        //         currentUserEmail: action.email
        //     }
        // case 'DELETE_CURRENT_USER':
        //     return {
        //         ...state,
        //         currentUserId: null ,
        //         currentUserEmail: null
        //     }

        default:
            return state
    }
}

export default SurveyReducer