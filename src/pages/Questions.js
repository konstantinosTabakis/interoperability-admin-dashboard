import { useState } from "react";

function Questions() {


    const [file, setFile] = useState(null)

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = handleFileRead;
            reader.readAsText(file);
        }
    };

    const handleFileRead = (event) => {
        const content = event.target.result;
        const jsonData = JSON.parse(content);
        console.log(jsonData);
    };
    return (
        <div className="questions">
            <h2 className="heading-primary  mg-b-tiny ">
                Questions
            </h2>
            <p className="mg-b-medium">Import new questions to use on surveys</p>
            <label htmlFor="json" className="drop-container">
                <span className="drop-title">Drop files here</span>
                or
                <input type="file" accept=".json" onChange={handleFileChange} />
            </label>
            <div className="mg-t-medium">
                <button onClick={handleUpload} className="btn btn-primary">Upload JSON</button>

            </div>
        </div>
    )
}

export default Questions