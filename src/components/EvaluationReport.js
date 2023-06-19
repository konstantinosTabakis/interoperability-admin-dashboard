import { jsonWriter, csvWriter } from '../utils/writers';

function EvaluationReport({ evaluations }) {

    const calcDate = (date = new Date(), today = true) => {
        if (!today) date = new Date(date.seconds * 1000);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (!today) {
            return `${day}/${month}/${year}`
        } else {
            return `${day}${month}${year}`
        }
    }

    const handleData = () => {
        const printData = evaluations.map((el) => {
            return {
                id: el.id,
                survey: el.survey,
                label: el.surveyLabel,
                percentage: el.percentage,
                created_at: calcDate(el.created_at, false)
            }
        })
        return printData
    }

    const handlePrintJson = () => {
        jsonWriter(handleData(),`interoperability_report${calcDate()}` )
    }

    const handlePrintCsv = () => {
        csvWriter(handleData(), `interoperability_report${calcDate()}.csv`)
    }

    return (
        <div className="double-btns">
            <button className="btn btn-secondary" onClick={handlePrintJson}>
                Export as Json
            </button>
            <button className="btn btn-primary" onClick={handlePrintCsv}>
                Export as CSV
            </button>
        </div>
    )
}

export default EvaluationReport