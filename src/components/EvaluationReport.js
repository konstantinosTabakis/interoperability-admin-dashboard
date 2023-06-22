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
                service_name: el.identification?.name ? el.identification.name : null,
                service_email: el.identification?.email ? el.identification.email : null,
                service_sector: el.identification?.sector ? el.identification.sector : null,
                service_target: el.identification?.target ? el.identification.target : null,
                service_admin_level: el.identification?.admin_level ? el.identification.admin_level : null,
                user_role: el.identification?.role ? el.identification.role : null,
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