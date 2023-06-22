import { useContext, useEffect, useState } from "react"
import SurveyContext from "../context/SurveyContext"
import UserContext from "../context/UserContext"
import { createSurvey, getAllQuestions } from "../db/db-services"
import { useNavigate } from "react-router-dom"
import chevronLeft from '../assets/img/chevrons-left.svg'
import chevronRight from '../assets/img/chevrons-right.svg'
import { toast } from 'react-toastify'


function NewSurvey() {
    const { currentUserRole } = useContext(UserContext)
    const { questions, dispatch } = useContext(SurveyContext)
    const [availableQuestions, setAvailableQuestions] = useState(questions)
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [label, setLabel] = useState('general')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await getAllQuestions()
            setAvailableQuestions(questions)
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
        setSelectedQuestions([...selectedQuestions, ...availableQuestions.filter((question) => question.id == id)])
        setAvailableQuestions(availableQuestions.filter((question) => question.id != id))
    }
    const handleChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value)
        } else if (e.target.id === 'description') {
            setDescription(e.target.value)
        } else if (e.target.id === 'label') {
            setLabel(e.target.value)
        }
    }

    const handleEmpty = () => {
        setAvailableQuestions([...availableQuestions, ...selectedQuestions])
        setSelectedQuestions([])
    }
    const handleFull = () => {
        setSelectedQuestions([...availableQuestions, ...selectedQuestions])
        setAvailableQuestions([])
    }
    const handleFilter = (e) => {
        const filter = e.target.value
        if (filter === 'all') {
            setAvailableQuestions(questions)
        } else if (filter === 'legal') {
            setAvailableQuestions(questions.filter((el) => el.type.includes('LIMAPS')))
        } else if (filter === 'organisational') {
            setAvailableQuestions(questions.filter((el) => el.type.includes('OIMAPS')))
        } else if (filter === 'semantic') {
            setAvailableQuestions(questions.filter((el) => el.type.includes('SIMAPS')))
        } else if (filter === 'technical') {
            setAvailableQuestions(questions.filter((el) => el.type.includes('TIMAPS')))
        }
    }

    const handleSubmit = async () => {
        if (name === '' || description === '' || selectedQuestions.length === 0) {
            toast.error('Please complete all fields and select questions', {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            const newSurvey = {
                name,
                description,
                label,
                questions: selectedQuestions
            }
            const id = await createSurvey(newSurvey);
            dispatch({ type: 'CREATE_SURVEY', survey: {id, ...newSurvey} })
            toast.success('The new survey was created', {
                position: toast.POSITION.TOP_CENTER
            })
            navigate('/surveys')
        }
    }

    if (currentUserRole !== 'admin') {
        return (
            <div className="newSurvey">
                Available only for admin members
            </div>
        )
    }


    return (
        <section className='newSurvey'>
            <h4 className="heading-primary mg-b-medium centered">New Survey</h4>
            <div className="card mg-b-medium newSurvey__data mx-auto ">
                <div className="newSurvey__data-inner">
                    <label htmlFor="name" className="mg-b-tiny">Name</label>
                    <input value={name} type="text" id="name" placeholder='Name of the Survey' className="input-basic mg-b-small" onChange={handleChange} />
                    <label htmlFor="description" className="mg-b-tiny">Description</label>
                    <textarea value={description} id="description" className="input-basic mg-b-small" placeholder='Description of Survey' onChange={handleChange}></textarea>
                    <label htmlFor="label" className="mg-b-tiny">Label</label>
                    <select id="label" className="input-basic mg-b-small" onChange={handleChange}>
                        <option value="general">General</option>
                        <option value="legal">Legal</option>
                        <option value="organisational">Organisational</option>
                        <option value="semantic">Semantic</option>
                        <option value="technical">Technical</option>
                    </select>
                </div>
            </div>

            <div className="newSurvey__questions">
                <div className="newSurvey__questions-available ">
                    <h4 className="heading-secondary mg-b-small">Available questions</h4>

                    <div className="questions-container">
                        <h5 className="questions-heading">
                            <span>Total: {availableQuestions.length}</span>
                            <span>
                                <select id="" className="input-basic" onChange={handleFilter}>
                                    <option value="all">All</option>
                                    <option value="legal">Legal</option>
                                    <option value="organisational">Organisational</option>
                                    <option value="semantic">Semantic</option>
                                    <option value="technical">Technical</option>
                                </select>
                            </span>
                        </h5>
                        <div className="questions-inner">
                            {availableQuestions.map((el, index) => (
                                <div className="card card-small mg-b-tiny" key={index} draggable onDragStart={() => handleDrag(el.id, event)} >
                                    {el.question}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="newSurvey__questions-selected"  >
                    <h4 className="heading-secondary mg-b-small">Selected questions</h4>

                    <div className="questions-container"  >
                        <h5 className="questions-heading">
                            <span>Total: {selectedQuestions.length}</span>
                            <span className="icons">
                                <button>
                                    <img src={chevronLeft} alt="chevron left icon" onClick={handleEmpty} />
                                </button>
                                <button>
                                    <img src={chevronRight} alt="chevron right icon" onClick={handleFull} />
                                </button>
                            </span>
                        </h5>
                        <div className="questions-inner" onDragOver={handleDragOver} onDrop={handleDrop}>
                            {selectedQuestions.map((el, index) => (
                                <div className="card card-small mg-b-tiny" key={index}>
                                    {el.question}
                                </div>
                            ))}
                        </div>
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