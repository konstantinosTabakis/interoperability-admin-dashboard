import { useState, useRef, useContext } from "react";
import { createQuestions } from "../db/db-services"
import  SurveyContext from '../context/SurveyContext'
import { useNavigate } from "react-router-dom";
function Questions() {


    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);
    const {dispatch} = useContext(SurveyContext)

    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
        setFileName(selectedFile.name)
        event.target.value = ''
    }

    const handleUpload = () => {
        if (file) {
            const reader = new FileReader()
            reader.onload = handleFileRead
            reader.readAsText(file)
        }
    }

    const handleFileRead = async (event) => {
        const content = event.target.result
        const jsonData = JSON.parse(content)
        console.log(jsonData)
        const response = await createQuestions(jsonData)
        if(response){
            dispatch({type: 'CREATE_QUESTIONS', questions: jsonData})
            navigate('/')
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files[0]
        setFile(droppedFile)
        setFileName(droppedFile.name)
        fileInputRef.current.value = ''
    }
    return (
        <div className="questions">
            <h2 className="heading-primary  mg-b-tiny ">
                Questions
            </h2>
            <p className="mg-b-medium">Import new questions to use on surveys. Supported format is Json.</p>
            <input type="file" id="json" className="file-input" accept=".json" onChange={handleFileChange} ref={fileInputRef} />
            <label htmlFor="json" className="drop-container" onDragOver={handleDragOver} onDrop={handleDrop}>
                <span className="drop-title">Drop files here</span>
                or
                <label htmlFor="json" className="file-label">
                    <input type="file" id="json" className="file-input" accept=".json" onChange={handleFileChange} ref={fileInputRef} />
                    <span>Browse</span>
                </label>
                {fileName && <span className="filename">{fileName}</span>}
            </label>
            <div className="mg-t-medium">
                <button onClick={handleUpload} className="btn btn-primary">Upload JSON</button>

            </div>
        </div>
    )
}

export default Questions