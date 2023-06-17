import FormatedJSON from "../components/FormatedJSON";
import ImportJSON from "../components/ImportJSON";

function Questions() {

    return (
        <div className="questions">
            <h2 className="heading-primary  mg-b-tiny ">
                Questions
            </h2>
            <p className="mg-b-medium">Import new questions to use on surveys. Supported format is Json.</p>
            <h3 className="heading-secondary mg-b-small">Example Format:</h3>
            <div className="mg-b-medium">
                <FormatedJSON />
            </div>
            <div>
                <ImportJSON/>
            </div>
        </div>
    )
}

export default Questions