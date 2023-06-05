import { useContext, useEffect, useState } from "react"
import SurveyContext from "../context/SurveyContext"
import UserContext from "../context/UserContext"
import { createSurvey, getAllQuestions } from "../db/db-services"
import { useNavigate } from "react-router-dom"


function NewSurvey() {
    const {currentUserRole} =useContext(UserContext)
    const { questions, dispatch } = useContext(SurveyContext)
    const [availableQuestions, setAvailableQuestions] = useState(questions)
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const navigate= useNavigate()

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await getAllQuestions()
            dispatch({ type: 'SET_QUESTIONS', questions })
        };

        if (questions.length === 0) fetchQuestions()
    }, [])

    const handleDrag = (id, e) => {
        e.dataTransfer.setData('id', id)
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleDrop = (e) => {
        const id = e.dataTransfer.getData('id')
        setSelectedQuestions([...selectedQuestions, ...availableQuestions.filter((question) => question.id === id)])
        setAvailableQuestions(availableQuestions.filter((question) => question.id != id))
    }
    const handleChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value)
        } else if (e.target.id === 'description') {
            setDescription(e.target.value)
        }
    }

    const handleSubmit = async () => {
        if (name === '' || description === '' || selectedQuestions.length === 0) {
            alert('Coplete all fields')
        } else {
            const newSurvey = {
                name,
                description,
                questions: selectedQuestions
            }
            console.log('new Survey:', newSurvey);
            dispatch({ type: 'CREATE_SURVEY', survey: newSurvey })
            const response = await createSurvey(newSurvey);
            navigate('/surveys')
            // alert('Survey Submited')
        }
    }

    if(currentUserRole !== 'admin'){
        return(
            <div className="newSurvey">
                Available only for admin members
            </div>
        )
    }


    return (
        <section className='newSurvey'>
            <h4 className="heading-primary mg-b-medium centered">New Survey</h4>
            <div className="card mg-b-medium newSurvey__data mx-auto ">
                <label htmlFor="name" className="mg-b-tiny">Name</label>
                <input value={name} type="text" id="name" placeholder='Name of the Survey' className="input-basic mg-b-small" onChange={handleChange} />
                <label htmlFor="description" className="mg-b-tiny">Description</label>
                <textarea value={description} id="description" className="input-basic" placeholder='Description of Survey' onChange={handleChange}></textarea>
                {/* <label htmlFor="name" className="mg-b-tiny">Name</label>
                <input type="text" id="name" placeholder='Name of the Survey' className="input-basic mg-b-small" /> */}
            </div>
            <div className="newSurvey__questions">
                <div className="newSurvey__questions-available ">
                    <h4 className="heading-secondary">Available questions</h4>
                    <div className="questions-inner">
                        {availableQuestions.map((el) => (
                            <div className="card card-small mg-b-tiny" key={el.id} draggable onDragStart={() => handleDrag(el.id, event)} >
                                {el.question}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="newSurvey__questions-selected">
                    <h4 className="heading-secondary">Selected questions</h4>
                    <div className="questions-inner" onDragOver={handleDragOver} onDrop={handleDrop}   >
                        {selectedQuestions.map((el) => (
                            <div className="card card-small mg-b-tiny" key={el.id}>
                                {el.question}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="btn-area centered mg-t-medium">
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit Survey
                </button>
            </div>
        </section>
    )
}

export default NewSurvey