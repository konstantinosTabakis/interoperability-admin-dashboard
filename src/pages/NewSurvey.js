import { useContext, useEffect, useState } from "react"
import SurveyContext from "../context/SurveyContext"
import UserContext from "../context/UserContext"
import { createSurvey, getAllQuestions } from "../db/db-services"
import DetailsModal from "../components/DetailsModal"
import { useNavigate } from "react-router-dom"
import chevronLeft from '../assets/img/chevrons-left.svg'
import chevronRight from '../assets/img/chevrons-right.svg'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import deleteIcon from '../assets/img/delete.png'


function NewSurvey() {
    const { currentUserRole, currentUserEmail, dispatch: userDispatch } = useContext(UserContext)
    const { questions, dispatch } = useContext(SurveyContext)
    const [availableQuestions, setAvailableQuestions] = useState(questions)
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [label, setLabel] = useState('general')
    const [seeDetails, setSeeDetails] = useState(false)
    const [seeDetailsQuestion, setSeeDetailsQuestion] = useState(null)
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
        handleFilter()
        setSelectedQuestions([])
    }
    const handleFull = () => {
        setSelectedQuestions([...availableQuestions, ...selectedQuestions])
        setAvailableQuestions([])
    }
    const handleRemoveQuestion = (id) =>{
        setSelectedQuestions(selectedQuestions.filter(questions => questions.id != id))
    }

    const handleFilter = () => {
        const sourceFilter = document.getElementById('newSurvey__source').value
        const categoryFilter = document.getElementById('newSurvey__category').value

        if (sourceFilter && categoryFilter) {
            setAvailableQuestions(questions.filter((el) => el.type.includes(categoryFilter) && el.src === sourceFilter))
        } else if (sourceFilter) {
            setAvailableQuestions(questions.filter((el) => el.src === sourceFilter))
        } else if (categoryFilter) {
            setAvailableQuestions(questions.filter((el) => el.type.includes(categoryFilter)))
        } else {
            setAvailableQuestions(questions)
        }
    }

    const getValues = () => {
        const uniqueValues = new Set();
        questions.forEach((item) => {
            uniqueValues.add(item.src);

        });
        return Array.from(uniqueValues);
    };

    const handleSeeDetails = (question) => {
        userDispatch({ type: 'TOGGLE_TRANSPARENT' })
        setSeeDetailsQuestion(question ? question : null)
        setSeeDetails(!seeDetails)
    }

    const handleSubmit = async () => {
        if (name === '' || description === '' || selectedQuestions.length === 0) {
            toast.error('Please complete all fields and select questions', {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            const currentDate = new Date();
            const formattedCurrentDate = currentDate.toLocaleDateString('en-GB');

            const newSurvey = {
                name,
                description,
                label,
                questions: selectedQuestions,
                created_from: currentUserEmail
            }
            const id = await createSurvey({ ...newSurvey, questions: selectedQuestions.map(question => question.id) });
            dispatch({ type: 'CREATE_SURVEY', survey: { id, ...newSurvey, created_at: formattedCurrentDate } })
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
                    <select id="label" className="input-basic mg-b-small w-100" onChange={handleChange}>
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
                            <div>
                                <select id="newSurvey__category" className="input-basic" onChange={handleFilter}>
                                    <option value="">All Categories</option>
                                    <option value="legal">Legal</option>
                                    <option value="organisational">Organisational</option>
                                    <option value="semantic">Semantic</option>
                                    <option value="technical">Technical</option>
                                </select>
                                <select id="newSurvey__source" className="input-basic" onChange={handleFilter}>
                                    <option value="">All Sources</option>
                                    {getValues().map((el, index) => (
                                        <option key={index} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                        </h5>
                        <div className="questions-inner">
                            {availableQuestions.map((el, index) => (
                                <div className="card card-small mg-b-tiny" key={index} draggable onDragStart={() => handleDrag(el.id, event)} >
                                    <div className="mg-b-tiny">
                                        {el.question}
                                    </div>
                                    <button className="" onClick={() => handleSeeDetails(el)}>
                                        See Details
                                    </button>
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
                                    <div className="mg-b-tiny">
                                        {el.question}
                                    </div>
                                    <div className="questions-inner-utils">
                                        <button className="" onClick={() => handleSeeDetails(el)}>
                                            See Details
                                        </button>
                                        <button onClick={()=> handleRemoveQuestion(el.id)}>
                                            <img src={deleteIcon} alt="delete Icon" />
                                        </button>
                                    </div>
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

            {seeDetails && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} >
                        <DetailsModal handleSeeDetails={handleSeeDetails} question={seeDetailsQuestion} />
                    </motion.div>
                </AnimatePresence>
            )}

        </section>
    )
}

export default NewSurvey